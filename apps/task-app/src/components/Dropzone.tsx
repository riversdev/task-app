import { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { TaskCard } from '@/components'
import { TaskStatus, type Task } from '@/interfaces'
import { useAppSelector } from '@/hooks'
import { tasksApi } from '@/store/tasks'

interface Props {
  title: string
  description: string
  type: TaskStatus
  tasks: Task[]
  handleDropTask: (task: Task) => void
}

export const Dropzone = ({ title, description, type, tasks, handleDropTask }: Props) => {
  const cachedTasks = useAppSelector(tasksApi.endpoints.getTasks.select(null))
  const [isDragover, setIsDragover] = useState(false)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragover(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()

    if (e.currentTarget.contains(e.relatedTarget as Node) === false) setIsDragover(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    setIsDragover(false)

    const taskId = e.dataTransfer.getData('text/plain')

    const task = (cachedTasks.data || []).find(x => x.id === taskId)

    if (!task || task.status === type) return

    handleDropTask({ ...task, status: type })
  }

  return (
    <div
      className={`dropzone ${isDragover ? 'dragover' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Card.Title className="fw-bold">{title}</Card.Title>
      <Card.Text className="mb-4">{description}</Card.Text>
      <Row>
        {tasks.map(task => (
          <Col key={task.id} xs={12}>
            <TaskCard task={task} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
