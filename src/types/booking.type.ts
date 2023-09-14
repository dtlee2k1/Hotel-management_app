import CabinType from './cabin.type'
import GuestType from './guest.type'

export type StatusType = 'unconfirmed' | 'checked-in' | 'checked-out'
export interface BookingType {
  id: string
  created_at: string
  startDate: string
  endDate: string
  numNights: number
  numGuests: number
  cabinPrice: number
  extrasPrice: number
  totalPrice: number
  status: StatusType
  hasBreakfast: boolean
  isPaid: boolean
  observations: string
  cabinId: number
  guestId: number
  cabins: CabinType
  guests: GuestType
}
