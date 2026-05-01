import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <h2 style={{ marginBottom: '1rem' }}>모로서기</h2>
      <p style={{ color: 'var(--text-muted)' }}>
        <Link to="/lookup" style={{ textDecoration: 'underline' }}>예매 조회 및 취소</Link>
        {' | '}
        <Link to="/admin" style={{ textDecoration: 'underline' }}>어드민 대시보드</Link>
      </p>
      <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        © 2026 Hyunjun Ahn
      </p>
    </footer>
  )
}
