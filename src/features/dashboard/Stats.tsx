import { HiBanknotes, HiCalendarDays, HiChartBar, HiOutlineBriefcase } from 'react-icons/hi2'
import { BookingType } from '../../types/booking.type'
import Stat from './Stat'
import { formatCurrency } from '../../utils/helpers'

interface StatsProps {
  bookings: Pick<BookingType, 'created_at' | 'totalPrice' | 'extrasPrice'>[]
  confirmedStays: BookingType[]
  cabinCount: number
  numDays: number
}

export default function Stats({ bookings, confirmedStays, cabinCount, numDays }: StatsProps) {
  // 1. Bookings
  const numBookings = bookings.length

  // 2. Sales
  const sales = bookings.reduce((total, booking) => total + booking.totalPrice, 0)

  // 3. Check-ins
  const checkins = confirmedStays.length

  // 4. Occupancy rate: num checked in nights / all available nights(num days * num cabins)
  const occupation =
    confirmedStays.reduce((total, booking) => total + booking.numNights, 0) / (numDays * cabinCount)
  return (
    <>
      <Stat title='Bookings' color='blue' icon={<HiOutlineBriefcase />} value={numBookings} />
      <Stat title='Sales' color='green' icon={<HiBanknotes />} value={formatCurrency(sales)} />
      <Stat title='Check ins' color='indigo' icon={<HiCalendarDays />} value={checkins} />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  )
}
