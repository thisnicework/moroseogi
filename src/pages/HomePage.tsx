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
          <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text)' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span style={{ fontWeight: '600', minWidth: '70px' }}>공연명</span> | <span>모로서기</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.2rem' }}>
              <span style={{ fontWeight: '600', minWidth: '70px' }}>일시</span> |
              <div>
                <div>2026.05.16.(SAT) 18:30</div>
                <div style={{ paddingLeft: '2.1rem' }}>- 05.17.(SUN) 18:30</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span style={{ fontWeight: '600', minWidth: '70px' }}>장소</span> | <span>서울예술대학교 중앙광장, 빨간대문</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span style={{ fontWeight: '600', minWidth: '70px' }}>러닝타임</span> | <span>75분</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ fontWeight: '600', minWidth: '70px' }}>지도교수</span> | <span>장혜진 P</span>
            </div>
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
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', borderBottom: 'none' }}>공연 소개</h3>
          <span className="mt-auto pt-4" style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--purple)' }}>자세히 보기 &rarr;</span>
        </Link>

        <Link to="/points" className="bento-card bento-item-small" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', borderBottom: 'none' }}>작품 소개</h3>
          <span className="mt-auto pt-4" style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--purple)' }}>작품 목록 보기 &rarr;</span>
        </Link>

        <Link to="/notice" className="bento-card bento-item-small" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', borderBottom: 'none' }}>공지사항</h3>
          <span className="mt-auto pt-4" style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--purple)' }}>내용 확인하기 &rarr;</span>
        </Link>

        <Link to="/credit" className="bento-card bento-item-small" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', borderBottom: 'none' }}>CREDIT</h3>
          <span className="mt-auto pt-4" style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--purple)' }}>자세히 보기 &rarr;</span>
        </Link>

      </div>
    </main>
  )
}
