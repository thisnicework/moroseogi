import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllBookings, fetchEvents, cancelBooking, type Booking, type Event } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [filterEventId, setFilterEventId] = useState('all')

  const loadData = async () => {
    setLoading(true)
    try {
      const [bData, eData] = await Promise.all([fetchAllBookings(), fetchEvents()])
      setBookings(bData)
      setEvents(eData)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleCancel = async (id: number) => {
    if (!window.confirm('예매를 취소 처리하시겠습니까?')) return
    try {
      await cancelBooking(id)
      toast.success('취소 처리되었습니다.')
      loadData()
    } catch (error: any) {
      toast.error('오류: ' + error.message)
    }
  }

  const filteredBookings = filterEventId === 'all' 
    ? bookings 
    : bookings.filter(b => b.event_id.toString() === filterEventId)

  return (
    <main className="page" style={{ maxWidth: '1200px' }}>
      <div className="mb-4">
        <Link to="/" className="btn btn-outline">&larr; 홈으로</Link>
      </div>

      <div className="card">
        <h1 className="mb-8" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem' }}>어드민 대시보드</h1>
        
        <div className="mb-4" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label className="form-label" style={{ marginBottom: 0 }}>공연 필터:</label>
          <select 
            className="form-control" 
            style={{ width: 'auto' }}
            value={filterEventId}
            onChange={e => setFilterEventId(e.target.value)}
          >
            <option value="all">전체보기</option>
            {events.map(ev => (
              <option key={ev.id} value={ev.id}>{ev.title} ({ev.date} {ev.time})</option>
            ))}
          </select>
          <button onClick={loadData} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>새로고침</button>
        </div>

        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>예매코드</th>
                  <th>이름</th>
                  <th>연락처</th>
                  <th>공연명</th>
                  <th>인원</th>
                  <th>상태</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center">예매 내역이 없습니다.</td>
                  </tr>
                ) : (
                  filteredBookings.map(b => (
                    <tr key={b.id} style={{ opacity: b.status === 'cancelled' ? 0.6 : 1 }}>
                      <td><strong>{b.booking_code}</strong></td>
                      <td>{b.name}</td>
                      <td>{b.phone}</td>
                      <td>{b.events?.title}</td>
                      <td>{b.headcount}</td>
                      <td style={{ color: b.status === 'cancelled' ? 'var(--error)' : 'var(--success)', fontWeight: 'bold' }}>
                        {b.status === 'cancelled' ? '취소됨' : '완료'}
                      </td>
                      <td>
                        {b.status !== 'cancelled' && (
                          <button 
                            onClick={() => b.id && handleCancel(b.id)} 
                            style={{ background: 'var(--error)', color: 'white', border: 'none', padding: '0.25rem 0.5rem', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            취소
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
