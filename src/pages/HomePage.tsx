import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <main className="page">
      <div className="bento-grid">
        {/* 포스터 영역 (기존 로고 영역) */}
        <div className="bento-card bento-item-hero" style={{ padding: 0 }}>
          <img
            src="/poster.png"
            alt="모로서기 포스터"
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* 공연 정보 영역 */}
        <div className="bento-card bento-item-info" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--purple-light)', paddingBottom: '0.5rem' }}>공연 정보</h2>
          <div style={{ fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.8' }}>
            <div style={{ display: 'flex', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--purple)', display: 'inline-block', width: '80px', flexShrink: 0 }}>일시</span>
              <div>
                2026.05.16.(SAT) 18:30<br/>
                05.17.(SUN) 18:30
              </div>
            </div>
            <div style={{ display: 'flex', marginBottom: '0.5rem' }}><span style={{ color: 'var(--purple)', display: 'inline-block', width: '80px' }}>장소</span> <div>서울예술대학교 중앙광장,<br/>빨간대문</div></div>
            <div style={{ display: 'flex', marginBottom: '0.5rem' }}><span style={{ color: 'var(--purple)', display: 'inline-block', width: '80px' }}>러닝타임</span> <div>75분</div></div>
            <div style={{ display: 'flex' }}><span style={{ color: 'var(--purple)', display: 'inline-block', width: '80px' }}>지도교수</span> <div>장혜진 P</div></div>
          </div>
        </div>

        <div className="bento-card bento-item-actions" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--purple-dark)' }}>TICKET</h3>
          <Link to="/booking" className="btn" style={{ padding: '1.2rem 3rem', fontSize: '1.3rem', width: '100%', borderRadius: '12px' }}>
            예매하기
          </Link>
          <Link to="/lookup" className="btn btn-outline" style={{ padding: '0.8rem 2rem', fontSize: '1rem', width: '100%', borderRadius: '12px' }}>
            예매 조회 및 취소
          </Link>
        </div>

        {/* 개별 메뉴 카드들 */}
        <Link to="/intro" className="bento-card bento-item-small" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', borderBottom: 'none' }}>기획의도</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>우리는 살아가며 끊임없이 정답과 기준을 요구받지만...</p>
          <span className="mt-auto pt-4" style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--purple)' }}>자세히 보기 &rarr;</span>
        </Link>

        <Link to="/points" className="bento-card bento-item-small" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', borderBottom: 'none' }}>관람 포인트</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>각 작품이 드러내는 존재 방식을 따라가며...</p>
          <span className="mt-auto pt-4" style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--purple)' }}>작품 목록 보기 &rarr;</span>
        </Link>

        <Link to="/professor" className="bento-card bento-item-small" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', borderBottom: 'none' }}>지도교수</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>장혜진 교수</p>
          <span className="mt-auto pt-4" style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--purple)' }}>자세히 보기 &rarr;</span>
        </Link>

        <Link to="/credit" className="bento-card bento-item-small" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', borderBottom: 'none' }}>CREDIT</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>TEAM. 모로서기 및 도움을 주신 분들</p>
          <span className="mt-auto pt-4" style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--purple)' }}>자세히 보기 &rarr;</span>
        </Link>

      </div>
    </main>
  )
}
