
export default function Footer() {
  return (
    <footer className="footer" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
      {/* <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', letterSpacing: '-0.05em' }}>모로서기</h2> */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '1.2rem' }}>
        <a
          href="https://www.instagram.com/seoularts.moroseogi/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            cursor: 'pointer'
          }}
        >
          <img
            src="/instagram.png"
            alt="Instagram"
            style={{
              width: '32.4px',
              height: 'auto',
              filter: 'invert(12%) sepia(34%) saturate(2379%) hue-rotate(236deg) brightness(92%) contrast(96%)'
            }}
          />
        </a>
        <a
          href="http://instagram.com/moroangi"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            cursor: 'pointer'
          }}
        >
          <img
            src="/instagram.png"
            alt="Moroangi Instagram"
            style={{
              width: '32.4px',
              height: 'auto',
              filter: 'invert(12%) sepia(34%) saturate(2379%) hue-rotate(320deg) brightness(92%) contrast(96%)'
            }}
          />
        </a>
      </div>
      <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        © 2026 Moroseogi. All rights reserved.<br />
        Developed by Hyunjun Ahn
      </p>
    </footer>
  )
}
