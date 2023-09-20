import { BookingType } from '../types/booking.type'
import { Filter, SortBy } from '../types/field.type'
import { PAGE_SIZE } from '../utils/constants'
import { getToday } from '../utils/helpers'
import supabase from './supabase'

interface getBookingsParams {
  filter: Filter | null
  sortBy: SortBy
  page: number
}

export async function getBookings({ filter = null, sortBy, page }: getBookingsParams) {
  let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName,email)', { count: 'exact' })

  if (filter !== null) query = query.eq(filter.field, filter.value)

  if (sortBy) query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' })

  if (page) {
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    query = query.range(from, to)
  }

  const { data, error, count } = await query

  if (error) {
    throw new Error('Bookings could not be loaded')
  }

  return { data: data as BookingType[], count: count }
}

export async function getBooking(id: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error('Booking not found')
  }

  return data as BookingType
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISO String
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }))

  if (error) {
    throw new Error('Bookings could not get loaded')
  }

  return data as Pick<BookingType, 'created_at' | 'totalPrice' | 'extrasPrice'>[]
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday())

  if (error) {
    throw new Error('Bookings could not get loaded')
  }

  return data as BookingType[]
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at')

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    throw new Error('Bookings could not get loaded')
  }
  return data
}

export async function updateBooking(
  id: string,
  obj:
    | Pick<BookingType, 'status'>
    | Partial<Pick<BookingType, 'isPaid' | 'hasBreakfast' | 'totalPrice' | 'extrasPrice'>>
) {
  const { data, error } = await supabase.from('bookings').update(obj).eq('id', id).select().single()

  if (error) {
    throw new Error('Booking could not be updated')
  }
  return data
}

export async function deleteBooking(id: string) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id)

  if (error) {
    throw new Error('Booking could not be deleted')
  }
  return data
}
