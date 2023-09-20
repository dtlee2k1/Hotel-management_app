import { BookingType } from './booking.type'

export type ActivityType = Pick<BookingType, 'id' | 'status' | 'guests' | 'numNights'>
