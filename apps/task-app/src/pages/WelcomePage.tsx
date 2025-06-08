import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { AppLayout } from '@/layouts'

export const WelcomePage = () => {
  const navigate = useNavigate()

  return (
    <AppLayout title="Welcome to the TaskApp">
      <div className="flex-fill d-flex align-items-center justify-content-center">
        <div className="cursor-pointer p-3 text-center" onClick={() => navigate('/home', { viewTransition: true })}>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <i className="fa-solid fa-10x fa-list-check"></i>
            <div>
              <h5 className="m-0 d-inline">
                <i className="fa-solid fa-hand-pointer"></i>
                <span className="mx-2">Start planning in</span>
              </h5>
              <h1 className="m-0 d-inline fw-bold">TaskApp</h1>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  )
}
