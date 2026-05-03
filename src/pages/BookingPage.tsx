import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchEvents, createBooking, type Event, type Booking } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function BookingPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [successData, setSuccessData] = useState<Booking | null>(null)

  const [formData, setFormData] = useState({
    event_id: '',
    name: '',
    phone: '',
    headcount: 1
  })

  // SMS Verification state
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [sentCode, setSentCode] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [sendingCode, setSendingCode] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0) // 타이머 시간 (초)

  useEffect(() => {
    let interval: any
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && verificationSent && !isVerified) {
      toast.error('인증 시간이 만료되었습니다. 다시 시도해주세요.')
      setVerificationSent(false)
      setSentCode('')
    }
    return () => clearInterval(interval)
  }, [timeLeft, verificationSent, isVerified])

  useEffect(() => {
    fetchEvents().then(data => {
      const finalEvents = data.length > 0 ? data : [
        { id: 1, title: '모로서기', date: '2026.05.16.(SAT)', time: '18:30', location: '서울예술대학교 중앙광장, 빨간대문', total_seats: 30, occupancy: 0 },
        { id: 2, title: '모로서기', date: '2026.05.17.(SUN)', time: '18:30', location: '서울예술대학교 중앙광장, 빨간대문', total_seats: 30, occupancy: 0 }
      ]
      setEvents(finalEvents)

      // Default selection to first available event
      const firstAvailable = finalEvents.find(e => (e.occupancy || 0) < e.total_seats)
      if (firstAvailable) {
        setFormData(prev => ({ ...prev, event_id: firstAvailable.id.toString() }))
      } else if (finalEvents.length > 0) {
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

  const handleSendVerification = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      toast.error('올바른 휴대폰 번호를 입력해주세요.')
      return
    }

    setSendingCode(true)
    const toastId = toast.loading('인증번호를 발송 중입니다...')
    try {
      const res = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone })
      })
      const result = await res.json()

      if (result.success) {
        setSentCode(result.code)
        setVerificationSent(true)
        setTimeLeft(180) // 3분 설정
        toast.success(result.message || '인증번호가 발송되었습니다.', { id: toastId })
      } else {
        throw new Error(result.error || '발송 실패')
      }
    } catch (error: any) {
      toast.error('문자 발송에 실패했습니다: ' + error.message, { id: toastId })
    } finally {
      setSendingCode(false)
    }
  }

  const checkVerificationCode = () => {
    if (verificationCode === sentCode) {
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

    const selectedEvent = events.find(ev => ev.id.toString() === formData.event_id)
    if (selectedEvent && (selectedEvent.occupancy || 0) >= selectedEvent.total_seats) {
      toast.error('선택하신 회차는 이미 매진되었습니다.')
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

  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [countdown, setCountdown] = useState('')
  const BOOKING_START_TIME = new Date('2026-05-03T20:00:00+09:00')

  useEffect(() => {
    const checkTime = () => {
      const now = new Date()
      const diff = BOOKING_START_TIME.getTime() - now.getTime()

      if (diff <= 0) {
        setIsBookingOpen(true)
      } else {
        setIsBookingOpen(false)
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setCountdown(`${hours}시간 ${minutes}분 ${seconds}초`)
      }
    }

    checkTime()
    const timer = setInterval(checkTime, 1000)
    return () => clearInterval(timer)
  }, [])

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
              <span style={{ fontWeight: '600' }}>예매 번호</span>
              <span style={{ color: 'var(--purple)', fontWeight: '700', fontSize: '1.2rem' }}>{successData.booking_code}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>성함</span>
              <span style={{ fontWeight: '600' }}>{successData.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>연락처</span>
              <span style={{ fontWeight: '600' }}>{formatPhone(successData.phone)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>공연 일정</span>
              <span style={{ fontWeight: '600', textAlign: 'right' }}>
                {events.find(e => e.id === successData.event_id)?.date} {events.find(e => e.id === successData.event_id)?.time}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>장소</span>
              <span style={{ fontWeight: '600', textAlign: 'right' }}>서울예술대학교 중앙광장, 빨간대문</span>
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

  const allFull = events.length > 0 && events.every(ev => (ev.occupancy || 0) >= ev.total_seats)

  return (
    <main className="page" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="mb-8">
        <Link to="/" className="btn btn-outline">&larr; 돌아가기</Link>
      </div>

      <div className="card">
        <h1 className="mb-4" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem' }}>티켓 예매</h1>
        <p className="mb-12" style={{ color: 'var(--error)', fontWeight: '700', fontSize: '1.05rem' }}>
          * 본 공연은 회차별 1인 1매로 예매가 제한됩니다.
        </p>

        {loading ? (
          <p className="text-center">공연 정보를 불러오는 중입니다...</p>
        ) : events.length === 0 ? (
          <div className="text-center py-8">
            <p className="mb-4">현재 예매 가능한 공연 일정이 없습니다.</p>
            <Link to="/" className="btn btn-outline">홈으로 돌아가기</Link>
          </div>
        ) : !isBookingOpen ? (
          <div className="text-center py-12" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
            {/* <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>⏳</div> */}
            <h2 className="mb-4">예매 오픈 준비 중</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              티켓 예매는 <strong>2026년 5월 3일 20시</strong>부터 가능합니다.
            </p>
            <div style={{
              display: 'inline-block',
              background: 'var(--purple)',
              color: 'white',
              padding: '1.5rem 3rem',
              fontSize: '2rem',
              fontWeight: 'bold',
              border: '3px solid var(--border)',
              boxShadow: '8px 8px 0 var(--border)'
            }}>
              {countdown}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {allFull && (
              <div style={{
                background: 'var(--error)',
                color: 'white',
                padding: '1rem',
                textAlign: 'center',
                fontWeight: '700',
                marginBottom: '2rem',
                border: '3px solid var(--border)',
                boxShadow: '4px 4px 0 var(--border)'
              }}>
                현재 모든 회차가 매진되었습니다. 다음에 다시 방문해주세요!
              </div>
            )}
            <section style={{ marginBottom: '5rem' }}>
              <h2 className="mb-10" style={{ fontSize: '1.4rem', color: 'var(--purple-dark)' }}>1. 공연 일정을 선택해주세요</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {events.map(ev => {
                  const isSelected = formData.event_id === ev.id.toString()
                  const occupancy = ev.occupancy || 0
                  const isFull = occupancy >= ev.total_seats

                  return (
                    <div
                      key={ev.id}
                      onClick={() => !isFull && setFormData({ ...formData, event_id: ev.id.toString() })}
                      style={{
                        padding: '2.5rem 2rem',
                        border: `0.1875rem solid ${isFull ? 'var(--border)' : 'var(--border)'}`,
                        cursor: isFull ? 'not-allowed' : 'pointer',
                        background: (isFull) ? '#ffffff' : (isSelected ? 'var(--purple)' : '#ffffff'),
                        color: (isFull) ? 'var(--text)' : (isSelected ? 'var(--white)' : 'var(--text)'),
                        boxShadow: (isSelected || isFull) ? '0 0 0 transparent' : '0.5rem 0.5rem 0 var(--border)',
                        transform: (isSelected || isFull) ? 'translate(0.25rem, 0.25rem)' : 'none',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        minHeight: '180px',
                        justifyContent: 'center',
                        position: 'relative'
                      }}
                    >
                      <div style={{ fontWeight: '700', fontSize: '1.4rem', lineHeight: '1.2' }}>{ev.date}<br />{ev.time}</div>
                      <div style={{ fontSize: '1rem', opacity: 0.9 }}>{ev.location.includes('빨간대문') ? ev.location : `${ev.location}, 빨간대문`}</div>


                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.9rem',
                        marginTop: '0.5rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                      }}>
                        {!isFull && (
                          <div style={{
                            width: '1.25rem',
                            height: '1.25rem',
                            borderRadius: '50%',
                            border: `0.1875rem solid ${isSelected ? 'var(--white)' : 'var(--border)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                          }}>
                            {isSelected && (
                              <div style={{
                                width: '0.625rem',
                                height: '0.625rem',
                                borderRadius: '50%',
                                background: 'var(--white)',
                                animation: 'scaleUp 0.2s ease-out'
                              }} />
                            )}
                          </div>
                        )}
                        {isFull ? '매진' : isSelected ? 'SELECTED' : 'SELECT'}
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

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '4rem',
              alignItems: 'start',
              opacity: allFull ? 0.5 : 1,
              pointerEvents: allFull ? 'none' : 'auto'
            }}>
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
                    disabled={allFull}
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
                      disabled={isVerified || allFull}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline"
                      style={{ padding: '0 1.5rem', fontSize: '0.9rem', flexShrink: 0, whiteSpace: 'nowrap', boxShadow: (isVerified || allFull) ? 'none' : '4px 4px 0 var(--border)' }}
                      onClick={handleSendVerification}
                      disabled={isVerified || sendingCode || allFull}
                    >
                      {sendingCode ? '발송 중' : isVerified ? '인증됨' : '인증번호 전송'}
                    </button>
                  </div>
                  {verificationSent && !isVerified && (
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', animation: 'slideIn 0.3s ease-out' }}>
                      <div style={{ flex: 1, position: 'relative' }}>
                        <input
                          type="text"
                          className="form-control"
                          style={{ width: '100%', paddingRight: '4rem' }}
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder="인증번호 6자리"
                        />
                        {timeLeft > 0 && (
                          <span style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--error)',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                          }}>
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                          </span>
                        )}
                      </div>
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
                    <div style={{ fontWeight: '600', fontSize: '1.2rem' }}>{events.find(e => e.id.toString() === formData.event_id)?.title}</div>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>일정</div>
                    <div style={{ fontWeight: '600' }}>
                      {events.find(e => e.id.toString() === formData.event_id)?.date}<br />
                      {events.find(e => e.id.toString() === formData.event_id)?.time}
                    </div>
                  </div>
                  <div style={{ borderTop: '2px solid var(--border)', marginTop: '2rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600' }}>티켓 가격</span>
                    <span style={{ fontWeight: '700', color: 'var(--purple)', fontSize: '1.6rem' }}>FREE</span>
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
