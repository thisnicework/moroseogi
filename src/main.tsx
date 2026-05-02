import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'

import App from './App.tsx'
import HomePage from './pages/HomePage.tsx'
import IntroPage from './pages/IntroPage.tsx'
import PointsPage from './pages/PointsPage.tsx'
import PointDetailPage from './pages/PointDetailPage.tsx'
import CreditPage from './pages/CreditPage.tsx'
import BookingPage from './pages/BookingPage.tsx'
import LookupPage from './pages/LookupPage.tsx'
import AdminPage from './pages/AdminPage.tsx'
import NoticePage from './pages/NoticePage.tsx'

// Browser detection for scaling
const ua = navigator.userAgent.toLowerCase();
const isSafari = ua.includes('safari') && !ua.includes('chrome') && !ua.includes('chromium');
const isChrome = ua.includes('chrome') || ua.includes('chromium');

if (isSafari) {
  document.documentElement.classList.add('is-safari');
} else if (isChrome) {
  document.documentElement.classList.add('is-chrome');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="intro" element={<IntroPage />} />
          <Route path="points" element={<PointsPage />} />
          <Route path="points/:id" element={<PointDetailPage />} />
          <Route path="credit" element={<CreditPage />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="lookup" element={<LookupPage />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
