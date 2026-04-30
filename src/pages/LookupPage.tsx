import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { lookupBooking, cancelBooking, type Booking } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function LookupPage() {
  const location = useLocation()
  const [name, setName] = useState(location.state?.name || '')
  const [phone, setPhone] = useState(location.state?.phone || '')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (location.state?.name && location.state?.phone) {
      handleSearch()
    }
    // eslint-disable-next-line
  }, [location.state])

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!name || !phone) {
      toast.error('이름과 연락처를 입력해주세요.')
      return
    }

    setLoading(true)
    try {
      const data = await lookupBooking(name, phone)
      setBookings(data)
      setSearched(true)
    } catch (error: any) {
      toast.error(error.message || '조회 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (id: number) => {
    if (!window.confirm('정말 예매를 취소하시겠습니까?')) return

    try {
      await cancelBooking(id)
      toast.success('예매가 취소되었습니다.')
      handleSearch()
    } catch (error: any) {
      toast.error(error.message || '취소 중 오류가 발생했습니다.')
    }
  }

  return (
    <main className="page">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline">&larr; 홈으로</Link>
      </div>

      <div className="card mb-8" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 className="mb-8 text-center" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem' }}>예매 조회</h1>
        
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label className="form-label">예매자 이름</label>
            <input 
              type="text" 
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">연락처 (- 없이)</label>
            <input 
              type="tel" 
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="01012345678"
              required
            />
          </div>

          <button type="submit" className="btn w-full mt-4" disabled={loading}>
            {loading ? '조회 중...' : '조회하기'}
          </button>
        </form>
      </div>

      {searched && (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="mb-4">예매 내역</h2>
          {bookings.length === 0 ? (
            <p className="text-center" style={{ color: 'var(--text-muted)' }}>예매 내역이 없습니다.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {bookings.map(b => (
                <div key={b.id} style={{ border: '2px solid var(--purple)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: b.status === 'cancelled' ? 'rgba(0,0,0,0.05)' : 'var(--white)' }}>
                  <div>
                    <h3 style={{ marginBottom: '0.5rem', textDecoration: b.status === 'cancelled' ? 'line-through' : 'none' }}>
                      {b.events?.title} ({b.events?.date} {b.events?.time})
                    </h3>
                    <p className="mb-2">예매 코드: <strong>{b.booking_code}</strong></p>
                    <p>인원: {b.headcount}명 | 상태: <span style={{ color: b.status === 'cancelled' ? 'var(--error)' : 'var(--success)', fontWeight: 'bold' }}>{b.status === 'cancelled' ? '취소됨' : '예약완료'}</span></p>
                  </div>
                  {b.status !== 'cancelled' && (
                    <button onClick={() => b.id && handleCancel(b.id)} className="btn" style={{ padding: '0.5rem 1rem', background: 'var(--error)', borderColor: 'var(--error)' }}>
                      취소하기
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  )
}
