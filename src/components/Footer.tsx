
export default function Footer() {
  return (
    <footer className="footer" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', letterSpacing: '-0.05em' }}>모로서기</h2>
      <div style={{ marginBottom: '2rem' }}>
        <a
          href="https://www.instagram.com/seoularts.moroseogi/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            opacity: 1,
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.filter = 'brightness(1.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.filter = 'none';
          }}
        >
          <img
            src="/instagram.png"
            alt="Instagram"
            style={{
              width: '40px',
              height: 'auto',
              filter: 'invert(15%) sepia(45%) saturate(3000%) hue-rotate(250deg) brightness(90%) contrast(110%)'
            }}
          />
        </a>
      </div>
      <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        © 2026 Hyunjun Ahn
      </p>
    </footer>
  )
}
