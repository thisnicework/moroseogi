import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const supabase = createClient(
  isValidUrl(supabaseUrl) ? supabaseUrl : 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
)

export type Event = {
  id: number
  title: string
  date: string
  time: string
  location: string
  total_seats: number
  occupancy?: number
}

export type Booking = {
  id?: number
  event_id: number
  name: string
  phone: string
  headcount: number
  status?: string
  booking_code?: string
  created_at?: string
  events?: Event
}

export async function fetchEvents() {
  const { data: events, error: eventError } = await supabase
    .from('events')
    .select('*')
    .order('id', { ascending: true })

  if (eventError) {
    console.error('Error fetching events:', eventError)
    return []
  }

  // Fetch active bookings to calculate occupancy (anything NOT cancelled)
  const { data: bookings, error: bookingError } = await supabase
    .from('bookings')
    .select('event_id, headcount')
    .not('status', 'ilike', 'cancelled%')

  if (bookingError) {
    console.error('Error fetching bookings:', bookingError)
    return events as Event[]
  }

  const eventData = (events || []).map(event => {
    const occupancy = (bookings || [])
      .filter(b => b.event_id === event.id)
      .reduce((sum, b) => sum + b.headcount, 0)
    return { ...event, occupancy }
  })

  return eventData as Event[]
}

export async function createBooking(booking: Omit<Booking, 'id' | 'status' | 'booking_code' | 'created_at'>) {
  // Final availability check
  const { data: events } = await supabase
    .from('events')
    .select('total_seats')
    .eq('id', booking.event_id)
    .single()

  const { data: currentBookings } = await supabase
    .from('bookings')
    .select('headcount')
    .eq('event_id', booking.event_id)
    .not('status', 'ilike', 'cancelled%')

  const totalSeats = events?.total_seats || 30
  const currentOccupancy = (currentBookings || []).reduce((sum, b) => sum + b.headcount, 0)

  if (currentOccupancy + booking.headcount > totalSeats) {
    throw new Error(`죄송합니다. 남은 좌석이 부족합니다. (현재 남은 좌석: ${totalSeats - currentOccupancy}석)`)
  }

  // Check for duplicate booking
  const { data: existingBooking } = await supabase
    .from('bookings')
    .select('id')
    .eq('phone', booking.phone)
    .eq('event_id', booking.event_id)
    .not('status', 'ilike', 'cancelled%')
    .maybeSingle()

  if (existingBooking) {
    throw new Error('이미 해당 회차에 예약된 내역이 있습니다. (중복 예매 불가)')
  }

  // Generate a random 6-character alphanumeric booking code
  const booking_code = Math.random().toString(36).substring(2, 8).toUpperCase()
  
  const { data, error } = await supabase
    .from('bookings')
    .insert([{ ...booking, booking_code, status: 'confirmed' }])
    .select()

  if (error) {
    throw new Error(error.message)
  }
  return data[0] as Booking
}

export async function lookupBooking(phone: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, events(*)')
    .eq('phone', phone)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }
  return data as Booking[]
}

export async function cancelBooking(bookingId: number, source: 'user' | 'admin' = 'user') {
  const status = source === 'admin' ? 'cancelled_by_admin' : 'cancelled_by_user'
  
  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', bookingId)

  if (error) {
    throw new Error(error.message)
  }
  return true
}

export async function fetchAllBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, events(*)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching bookings:', error)
    return []
  }
  return data as Booking[]
}
