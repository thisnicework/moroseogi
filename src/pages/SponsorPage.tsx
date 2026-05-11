import { useNavigate } from 'react-router-dom'

export default function SponsorPage() {
  const navigate = useNavigate()
  return (
    <main className="page">
      <div className="mb-4">
        <button onClick={() => navigate(-1)} className="btn btn-outline">&larr; 돌아가기</button>
      </div>

      <div className="card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="mb-8 text-center" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem' }}>SPONSOR</h1>

        <div style={{ fontSize: '1.1rem', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* 사파리스팟 */}
          <div className="sponsor-item">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--purple-dark)' }}>사파리스팟</h2>
            <p style={{ wordBreak: 'keep-all' }}>
              Safarispot은 영화, 음악, 스포츠 등 문화적인 영역에서 영감을 받아 과하지 않은 디테일과 그래픽을 초점으로 디자인을 전개하는 유니섹스 브랜드입니다.
            </p>
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <a href="https://safarispot.kr/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                <img 
                  src="/safarispot.png" 
                  alt="사파리스팟 로고" 
                  style={{ maxHeight: '80px', maxWidth: '200px', objectFit: 'contain' }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/200x80?text=Safarispot+Logo';
                  }}
                />
              </a>
            </div>
          </div>

          <div style={{ borderBottom: '1px solid var(--border)', opacity: 0.3 }}></div>

          {/* 인센스월드 */}
          <div className="sponsor-item">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--purple-dark)' }}>인센스월드</h2>
            <p style={{ wordBreak: 'keep-all', marginBottom: '0.5rem' }}>
              인센스월드는 향의 세계를 만들고, 누구나 일상 속에서 향을 즐기는 문화를 만듭니다.
            </p>
            <p style={{ wordBreak: 'keep-all' }}>
              주식회사 인센스월드는 인센스(향) + 월드(세계) 두 단어의 합성어로 향의 세계를 만들고, 누구나 일상생활 속에서 향을 즐기는 문화를 만들어가는 30년 전통의 인센스 전문 기업으로서 2대째 가업을 승계하고 있습니다.
            </p>
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <a href="https://www.incenseworld.kr/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                <img 
                  src="/incenseworld.png" 
                  alt="인센스월드 로고" 
                  style={{ maxHeight: '80px', maxWidth: '200px', objectFit: 'contain', filter: 'brightness(0)' }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/200x80?text=Incenseworld+Logo';
                    e.currentTarget.style.filter = 'none'; // 에러 시 나오는 대체 이미지는 글씨가 보여야 하므로 필터 제거
                  }}
                />
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
