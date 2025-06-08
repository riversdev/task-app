import { Routes, Route, Navigate } from 'react-router'
import { WelcomePage, HomePage } from '@/pages'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<HomePage />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
