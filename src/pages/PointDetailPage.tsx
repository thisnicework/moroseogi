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
        <div className="mb-8" style={{ borderBottom: '4px solid var(--purple)', paddingBottom: '1rem', display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
          <h1 style={{ borderBottom: 'none', paddingBottom: 0, margin: 0 }}>{point.title}</h1>
          <div style={{ color: 'var(--purple-dark)', fontSize: '1.1rem' }}>
            {point.choreographer && <span>{point.choreographer}</span>}
          </div>
        </div>
        
        <div className="mb-8" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--purple-dark)' }}>
          {point.location && <span>장소: {point.location}</span>}
          {point.duration && <span>소요시간: {point.duration}</span>}
        </div>

        <div style={{ fontSize: '1.2rem', whiteSpace: 'pre-line', lineHeight: '1.7', marginBottom: '2rem', wordBreak: 'keep-all' }}>
          {point.description}
        </div>

        {point.keywords.length > 0 && (
          <div style={{ borderTop: '2px solid var(--purple)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
            <h4 className="mb-4">Keyword</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {point.keywords.map((kw, i) => (
                <span key={i} style={{ background: 'var(--purple)', color: 'var(--bg)', padding: '0.2rem 0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {point.viewing_points && (
          <div style={{ borderTop: '2px solid var(--purple)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
            <h4 className="mb-4">관람 포인트</h4>
            <div style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--text-muted)', wordBreak: 'keep-all', whiteSpace: 'pre-line' }}>
              {point.viewing_points}
            </div>
          </div>
        )}

        {point.credits && (
          <div style={{ borderTop: '2px solid var(--purple)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
            <h4 className="mb-4">크레딧</h4>
            <div style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-muted)', whiteSpace: 'pre-line' }}>
              {point.credits}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
