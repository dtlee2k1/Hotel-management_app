import { createContext, useContext, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { HiEllipsisVertical } from 'react-icons/hi2'
import MenusContextType from '../types/menusContext.type'
import styled from 'styled-components'

interface StyledListProps {
  $position: {
    x: number
    y: number
  }
}

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`

const StyledList = styled.ul<StyledListProps>`
  position: absolute;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`
interface MenusProps {
  children: React.ReactNode
}

interface MenusProps {
  children: React.ReactNode
}

interface ToggleProps {
  id: string
}

interface ListProps extends MenusProps {
  id: string
}

interface ButtonProps extends MenusProps {
  icon: JSX.Element
  onClick?: () => void
}

export interface Position {
  x: number
  y: number
}

const MenusContext = createContext<MenusContextType | null>(null)

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<string>('')
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

  const open = (id: string) => setOpenId(id)
  const close = () => setOpenId('')

  const calculatedPosition = (pos: Position) => setPosition(pos)

  return (
    <MenusContext.Provider value={{ openId, open, close, position, calculatedPosition }}>
      {children}
    </MenusContext.Provider>
  )
}

function Toggle({ id }: ToggleProps) {
  const { openId, open, close, calculatedPosition } = useContext(MenusContext) as MenusContextType

  useEffect(() => {
    function handleScroll() {
      if (openId) {
        close()
        document.removeEventListener('wheel', handleScroll)
      }
    }
    if (openId) document.addEventListener('wheel', handleScroll)

    return () => document.removeEventListener('wheel', handleScroll)
  }, [openId, close])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Calculated Position of `List` for each `Menu`
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect()

    calculatedPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8
    })

    // Each `CabinRow` has a `Menu` so using `id` to toggle open/close between them
    !openId || id !== openId ? open(id) : close()
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  )
}

function List({ id, children }: ListProps) {
  const { openId, close, position } = useContext(MenusContext) as MenusContextType

  const ref = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close()
      }
    }
    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [close])

  if (id !== openId) return null

  return createPortal(
    <StyledList ref={ref} $position={position}>
      {children}
    </StyledList>,
    document.body
  )
}

function Button({ children, icon, onClick }: ButtonProps) {
  const { close } = useContext(MenusContext) as MenusContextType

  const handleClick = () => {
    onClick?.()
    close()
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  )
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus
