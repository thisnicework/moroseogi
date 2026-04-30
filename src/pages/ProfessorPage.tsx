import { Link } from 'react-router-dom'

export default function ProfessorPage() {
  return (
    <main className="page">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline">&larr; 돌아가기</Link>
      </div>

      <div className="card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 className="mb-4">지도교수</h1>
        <h2 className="mb-8" style={{ color: 'var(--text-muted)' }}>장혜진</h2>
        
        <div style={{ padding: '2rem', border: '2px dashed var(--purple)' }}>
          <p style={{ fontSize: '1.2rem' }}>[ 작성 예정 ]</p>
        </div>
      </div>
    </main>
  )
}
