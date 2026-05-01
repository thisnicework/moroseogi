import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchEvents, createBooking, type Event } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function BookingPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [successData, setSuccessData] = useState<Booking | null>(null)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    event_id: '',
    name: '',
    phone: '',
    headcount: 1
  })

  // SMS Verification state
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [sendingCode, setSendingCode] = useState(false)

  useEffect(() => {
    fetchEvents().then(data => {
      const finalEvents = data.length > 0 ? data : [
        { id: 1, title: '모로서기', date: '2026.05.16.(SAT)', time: '18:30', location: '서울예술대학교 중앙광장, 빨간대문', total_seats: 100 },
        { id: 2, title: '모로서기', date: '2026.05.17.(SUN)', time: '18:30', location: '서울예술대학교 중앙광장, 빨간대문', total_seats: 100 }
      ]
      setEvents(finalEvents)
      if (finalEvents.length > 0) {
        setFormData(prev => ({ ...prev, event_id: finalEvents[0].id.toString() }))
      }
      setLoading(false)
    })
  }, [])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11)
    setFormData({ ...formData, phone: value })
    // If phone changes, reset verification
    setVerificationSent(false)
    setIsVerified(false)
    setVerificationCode('')
  }

  const formatPhone = (phone: string) => {
    if (phone.length <= 3) return phone
    if (phone.length <= 7) return `${phone.slice(0, 3)}-${phone.slice(3)}`
    return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`
  }

  const sendVerificationCode = () => {
    if (formData.phone.length < 10) {
      toast.error('올바른 연락처를 입력해주세요.')
      return
    }
    setSendingCode(true)
    // Simulate API call
    setTimeout(() => {
      setSendingCode(false)
      setVerificationSent(true)
      toast.success('인증번호가 발송되었습니다. (테스트 번호: 1234)')
    }, 1000)
  }

  const checkVerificationCode = () => {
    if (verificationCode === '1234') {
      setIsVerified(true)
      toast.success('인증되었습니다.')
    } else {
      toast.error('인증번호가 올바르지 않습니다.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      toast.error('이름과 연락처를 입력해주세요.')
      return
    }
    if (!isVerified) {
      toast.error('휴대폰 인증을 완료해주세요.')
      return
    }

    setSubmitting(true)
    try {
      const result = await createBooking({
        event_id: Number(formData.event_id),
        name: formData.name,
        phone: formData.phone,
        headcount: formData.headcount
      })
      setSuccessData(result)
      toast.success('예매가 완료되었습니다!')
    } catch (error: any) {
      toast.error(error.message || '예매 중 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  if (successData) {
    return (
      <main className="page" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card text-center" style={{ animation: 'slideIn 0.5s ease-out' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h1 className="mb-4">예매 완료!</h1>
          <p className="mb-8" style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            예매가 성공적으로 접수되었습니다.<br />
            현장에서 본인 확인 후 입장 가능합니다.
          </p>

          <div style={{ background: 'var(--bg)', padding: '2rem', border: '3px solid var(--border)', marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              <span style={{ fontWeight: 'bold' }}>예매 번호</span>
              <span style={{ color: 'var(--purple)', fontWeight: '900', fontSize: '1.2rem' }}>{successData.booking_code}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>성함</span>
              <span style={{ fontWeight: 'bold' }}>{successData.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>연락처</span>
              <span style={{ fontWeight: 'bold' }}>{formatPhone(successData.phone)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>공연 일정</span>
              <span style={{ fontWeight: 'bold', textAlign: 'right' }}>
                {events.find(e => e.id === successData.event_id)?.date}<br />
                {events.find(e => e.id === successData.event_id)?.time}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/" className="btn btn-outline w-full">홈으로</Link>
            <Link to="/lookup" className="btn w-full">나의 예매 확인</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="page" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="mb-8">
        <Link to="/" className="btn btn-outline">&larr; 돌아가기</Link>
      </div>

      <div className="card">
        <h1 className="mb-12" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem' }}>티켓 예매</h1>

        {loading ? (
          <p className="text-center">공연 정보를 불러오는 중입니다...</p>
        ) : events.length === 0 ? (
          <div className="text-center py-8">
            <p className="mb-4">현재 예매 가능한 공연 일정이 없습니다.</p>
            <Link to="/" className="btn btn-outline">홈으로 돌아가기</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <section style={{ marginBottom: '5rem' }}>
              <h2 className="mb-10" style={{ fontSize: '1.4rem', color: 'var(--purple-dark)' }}>1. 공연 일정을 선택해주세요</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {events.map(ev => {
                  const isSelected = formData.event_id === ev.id.toString()
                  return (
                    <div
                      key={ev.id}
                      onClick={() => setFormData({ ...formData, event_id: ev.id.toString() })}
                      style={{
                        padding: '2.5rem 2rem',
                        border: '3px solid var(--border)',
                        cursor: 'pointer',
                        background: isSelected ? 'var(--purple)' : 'var(--white)',
                        color: isSelected ? 'var(--white)' : 'var(--text)',
                        boxShadow: isSelected ? '0 0 0 transparent' : '8px 8px 0 var(--border)',
                        transform: isSelected ? 'translate(4px, 4px)' : 'none',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        minHeight: '180px',
                        justifyContent: 'center'
                      }}
                    >
                      <div style={{ fontWeight: '900', fontSize: '1.4rem', lineHeight: '1.2' }}>{ev.date}<br />{ev.time}</div>
                      <div style={{ fontSize: '1rem', opacity: 0.9 }}>{ev.location}</div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.9rem',
                        marginTop: '0.5rem',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                      }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: `3px solid ${isSelected ? 'var(--white)' : 'var(--border)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease'
                        }}>
                          {isSelected && (
                            <div style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              background: 'var(--white)',
                              animation: 'scaleUp 0.2s ease-out'
                            }} />
                          )}
                        </div>
                        {isSelected ? 'SELECTED' : 'SELECT'}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            <style>{`
              @keyframes scaleUp {
                from { transform: scale(0); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
            `}</style>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>
              <section>
                <h2 className="mb-10" style={{ fontSize: '1.4rem', color: 'var(--purple-dark)' }}>2. 예매자 정보를 입력해주세요</h2>

                <div className="form-group mb-10">
                  <label className="form-label">이름</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="성함을 입력하세요"
                    required
                  />
                </div>

                <div className="form-group mb-10">
                  <label className="form-label">연락처</label>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <input
                      type="tel"
                      className="form-control"
                      style={{ flex: 1 }}
                      value={formatPhone(formData.phone)}
                      onChange={handlePhoneChange}
                      placeholder="010-0000-0000"
                      disabled={isVerified}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline"
                      style={{ padding: '0 1.5rem', fontSize: '0.9rem', flexShrink: 0, whiteSpace: 'nowrap', boxShadow: isVerified ? 'none' : '4px 4px 0 var(--border)' }}
                      onClick={sendVerificationCode}
                      disabled={isVerified || sendingCode}
                    >
                      {sendingCode ? '발송 중' : isVerified ? '인증됨' : '인증번호 전송'}
                    </button>
                  </div>
                  {verificationSent && !isVerified && (
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', animation: 'slideIn 0.3s ease-out' }}>
                      <input
                        type="text"
                        className="form-control"
                        style={{ flex: 1 }}
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="인증번호 4자리"
                      />
                      <button
                        type="button"
                        className="btn"
                        style={{ padding: '0 2rem', fontSize: '0.9rem' }}
                        onClick={checkVerificationCode}
                      >
                        확인
                      </button>
                    </div>
                  )}
                  <p style={{ fontSize: '0.85rem', marginTop: '0.75rem', color: 'var(--text-muted)' }}>
                    * 본인 확인을 위해 휴대폰 인증이 필수입니다.
                  </p>
                </div>
              </section>

              <aside style={{
                background: 'var(--bg)',
                padding: '3rem',
                border: '3px solid var(--border)',
                boxShadow: '12px 12px 0 var(--border)',
                position: 'sticky',
                top: '2rem'
              }}>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '2rem', borderBottom: '3px solid var(--border)', paddingBottom: '0.75rem' }}>예매 요약</h3>
                <div style={{ fontSize: '1.1rem', lineHeight: '2' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>공연</div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{events.find(e => e.id.toString() === formData.event_id)?.title}</div>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>일정</div>
                    <div style={{ fontWeight: 'bold' }}>
                      {events.find(e => e.id.toString() === formData.event_id)?.date}<br />
                      {events.find(e => e.id.toString() === formData.event_id)?.time}
                    </div>
                  </div>
                  <div style={{ borderTop: '2px solid var(--border)', marginTop: '2rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}>티켓 가격</span>
                    <span style={{ fontWeight: '900', color: 'var(--purple)', fontSize: '1.6rem' }}>FREE</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn w-full mt-10"
                  disabled={submitting || !isVerified}
                  style={{
                    background: isVerified ? 'var(--purple-dark)' : '#bbb',
                    color: 'white',
                    padding: '1.2rem',
                    fontSize: '1.1rem',
                    cursor: isVerified ? 'pointer' : 'not-allowed',
                    boxShadow: isVerified ? '6px 6px 0 var(--border)' : 'none',
                    transform: isVerified ? 'none' : 'translate(4px, 4px)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {submitting ? '처리 중...' : isVerified ? '예매 확정하기' : '인증 후 확정 가능'}
                </button>
              </aside>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
