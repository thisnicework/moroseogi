import { Link } from 'react-router-dom'

const notices = [
  {
    id: 1,
    title: '예매 티켓 수령 안내',
    date: '2026.05.01',
    content: '티켓은 공연 시작 1시간 전부터 현장 매표소에서 수령 가능합니다. 예매 내역(이름/연락처)을 제시해 주세요.'
  },
  {
    id: 2,
    title: '공연장 입장 및 관람 안내',
    date: '2026.05.01',
    content: '공연 시작 후에는 입장이 제한될 수 있으니 최소 10분 전까지 입장 완료 부탁드립니다. 공연 중 사진 및 동영상 촬영은 금지되어 있습니다.'
  },
  {
    id: 3,
    title: '주차 공간 안내',
    date: '2026.04.30',
    content: '공연장 내 주차 공간이 협소하오니 가급적 대중교통 이용을 권장드립니다. 교내 주차 시 주차권 발권이 가능합니다.'
  }
]

export default function NoticePage() {
  return (
    <main className="page">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline">&larr; 돌아가기</Link>
      </div>

      <div className="card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="mb-10 text-center" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem' }}>공지사항</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {notices.map((notice) => (
            <div key={notice.id} style={{ 
              borderBottom: '1px solid var(--border)', 
              paddingBottom: '1.5rem',
              animation: 'slideIn 0.3s ease-out'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--purple-dark)', margin: 0 }}>{notice.title}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{notice.date}</span>
              </div>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text)', wordBreak: 'keep-all' }}>
                {notice.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
