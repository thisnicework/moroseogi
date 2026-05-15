import { useNavigate } from 'react-router-dom'

export default function IntroPage() {
  const navigate = useNavigate()
  return (
    <main className="page">
      <div className="mb-8">
        <button onClick={() => navigate(-1)} className="btn btn-outline">&larr; 돌아가기</button>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* 인사말 섹션 */}
        <div className="card" style={{ padding: '3rem' }}>
          <h2 className="mb-8" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem', color: 'var(--purple-dark)' }}>인사말</h2>
          
          <div style={{ fontSize: '1.15rem', whiteSpace: 'pre-line', lineHeight: '1.8', color: 'var(--text)' }}>
            {`안녕하세요.
서울예술대학교 공연학부 무용전공 교수 장혜진입니다.

독립창작프로젝트는 학사학위 전공심화과정 공연창작학부 학생들이 각자의 질문에서 출발해, 움직임과 장면, 관계와 감각을 하나의 공연으로 만들어가는 창작 과정입니다. 이번 공연 〈모로서기〉는 ‘비스듬한 세계를 만드는 연습’에서 시작되었습니다.

모로 선다는 것은 단순히 똑바로 서지 못하는 상태가 아니라, 익숙한 중심에서 잠시 벗어나 다른 감각으로 세계를 바라보는 일일지도 모릅니다. 이번 공연에서 학생들은 어린 시절의 실패와 시도를 소환하는 물체, 자신을 구성해온 움직임들을 다시 도형적으로 바라보는 발자국, 접촉과 동화의 의미를 질문하며 무용수의 미세한 움직임을 미러링하는 로봇, 그리고 가장자리에서 발생하는 만남과 감각의 진동들을 무대 위에 세워봅니다. 그 과정 안에는 각자의 고민과 시도, 의미 있는 실패, 그리고 그 이후의 찬란한 발견들이 함께 담겨 있습니다.

완성된 답을 보여주기보다는, 질문하는 몸들이 어떻게 서로의 세계를 기울이고 다시 세워가는지를 함께 감각해주시면 좋겠습니다. 이 공연이 관객 여러분께도 잠시 몸의 방향을 바꾸어보는 시간이 되기를 바랍니다.

서울예술대학교 무용전공에서 보낸 3년의 시간이 다시 한번 학사학위 과정의 시간과 공간 안에서 발효되는 이 순간, 조금 비스듬히 바라볼 때 열리는 다른 세계를 향해 용기 있게 나아가는 학생들에게 따뜻한 응원과 축하를 보냅니다.

감사합니다.`}
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'right', fontWeight: '700', fontSize: '1.3rem', color: 'var(--purple-dark)' }}>
            서울예술대학교 무용전공 교수 장혜진
          </div>
        </div>

        {/* 기획의도 섹션 */}
        <div className="card" style={{ padding: '3rem' }}>
          <h2 className="mb-8" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem', color: 'var(--purple-dark)' }}>기획의도</h2>

          <div style={{ fontSize: '1.15rem', whiteSpace: 'pre-line', lineHeight: '1.8', color: 'var(--text)' }}>
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
      </div>
    </main>
  )
}
