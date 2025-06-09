import { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { AppLayout } from '@/layouts'
import { Dropzone, StaticAlert } from '@/components'
import { useApiTasks } from '@/hooks'
import { useGetTasksQuery } from '@/store/tasks'
import { TaskStatus, type ErrorResponse, type Task } from '@/interfaces'

export const BoardPage = () => {
  const { data, isLoading, isFetching, error } = useGetTasksQuery(null)
  const { updateTask } = useApiTasks(false)
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    if (data) setTasks(data)
  }, [data])

  const handleDropTask = (task: Task) => {
    setTasks(tasks.map(x => (x.id === task.id ? task : x)))

    updateTask(task)
  }

  return (
    <AppLayout title="Task App" showNewTaskButton>
      {error ? (
        <div className="m-auto">
          <StaticAlert type="danger" icon="fa-bug" message={(error as ErrorResponse).data.msg} />
        </div>
      ) : isLoading ? (
        <div className="m-auto">
          <StaticAlert type="primary" icon="fa-spin fa-spinner" message="Searching tasks" />
        </div>
      ) : (
        <div className="container-xxl p-3">
          <Card bg="primary" className="h-100">
            <Card.Body className="overflow-auto position-relative">
              <Row className="h-100" style={{ minWidth: '60rem', minHeight: '30rem' }}>
                <Col xs={4}>
                  <Dropzone
                    title="To do"
                    description="This hasnt been started"
                    type={TaskStatus.TODO}
                    tasks={tasks.filter(x => x.status === TaskStatus.TODO)}
                    handleDropTask={handleDropTask}
                  />
                </Col>
                <Col xs={4}>
                  <Dropzone
                    title="In progress"
                    description="This is being worked on"
                    type={TaskStatus.IN_PROGRESS}
                    tasks={tasks.filter(x => x.status === TaskStatus.IN_PROGRESS)}
                    handleDropTask={handleDropTask}
                  />
                </Col>
                <Col xs={4}>
                  <Dropzone
                    title="Done"
                    description="This has been completed"
                    type={TaskStatus.DONE}
                    tasks={tasks.filter(x => x.status === TaskStatus.DONE)}
                    handleDropTask={handleDropTask}
                  />
                </Col>
              </Row>
              {isFetching && (
                <div
                  className="position-absolute bg-info rounded-circle shadow-lg d-flex align-items-center justify-content-center"
                  style={{ top: '0.5rem', right: '0.5rem', height: '2rem', width: '2rem' }}
                >
                  <i className="fa-solid fa-spin fa-spinner text-secondary"></i>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </AppLayout>
  )
}
