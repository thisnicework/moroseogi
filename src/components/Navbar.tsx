import { NavLink } from 'react-router-dom'
export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__logo">
        <img src="/logo.svg" alt="모로서기" />
      </NavLink>
    </nav>
  )
}
