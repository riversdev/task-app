import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { TaskPriority, type Task } from '@/interfaces'
import { AnimatePresence, motion } from 'motion/react'

interface Props {
  task: Task
  handleTaskDelete: (taskId: string) => void
}

const taskColor = {
  [TaskPriority.HIGH]: 'danger',
  [TaskPriority.MEDIUM]: 'warning',
  [TaskPriority.LOW]: 'normal',
}

export const TaskCard = ({ task, handleTaskDelete }: Props) => {
  const [dragging, setDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id)
    setDragging(true)
  }

  const handleDragEnd = () => setDragging(false)

  return (
    <Card
      bg="dark"
      draggable
      className="cursor-pointer mb-2"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ opacity: dragging ? 0.1 : 1 }}
    >
      <motion.div className="card-body" onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
        <div className="d-flex align-items-center gap-3">
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between flex-wrap">
              <h6 className="mb-1">{task.title}</h6>
              {task.priority && task.priority !== TaskPriority.LOW && (
                <div>
                  <i className={`fa-solid fa-sm fa-circle text-${taskColor[task.priority]}`}></i>
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between flex-wrap">
              {task.assignedTo && <small className="text-muted me-3">for {task.assignedTo}</small>}
              {task.dueDate && <small className="text-muted">expires on {task.dueDate.toDateString()}</small>}
            </div>
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Button variant="danger" size="sm" onClick={() => handleTaskDelete(task.id)}>
                  <i className="fa-solid fa-trash" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Card>
  )
}
