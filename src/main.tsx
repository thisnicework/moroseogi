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
import ProfessorPage from './pages/ProfessorPage.tsx'
import CreditPage from './pages/CreditPage.tsx'
import BookingPage from './pages/BookingPage.tsx'
import LookupPage from './pages/LookupPage.tsx'
import AdminPage from './pages/AdminPage.tsx'

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
          <Route path="professor" element={<ProfessorPage />} />
          <Route path="credit" element={<CreditPage />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="lookup" element={<LookupPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
