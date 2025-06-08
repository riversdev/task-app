import { BrowserRouter } from 'react-router'
import { AppRouter } from '@/router'

export const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
