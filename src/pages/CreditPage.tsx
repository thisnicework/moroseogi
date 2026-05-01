import { Link } from 'react-router-dom'

export default function CreditPage() {
  return (
    <main className="page">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline">&larr; 돌아가기</Link>
      </div>

      <div className="card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="mb-8 text-center" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem' }}>CREDIT</h1>

        <div style={{ marginBottom: '4rem' }}>
          <div className="mb-8">
            <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Choreographer</h4>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>김다은 김수빈 손승하 양브라이언 양하은 염지원 이봄 임예주</p>
          </div>

          <div className="grid-2" style={{ gap: '1.5rem 2rem' }}>
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

        <div style={{ marginTop: '4rem' }}>
          <h3 className="mb-6 text-center">도움을 주신 분들</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div className="grid-2" style={{ gap: '1.5rem 2rem' }}>
              <div>
                <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>공연창작학부 책임교수</h4>
                <p>김승미</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>미디어창작학부 책임교수</h4>
                <p>임준빈</p>
              </div>
            </div>

            <div className="grid-2" style={{ gap: '1.5rem 2rem' }}>
              <div>
                <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>연극 책임교수</h4>
                <p>조경향</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>무용 책임교수</h4>
                <p>이우재</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>연기 책임교수</h4>
                <p>최정선</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>예술경영 책임교수</h4>
                <p>남승헌</p>
              </div>
            </div>

            <div className="grid-2" style={{ gap: '1.5rem 2rem' }}>
              <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>공연기획 지도교수</h4><p>송희영</p></div>
              <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>무대미술 지도교수</h4><p>정승호</p></div>
              <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>무대조명 지도교수</h4><p>나한수</p></div>
              <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>무대음향 지도교수</h4><p>안창용</p></div>
              <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>무대감독 지도교수</h4><p>김동혁</p></div>
              <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>무대의상 지도교수</h4><p>김상희</p></div>
              <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>무대메이크업 지도교수</h4><p>이무일</p></div>
            </div>

            <div className="grid-2" style={{ gap: '1.5rem 2rem' }}>
              <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>공연창작학부 행정조교</h4><p>김현범</p></div>
              <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>미디어창작학부 행정조교</h4><p>김강은</p></div>
              <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>공연학부 행정조교</h4><p>정현조, 이시연, 곽민기</p></div>
              <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>공연학부 기술조교</h4><p>이하은, 장순호</p></div>
              <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>예술경영 행정조교</h4><p>최예은</p></div>
              <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>영상/아카이빙</h4><p>황용회</p></div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4 className="mb-4" style={{ color: 'var(--purple)', fontWeight: '600', fontSize: '1rem' }}>&lt;창작실습지원센터&gt;</h4>
              <div className="grid-2" style={{ gap: '1.5rem 2rem' }}>
                <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>창작실습지원센터 센터장</h4><p>하창용</p></div>
                <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>창작실습팀장</h4><p>이상규</p></div>
                <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>컴퓨터랩</h4><p>황용회</p></div>
                <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>무대공방</h4><p>이강원, 이보한</p></div>
                <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>조명</h4><p>윤정주</p></div>
                <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>영상</h4><p>이승훈, 이지훈</p></div>
                <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>음향</h4><p>김경훈, 이경민</p></div>
                <div><h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>혁신지원사업</h4><p>김누리, 이지훈</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
