import { useEffect, useRef } from 'react'

export function useOutSideClick(handler: () => void, listenCapturing: boolean = true) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler()
      }
    }
    document.addEventListener('click', handleClickOutside, listenCapturing)

    return () => {
      document.removeEventListener('click', handleClickOutside, listenCapturing)
    }
  }, [handler, listenCapturing])

  return ref
}
