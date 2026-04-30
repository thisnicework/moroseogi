import { Link } from 'react-router-dom'

export default function CreditPage() {
  return (
    <main className="page">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline">&larr; 돌아가기</Link>
      </div>

      <div className="card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="mb-8 text-center" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem' }}>CREDIT</h1>
        
        <div className="mb-8">
          <h2 className="mb-4 text-center">TEAM. 모로서기</h2>
          <div className="grid-2" style={{ gap: '1rem' }}>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Choreographer</h4>
              <p>김다은 김수빈 손승하 양브라이언 양하은 염지원 이봄 임예주</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Executive Producer</h4>
              <p>조은지</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Project Manager</h4>
              <p>김여민 장평화</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Stage Manager</h4>
              <p>윤예빈</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Scenographer</h4>
              <p>김진선 이규민 차재이</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Lighting Designer</h4>
              <p>박재욱</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Lighting Operator</h4>
              <p>홍준기</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Sound Designer</h4>
              <p>서우림</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Sound Operator</h4>
              <p>이다현</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Music</h4>
              <p>정주원 조한아</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Software Developer</h4>
              <p>안현준</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Writer</h4>
              <p>강다연</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Videographer</h4>
              <p>노위찬 박상협 임성종</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Visual Creator</h4>
              <p>차재윤</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Photographer</h4>
              <p>김형모</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-center">Special Thanks to</h3>
          <div style={{ padding: '2rem', border: '2px dashed var(--purple)', textAlign: 'center' }}>
            <p>[ 작성 예정 ]</p>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-center">도움을 주신 분들</h3>
          <div style={{ padding: '2rem', border: '2px dashed var(--purple)', textAlign: 'center' }}>
            <p>[ 작성 예정 ]</p>
          </div>
        </div>
      </div>
    </main>
  )
}
