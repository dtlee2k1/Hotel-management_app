export default interface BookingType {
  cabinId: string | number
  guestId: string | number
  created_at: Date
  startDate: string
  endDate: string
  hasBreakfast: boolean
  observations: string
  isPaid: boolean
  numGuests: number
}
