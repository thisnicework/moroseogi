import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <div className="app-container">
      <Navbar />
      <Outlet />
      {!isAdminPage && <Footer />}
    </div>
  )
}

export default App
