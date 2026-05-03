import { useState, useEffect } from 'react'
import { fetchAllBookings, fetchEvents, cancelBooking, type Booking, type Event } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [filterEventId, setFilterEventId] = useState('all')
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [adminId, setAdminId] = useState('')
  const [adminPassword, setAdminPassword] = useState('')

  useEffect(() => {
    // Check session storage on mount
    const savedAuth = sessionStorage.getItem('admin_auth')
    if (savedAuth === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [bData, eData] = await Promise.all([fetchAllBookings(), fetchEvents()])
      setBookings(bData)
      setEvents(eData)
    } catch (err: any) {
      console.error(err)
      toast.error('데이터를 불러오지 못했습니다: ' + (err.message || '네트워크 오류'))
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isLoggedIn) {
      loadData()
    }
  }, [isLoggedIn])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const envId = import.meta.env.VITE_ADMIN_ID || 'admin'
    const envPw = import.meta.env.VITE_ADMIN_PASSWORD || 'admin1234'

    if (adminId === envId && adminPassword === envPw) {
      setIsLoggedIn(true)
      sessionStorage.setItem('admin_auth', 'true')
      toast.success('관리자 로그인 성공')
    } else {
      toast.error('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    sessionStorage.removeItem('admin_auth')
    toast.success('로그아웃 되었습니다.')
  }

  const handleCancel = async (id: number) => {
    if (!window.confirm('예매를 취소 처리하시겠습니까?')) return
    try {
      await cancelBooking(id, 'admin')
      toast.success('취소 처리되었습니다.')
      loadData()
    } catch (error: any) {
      toast.error('오류: ' + error.message)
    }
  }

  const filteredBookings = filterEventId === 'all' 
    ? bookings 
    : bookings.filter(b => b.event_id.toString() === filterEventId)

  const getStatusDisplay = (status?: string) => {
    if (status === 'cancelled_by_user') return { text: '본인취소', color: 'var(--error)' }
    if (status === 'cancelled_by_admin') return { text: '관리자취소', color: 'var(--error)' }
    if (status === 'cancelled') return { text: '취소됨', color: 'var(--error)' }
    return { text: '완료', color: 'var(--success)' }
  }

  if (!isLoggedIn) {
    return (
      <main className="page" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="card" style={{ marginTop: '4rem' }}>
          <h1 className="mb-8 text-center" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem' }}>관리자 로그인</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="form-label">아이디</label>
              <input 
                type="text" 
                className="form-control" 
                value={adminId}
                onChange={e => setAdminId(e.target.value)}
                required
              />
            </div>
            <div className="mb-12">
              <label className="form-label">비밀번호</label>
              <input 
                type="password" 
                className="form-control" 
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">로그인</button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="page" style={{ maxWidth: '1200px' }}>
      <div className="mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={handleLogout} className="btn btn-outline" style={{ borderColor: 'var(--error)', color: 'var(--error)' }}>로그아웃</button>
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

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          {events.map(ev => (
            <div key={ev.id} style={{ 
              padding: '1.5rem', 
              border: '3px solid var(--border)', 
              background: 'white', 
              boxShadow: '4px 4px 0 var(--border)',
              flex: '1', 
              minWidth: '220px' 
            }}>
              <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>{ev.date} {ev.time}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>현재 예약인원</span>
                <span style={{ fontSize: '1.8rem', fontWeight: '800', color: (ev.occupancy || 0) >= ev.total_seats ? 'var(--error)' : 'var(--purple)' }}>
                  {ev.occupancy || 0} / {ev.total_seats}
                </span>
              </div>
            </div>
          ))}
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
                  filteredBookings.map(b => {
                    const statusInfo = getStatusDisplay(b.status)
                    const isCancelled = b.status?.startsWith('cancelled')

                    return (
                      <tr key={b.id} style={{ opacity: isCancelled ? 0.6 : 1 }}>
                        <td><strong>{b.booking_code}</strong></td>
                        <td>{b.name}</td>
                        <td>{b.phone}</td>
                        <td>
                          {b.events?.title || '모로서기'} 
                          <br/>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {b.events?.date || '날짜 정보 없음'}
                          </span>
                        </td>
                        <td>{b.headcount}명</td>
                        <td style={{ color: statusInfo.color, fontWeight: 'bold' }}>
                          {statusInfo.text}
                        </td>
                        <td>
                          {!isCancelled && (
                            <button 
                              onClick={() => b.id && handleCancel(b.id)} 
                              className="btn"
                              style={{ 
                                background: 'var(--error)', 
                                color: 'white', 
                                border: 'none', 
                                padding: '0.4rem 0.8rem', 
                                fontSize: '0.85rem',
                                boxShadow: 'none'
                              }}
                            >
                              취소처리
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
