import CabinType from './cabin.type'
import GuestType from './guest.type'

export type StatusType = 'unconfirmed' | 'checked-in' | 'checked-out'
export interface BookingType {
  id: string | number
  cabinId: string | number
  guestId: string | number
  created_at: Date
  startDate: string
  endDate: string
  hasBreakfast: boolean
  observations: string
  isPaid: boolean
  numGuests: number
  numNights: number
  cabinPrice: number
  extrasPrice: number
  totalPrice: number
  guests: GuestType
  cabins: CabinType
  status: StatusType
}
