import { BrowserRouter } from 'react-router'
import { ToastContainer } from 'react-bootstrap'
import { AppRouter } from '@/router'

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <ToastContainer position="top-center" draggable />
    </>
  )
}
