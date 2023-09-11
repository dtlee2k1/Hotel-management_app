export default interface ModalContextType {
  openName: string
  open: (value: string) => void
  close: () => void
}
