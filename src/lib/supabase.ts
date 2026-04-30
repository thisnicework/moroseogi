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
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching events:', error)
    return []
  }
  return data as Event[]
}

export async function createBooking(booking: Omit<Booking, 'id' | 'status' | 'booking_code' | 'created_at'>) {
  // Generate a random 6-character alphanumeric booking code
  const booking_code = Math.random().toString(36).substring(2, 8).toUpperCase()
  
  const { data, error } = await supabase
    .from('bookings')
    .insert([{ ...booking, booking_code }])
    .select()

  if (error) {
    throw new Error(error.message)
  }
  return data[0] as Booking
}

export async function lookupBooking(name: string, phone: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, events(*)')
    .eq('name', name)
    .eq('phone', phone)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }
  return data as Booking[]
}

export async function cancelBooking(bookingId: number) {
  const { error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
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
