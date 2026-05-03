import { useNavigate } from 'react-router-dom'

const guideData = [
  {
    title: '관람 안내',
    items: [
      '티켓 부스는 빨간대문 로비에서 운영되며, 이후 안내에 따라 야외 공연부터 빨간대문 공연까지 순차적으로 관람하게 됩니다.',
      '본 공연은 전석 자유석으로 운영되며, 거동이 불편하신 관객께서는 사전 문의 부탁드립니다.',
      '본 공연은 인터미션 없이 약 70분 동안 진행됩니다.',
      '공연장 내에서는 식수를 포함한 모든 음식물 반입 및 섭취가 불가합니다.',
      '공연 시작 후에는 입장이 제한되며, 중도 퇴장 시 재입장이 불가합니다.',
      '스마트워치를 포함한 모든 전자기기의 전원은 종료 부탁드립니다.',
      '커튼콜을 제외한 사전에 협의되지 않은 촬영 및 녹음은 불가합니다.'
    ]
  },
  {
    title: '티켓 수령',
    items: [
      '예매자에 한하여 공연 시작 1시간 전부터 티켓 수령이 가능합니다.',
      '예매자 성함 및 전화번호 뒷자리 확인 후 수령 가능합니다.',
      '티켓 수령 후 분실 및 훼손 시 재발권이 불가능합니다.',
      '본 공연은 전석 비지정석으로 현장에서 모든 좌석은 랜덤 배정됩니다.',
      '공연 시작 5분 전까지 미수령 시 현장 예매로 전환됩니다.'
    ]
  },
  {
    title: '현장 예매',
    items: [
      '현장 예매는 공연 당일 미수령 및 취소표에 한해 진행됩니다.',
      '공연 시작 1시간 전부터 티켓부스에서 선착순으로 1인 1매 대기 명단 작성이 가능합니다.',
      '공연 시작 5분 전 대기 명단 호명하며, 현장에 없을 시 자동 취소됩니다.',
      '미수령 및 취소표가 발생하지 않을 시, 현장 예매가 불가합니다.'
    ]
  }
]

export default function NoticePage() {
  const navigate = useNavigate()
  return (
    <main className="page">
      <div className="mb-4">
        <button onClick={() => navigate(-1)} className="btn btn-outline">&larr; 돌아가기</button>
      </div>

      <div className="card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="mb-12 text-center" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem' }}>공연 관람 안내</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {guideData.map((section, idx) => (
            <section key={idx} style={{ animation: `fadeIn 0.5s ease-out ${idx * 0.1}s both` }}>
              <h2 className="mb-6" style={{
                fontSize: '1.5rem',
                color: 'var(--purple)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ width: '4px', height: '1.5rem', background: 'var(--purple)' }}></span>
                {section.title}
              </h2>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} style={{
                    fontSize: '1.05rem',
                    lineHeight: '1.6',
                    color: 'var(--text)',
                    display: 'flex',
                    gap: '0.5rem',
                    wordBreak: 'keep-all'
                  }}>
                    <span style={{ color: 'var(--purple)', fontWeight: 'bold' }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div style={{
          marginTop: '6rem',
          paddingTop: '2rem',
          borderTop: '1px dashed var(--border)',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.9rem'
        }}>
          <p>공연 관련 문의는 인스타그램 @@soeularts.moroseogi 로 부탁드립니다.</p>
        </div>
      </div>
    </main>
  )
}
