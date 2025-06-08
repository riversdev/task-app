import { useEffect } from 'react'
import { Footer, Navbar } from '@/components'

interface Props {
  title: string
  children?: React.ReactNode
}

export const AppLayout = ({ title, children }: Props) => {
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar title={title} bgTransparent />
      <div className="flex-fill d-flex flex-row">{children}</div>
      <Footer />
    </div>
  )
}
