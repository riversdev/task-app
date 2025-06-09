import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Card } from 'react-bootstrap'
import { AnimatePresence, motion } from 'motion/react'
import Swal from 'sweetalert2'
import { TASK_COLOR } from '@/utils'
import { useApiTasks } from '@/hooks'
import { TaskPriority, type Task } from '@/interfaces'

interface Props {
  task: Task
}

export const TaskCard = ({ task }: Props) => {
  const navigate = useNavigate()
  const { deleteTask, isDeleting } = useApiTasks()
  const [dragging, setDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id || '')
    setDragging(true)
  }

  const handleDragEnd = () => setDragging(false)

  const handleTaskDelete = async (taskId: string) => {
    const { value } = await Swal.fire<boolean>({
      title: 'Deleting',
      html: `<p class="card-text">Are you sure ?</p>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ok, Delete',
      confirmButtonColor: 'var(--bs-primary)',
      cancelButtonText: 'Check',
      cancelButtonColor: 'var(--bs-gray)',
    })

    if (!value) return

    deleteTask(taskId)
  }

  return (
    <Card
      bg="dark"
      draggable
      className="cursor-pointer mb-2"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => {
        if (!isDeleting) navigate(`/tasks/${task.id}`)
      }}
      style={{ opacity: dragging ? 0.1 : 1 }}
    >
      <motion.div className="card-body" onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
        <div className="d-flex align-items-center gap-3">
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between flex-wrap">
              <h6 className="mb-1">{task.title}</h6>
              {task.priority && task.priority !== TaskPriority.LOW && (
                <div>
                  <i className={`fa-solid fa-sm fa-circle text-${TASK_COLOR[task.priority]}`}></i>
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between flex-wrap">
              {task.assignedTo && <small className="text-muted me-3">for {task.assignedTo}</small>}
              {task.dueDate && <small className="text-muted">expires on {new Date(task.dueDate).toDateString()}</small>}
            </div>
          </div>
          <AnimatePresence>
            {(isHovered || isDeleting) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Button
                  variant="danger"
                  size="sm"
                  disabled={isDeleting}
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()

                    handleTaskDelete(task.id || '')
                  }}
                >
                  {isDeleting ? <i className="fa-solid fa-spin fa-spinner" /> : <i className="fa-solid fa-trash" />}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Card>
  )
}
