import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchEvents, createBooking, type Event } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function BookingPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    event_id: '',
    name: '',
    phone: '',
    headcount: 1
  })

  useEffect(() => {
    fetchEvents().then(data => {
      setEvents(data)
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, event_id: data[0].id.toString() }))
      }
      setLoading(false)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      toast.error('이름과 연락처를 입력해주세요.')
      return
    }

    setSubmitting(true)
    try {
      await createBooking({
        event_id: Number(formData.event_id),
        name: formData.name,
        phone: formData.phone,
        headcount: formData.headcount
      })
      toast.success('예매가 완료되었습니다!')
      navigate('/lookup', { state: { name: formData.name, phone: formData.phone } })
    } catch (error: any) {
      toast.error(error.message || '예매 중 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline">&larr; 돌아가기</Link>
      </div>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 className="mb-8 text-center" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem' }}>예매하기</h1>
        
        {loading ? (
          <p className="text-center">로딩 중...</p>
        ) : events.length === 0 ? (
          <p className="text-center">현재 예매 가능한 공연이 없습니다. 관리자에게 문의하세요.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">공연 일정</label>
              <select 
                className="form-control"
                value={formData.event_id}
                onChange={(e) => setFormData({...formData, event_id: e.target.value})}
              >
                {events.map(ev => (
                  <option key={ev.id} value={ev.id}>
                    {ev.date} {ev.time} - {ev.title} ({ev.location})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">예매자 이름</label>
              <input 
                type="text" 
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="홍길동"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">연락처 (- 없이 입력)</label>
              <input 
                type="tel" 
                className="form-control"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/[^0-9]/g, '')})}
                placeholder="01012345678"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">관람 인원</label>
              <select 
                className="form-control"
                value={formData.headcount}
                onChange={(e) => setFormData({...formData, headcount: Number(e.target.value)})}
              >
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n}명</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn w-full mt-4" disabled={submitting}>
              {submitting ? '예매 진행 중...' : '예매 완료'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
