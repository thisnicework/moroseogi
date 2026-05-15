import { Link } from 'react-router-dom'

export default function BookingPage() {
  return (
    <main className="page" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="mb-8">
        <Link to="/" className="btn btn-outline">&larr; 돌아가기</Link>
      </div>

      <div className="card text-center" style={{ padding: '5rem 2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}></div>
        <h1 className="mb-4">예매가 종료되었습니다</h1>
        <p className="mb-12" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.6' }}>
          〈모로서기〉 공연에 보내주신 많은 관심과 성원에 감사드립니다.<br />
          현재 모든 회차의 온라인 예매가 마감되었습니다.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', maxWidth: '300px', margin: '0 auto' }}>
          <Link to="/lookup" className="btn w-full">나의 예매 확인</Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </main>
  )
}
