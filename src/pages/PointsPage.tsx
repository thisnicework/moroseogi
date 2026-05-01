import { Link } from 'react-router-dom'

export const pointsData = [
  {
    id: 1,
    title: '① 다 GYM',
    choreographer: '김다은 손승하 양브라이언 양하은 염지원',
    duration: '15분',
    location: '서울예술대학교 중앙광장',
    keywords: ['어린 시절', '시도', 'Identity'],
    description: '"다 GYM"은 자아 형성의 과정을 되돌아보는 시선을 통해 자신을 다시금 바라보는 작품이다.\n정글짐은 성장과 시도, 실패, 관계가 이루어지는 상징적 공간이자 어린 시절 자아형성의 과정을 통해 현재의 ‘나’를 조명하고 이해하고자 한다.',
    viewing_points: '',
    credits: ''
  },
  {
    id: 2,
    title: '② 보이기까지',
    choreographer: '이봄',
    duration: '20분',
    location: '서울예술대학교 빨간대문',
    keywords: ['기억', '목격자', '발견'],
    description: '기억을 더듬는다는 것은 무엇인가?\n그것은 단순히 지나간 일을 떠올리는 것이 아니라, 나로부터 놓쳐진 흔적들을 발견하는 일이다.\n그 흔적을 쫓아 <보이기까지>는 무대에 뒤늦게 도착한 익명의 목격자를 소환하고,\n지나간 기억 속 남겨진 공동의 몸들은 함께 ‘춤의 기억’을 더듬는다.',
    viewing_points: '',
    credits: ''
  },
  {
    id: 3,
    title: '③ In the Loop',
    choreographer: '김수빈',
    duration: '10분',
    location: '서울예술대학교 빨간대문',
    keywords: ['실시간 인터랙션', '컴퓨터안무', '피드백루프'],
    description: '인간의 몸이 지닌 감각과 기계의 움직임이 서로 얽히며, \n신체의 경계가 확장되는 순간을 공유한다.\n로봇은 단순한 재현 장치가 아니라, 인간의 몸과 상호작용하며 감각적 순환을 만든다. 이 공연은 기술의 ‘필요’를 증명하기보다, 감각과 질문의 확장을 보여준다.',
    viewing_points: '',
    credits: ''
  },
  {
    id: 4,
    title: '④ 점이 되는 당신에게',
    choreographer: '임예주',
    duration: '20분',
    location: '서울예술대학교 빨간대문',
    keywords: ['끄덕임', '경청', '기억'],
    description: '<점이 되는 당신에게>에서는 \n출연자와 관객이 만나는 찰나의 순간이 더 길어진다.\n우리는 당신을 더 잘 만나기 위해\n그러니까 당신의 존재감을 더욱 느끼기 위해\n되려 당신을 직시하지 않는 태도로 아슬히 다가간다.\n애써 느리게, 굳이 부정확함을 감수하며.\n끄덕이는 몸들은 만남을 기념하는 춤을 추어 건넨다.\n결국, 극장으로부터 점이 될 당신에게.',
    viewing_points: '',
    credits: ''
  }
]

export default function PointsPage() {
  return (
    <main className="page">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline">&larr; 홈으로</Link>
      </div>

      <h1 className="mb-8 text-center">작품 소개</h1>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '2rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {pointsData.map((point) => (
          <Link key={point.id} to={`/points/${point.id}`} className="card">
            <h2 className="mb-2" style={{ fontSize: '1.5rem' }}>{point.title}</h2>
            <p className="mb-4" style={{ color: 'var(--text-muted)' }}>안무: {point.choreographer}</p>
            <span className="mt-auto pt-4" style={{ fontWeight: 'bold' }}>작품 상세 보기 &rarr;</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
