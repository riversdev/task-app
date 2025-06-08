import { AppLayout } from '@/layouts'

export const HomePage = () => {
  return (
    <AppLayout title="Task App">
      <div className="container">
        <h1>HomePage</h1>
        <p>This is the home page where you can manage your tasks.</p>
      </div>
    </AppLayout>
  )
}
