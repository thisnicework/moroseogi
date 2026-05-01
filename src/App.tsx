import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')

  useEffect(() => {
    // 스크롤 리빌 효과를 위한 Intersection Observer 설정
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, observerOptions)

    // 모든 카드 요소들에 reveal 클래스 추가 및 관찰 시작
    const revealElements = document.querySelectorAll('.card, .bento-card, aside')
    revealElements.forEach(el => {
      el.classList.add('reveal')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [location.pathname]) // 페이지 이동 시마다 다시 실행

  return (
    <div className="app-container">
      <Navbar />
      <Outlet />
      {!isAdminPage && <Footer />}
    </div>
  )
}

export default App
