import { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { TaskCard } from '@/components'
import { TaskPriority, TaskStatus, type Task } from '@/interfaces'

const exampleTask: Task = {
  id: '683cf3a25e9c0a0d57767307',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  title: 'Search gems',
  description: 'Find the time gem',
  priority: TaskPriority.MEDIUM,
  dueDate: new Date('2025-11-01'),
  assignedTo: 'Alejandro Ríos',
  status: TaskStatus.TODO,
}

interface Props {
  title: string
  description: string
  type: TaskStatus
  tasks: Task[]
}

export const Dropzone = ({ title, description, type }: Props) => {
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

    handleTaskUpdate(taskId, type)
  }

  const handleTaskUpdate = (taskId: string, newStatus: TaskStatus) => {
    console.log(`Task ${taskId} updated to status ${newStatus}`)
  }

  const handleTaskDelete = (taskId: string) => {
    console.log(`Task ${taskId} deleted`)
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
        <Col xs={12}>
          <TaskCard task={exampleTask} handleTaskDelete={handleTaskDelete} />
        </Col>
      </Row>
    </div>
  )
}
