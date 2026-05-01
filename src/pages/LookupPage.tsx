import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { lookupBooking, cancelBooking, type Booking } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function LookupPage() {
  const location = useLocation()
  const [phone, setPhone] = useState(location.state?.phone || '')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  // SMS Verification state
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [sendingCode, setSendingCode] = useState(false)

  useEffect(() => {
    if (location.state?.phone) {
      setIsVerified(true)
      handleSearch()
    }
    // eslint-disable-next-line
  }, [location.state])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11)
    setPhone(value)
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
    if (phone.length < 10) {
      toast.error('올바른 연락처를 입력해주세요.')
      return
    }
    setSendingCode(true)
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

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!phone) {
      toast.error('연락처를 입력해주세요.')
      return
    }
    if (!isVerified) {
      toast.error('휴대폰 인증을 완료해주세요.')
      return
    }

    setLoading(true)
    try {
      const data = await lookupBooking(phone)
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
    <main className="page" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="mb-8">
        <Link to="/" className="btn btn-outline">&larr; 홈으로</Link>
      </div>

      {!searched ? (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 className="mb-12 text-center" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem' }}>예매 조회</h1>
          
          <form onSubmit={handleSearch}>
            <div className="form-group mb-10">
              <label className="form-label">연락처</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input 
                  type="tel" 
                  className="form-control"
                  style={{ flex: 1, fontSize: '1.1rem', padding: '1rem' }}
                  value={formatPhone(phone)}
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
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', animation: 'slideIn 0.3s ease-out' }}>
                  <input
                    type="text"
                    className="form-control"
                    style={{ flex: 1, padding: '1rem' }}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="인증번호 4자리"
                  />
                  <button 
                    type="button" 
                    className="btn" 
                    style={{ padding: '0 2rem', fontSize: '1rem' }}
                    onClick={checkVerificationCode}
                  >
                    확인
                  </button>
                </div>
              )}
              <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
                * 예매 시 사용한 연락처로 본인 인증을 진행해주세요.
              </p>
            </div>

            <button 
              type="submit" 
              className="btn w-full mt-8" 
              disabled={loading || !isVerified}
              style={{ 
                background: isVerified ? 'var(--purple)' : '#bbb', 
                color: 'white',
                cursor: isVerified ? 'pointer' : 'not-allowed',
                boxShadow: isVerified ? '6px 6px 0 var(--border)' : 'none',
                transform: isVerified ? 'none' : 'translate(4px, 4px)'
              }}
            >
              {loading ? '조회 중...' : isVerified ? '조회하기' : '인증 후 조회 가능'}
            </button>
          </form>
        </div>
      ) : (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto', animation: 'slideIn 0.5s ease-out' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid var(--purple-light)', paddingBottom: '1rem' }}>
            <h2 style={{ margin: 0 }}>예매 내역</h2>
            <button 
              onClick={() => { setSearched(false); setIsVerified(false); setVerificationSent(false); }} 
              className="btn btn-outline" 
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              다른 번호로 조회
            </button>
          </div>
          {bookings.length === 0 ? (
            <div className="text-center py-8">
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>해당 정보로 조회된 예매 내역이 없습니다.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {bookings.map(b => (
                <div key={b.id} style={{ 
                  border: '3px solid var(--border)', 
                  padding: '2rem', 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '1.5rem',
                  background: b.status === 'cancelled' ? 'rgba(0,0,0,0.03)' : 'var(--white)',
                  boxShadow: '6px 6px 0 var(--border)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {b.status === 'cancelled' && (
                    <div style={{ 
                      position: 'absolute', 
                      top: '1rem', 
                      right: '-2rem', 
                      background: 'var(--error)', 
                      color: 'white', 
                      padding: '0.25rem 3rem', 
                      transform: 'rotate(45deg)',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>CANCELLED</div>
                  )}
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: b.status === 'cancelled' ? 'var(--text-muted)' : 'var(--purple-dark)' }}>
                        {b.events?.title}
                      </h3>
                      <p style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                        {b.events?.date} {b.events?.time}
                      </p>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{b.events?.location}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>예매 코드</p>
                      <p style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--purple)' }}>{b.booking_code}</p>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.95rem', marginRight: '1rem' }}>상태: <strong>{b.status === 'cancelled' ? '취소됨' : '예약완료'}</strong></span>
                      <span style={{ fontSize: '0.95rem' }}>인원: <strong>{b.headcount}명</strong></span>
                    </div>
                    {b.status !== 'cancelled' && (
                      <button onClick={() => b.id && handleCancel(b.id)} className="btn" style={{ padding: '0.6rem 1.5rem', background: 'var(--error)', borderColor: 'var(--error)', fontSize: '0.9rem' }}>
                        취소하기
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
