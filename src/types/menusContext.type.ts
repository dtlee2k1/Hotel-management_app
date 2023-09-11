import { Position } from '../ui/Menus'

export default interface MenusContextType {
  openId: string
  open: (id: string) => void
  close: () => void
  position: Position
  calculatedPosition: (pos: Position) => void
}
