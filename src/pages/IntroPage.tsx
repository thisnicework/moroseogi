import { Link } from 'react-router-dom'

export default function IntroPage() {
  return (
    <main className="page">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline">&larr; 돌아가기</Link>
      </div>

      <div className="card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="mb-8 text-center" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem' }}>기획의도</h1>

        <div style={{ fontSize: '1.2rem', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
          {`<모로서기>는 정해진 방향이나 기준이 아닌,
각자가 선택한 방식으로 존재하는 몸과 감각을 바라보는 공연이다.

우리는 살아가며 끊임없이 정답과 기준을 요구받지만,
모든 순간이 하나의 방향으로 설명되거나 정리되지는 않는다.

오히려 비껴서고, 흔들리고, 머뭇거리는 상태 속에서
우리의 모습이 더 솔직하게 드러나기도 한다.

본 공연은 이러한 '비스듬한 존재 방식'에 주목한다.

어린 시절의 기억, 개인의 흔적, 인간과 기술의 경계,
그리고 누군가를 배웅하는 순간까지.

각 작품이 드러내는 존재 방식을 따라가며, 관객은 다양한 감각을 마주하게 된다.
그 흐름 속에서 자신만의 '모로 선' 감각을 발견하게 된다.`}
        </div>
      </div>
    </main>
  )
}
