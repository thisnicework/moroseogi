import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
import MagazinePage from './pages/MagazinePage.tsx'
import SponsorPage from './pages/SponsorPage.tsx'

// Browser detection for scaling
const ua = navigator.userAgent.toLowerCase();
const isSafari = ua.includes('safari') && !ua.includes('chrome') && !ua.includes('chromium');
const isChrome = ua.includes('chrome') || ua.includes('chromium');

if (isSafari) {
  document.documentElement.classList.add('is-safari');
} else if (isChrome) {
  document.documentElement.classList.add('is-chrome');
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'intro', element: <IntroPage /> },
      { path: 'points', element: <PointsPage /> },
      { path: 'points/:id', element: <PointDetailPage /> },
      { path: 'credit', element: <CreditPage /> },
      { path: 'booking', element: <BookingPage /> },
      { path: 'lookup', element: <LookupPage /> },
      { path: 'notice', element: <NoticePage /> },
      { path: 'magazine', element: <MagazinePage /> },
      { path: 'sponsor', element: <SponsorPage /> },
      { path: 'admin', element: <AdminPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-center" />
    <RouterProvider router={router} />
  </StrictMode>,
)
