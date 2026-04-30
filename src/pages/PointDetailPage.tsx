import { useParams, Link, Navigate } from 'react-router-dom'
import { pointsData } from './PointsPage'

export default function PointDetailPage() {
  const { id } = useParams()
  const point = pointsData.find((p) => p.id === Number(id))

  if (!point) return <Navigate to="/points" />

  return (
    <main className="page">
      <div className="mb-4">
        <Link to="/points" className="btn btn-outline">&larr; 목록으로</Link>
      </div>

      <div className="card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="mb-4" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem' }}>{point.title}</h1>
        
        <div className="mb-8" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontWeight: 'bold' }}>
          {point.choreographer && <span>안무: {point.choreographer}</span>}
          {point.location && <span>장소: {point.location}</span>}
          {point.duration && <span>소요시간: {point.duration}</span>}
        </div>

        <div style={{ fontSize: '1.2rem', whiteSpace: 'pre-line', lineHeight: '2', marginBottom: '2rem' }}>
          {point.description}
        </div>

        {point.keywords.length > 0 && (
          <div style={{ borderTop: '2px solid var(--purple)', paddingTop: '1rem' }}>
            <h4 className="mb-2">Keyword</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {point.keywords.map((kw, i) => (
                <span key={i} style={{ background: 'var(--purple)', color: 'var(--bg)', padding: '0.2rem 0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
