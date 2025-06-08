import { Routes, Route, Navigate } from 'react-router'
import { BoardPage, TaskPage, TasksPage, WelcomePage } from '@/pages'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<BoardPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/tasks/:id" element={<TaskPage />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
