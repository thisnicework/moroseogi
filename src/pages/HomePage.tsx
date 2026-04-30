import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <img
          src="/logo.png"
          alt="모로서기"
          style={{ width: '100%', maxWidth: '500px', height: 'auto', marginBottom: '1rem' }}
        />
        <p>각자가 선택한 방식으로 존재하는 몸과 감각을 바라보는 공연</p>
        <div className="mt-8">
          <Link to="/booking" className="btn" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
            예매하기
          </Link>
        </div>
      </section>

      <section className="grid-2 mb-8">
        <Link to="/intro" className="card">
          <h3>기획의도</h3>
          <p>우리는 살아가며 끊임없이 정답과 기준을 요구받지만...</p>
          <span className="mt-auto pt-4" style={{ fontWeight: 'bold' }}>자세히 보기 &rarr;</span>
        </Link>

        <Link to="/points" className="card">
          <h3>관람 포인트</h3>
          <p>각 작품이 드러내는 존재 방식을 따라가며 마주하는 다양한 감각</p>
          <span className="mt-auto pt-4" style={{ fontWeight: 'bold' }}>작품 목록 보기 &rarr;</span>
        </Link>

        <Link to="/professor" className="card">
          <h3>지도교수</h3>
          <p>장혜진 교수</p>
          <span className="mt-auto pt-4" style={{ fontWeight: 'bold' }}>자세히 보기 &rarr;</span>
        </Link>

        <Link to="/credit" className="card">
          <h3>CREDIT</h3>
          <p>TEAM. 모로서기 및 도움을 주신 분들</p>
          <span className="mt-auto pt-4" style={{ fontWeight: 'bold' }}>자세히 보기 &rarr;</span>
        </Link>
      </section>

      <section className="mt-8 text-center" style={{ borderTop: '2px solid var(--purple)', paddingTop: '4rem' }}>
        {/* <h2 className="mb-4"></h2> */}
        <div style={{ maxWidth: '800px', margin: '0 auto', border: '2px solid var(--purple)', padding: '1rem', background: 'var(--white)' }}>
          <img
            src="/poster.png"
            alt="모로서기 매거진 (포스터)"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </section>
    </main>
  )
}
