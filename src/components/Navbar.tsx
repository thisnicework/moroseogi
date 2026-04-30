import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__logo">모로서기</NavLink>
      <div className="navbar__links">
        <NavLink to="/intro" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>기획의도</NavLink>
        <NavLink to="/points" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>관람포인트</NavLink>
        <NavLink to="/professor" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>지도교수</NavLink>
        <NavLink to="/credit" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>크레딧</NavLink>
        <NavLink to="/booking" className="btn" style={{ padding: '0.25rem 1rem', marginLeft: '1rem', border: '1px solid white' }}>예매하기</NavLink>
      </div>
    </nav>
  )
}
