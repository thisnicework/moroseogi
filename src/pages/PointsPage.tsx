import { Link } from 'react-router-dom'

export const pointsData = [
  { id: 1, title: '① (작성 예정)', choreographer: '작성 예정', duration: '', location: '', keywords: [], description: '내용 작성 예정' },
  { id: 2, title: '② (작성 예정)', choreographer: '작성 예정', duration: '', location: '', keywords: [], description: '내용 작성 예정' },
  { id: 3, title: '③ In the Loop', choreographer: '김수빈', duration: '10분', location: '서울예술대학교 빨간대문', keywords: ['실시간 인터랙션', '컴퓨터안무', '피드백루프'], description: `인간의 몸이 지닌 감각과 기계의 움직임이 서로 얽히며, \n신체의 경계가 확장되는 순간을 공유한다.\n로봇은 단순한 재현 장치가 아니라, 인간의 몸과 상호작용하며 감각적 순환을 만든다. 이 공연은 기술의 ‘필요’를 증명하기보다, 감각과 질문의 확장을 보여준다.` },
  { id: 4, title: '④ 점이 되는 당신에게', choreographer: '임예주', duration: '20분', location: '서울예술대학교 빨간대문', keywords: ['끄덕임', '경청', '기억'], description: `<점이 되는 당신에게>에서는 \n출연자와 관객이 만나는 찰나의 순간이 더 길어진다.\n우리는 당신을 더 잘 만나기 위해\n그러니까 당신의 존재감을 더욱 느끼기 위해\n되려 당신을 직시하지 않는 태도로 아슬히 다가간다.\n애써 느리게, 굳이 부정확함을 감수하며.\n끄덕이는 몸들은 만남을 기념하는 춤을 추어 건넨다.\n결국, 극장으로부터 점이 될 당신에게.` }
]

export default function PointsPage() {
  return (
    <main className="page">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline">&larr; 홈으로</Link>
      </div>

      <h1 className="mb-8 text-center">관람 포인트</h1>
      
      <div className="grid-2">
        {pointsData.map((point) => (
          <Link key={point.id} to={`/points/${point.id}`} className="card">
            <h2 className="mb-2">{point.title}</h2>
            <p className="mb-4" style={{ color: 'var(--text-muted)' }}>안무: {point.choreographer}</p>
            <span className="mt-auto pt-4" style={{ fontWeight: 'bold' }}>작품 상세 보기 &rarr;</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
