import { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { AppLayout } from '@/layouts'
import { Dropzone, SearchBar, StaticAlert } from '@/components'
import { useApiTasks, useAppDispatch, useAppSelector } from '@/hooks'
import { setTasks, updateFilteredTasks, useGetTasksQuery } from '@/store/tasks'
import { TaskStatus, type ErrorResponse, type Task } from '@/interfaces'

export const BoardPage = () => {
  const { tasks, filteredTasks } = useAppSelector(state => state.tasks)
  const dispatch = useAppDispatch()
  const { data, isLoading, isFetching, error } = useGetTasksQuery(null)
  const { updateTask } = useApiTasks(false)

  useEffect(() => {
    dispatch(updateFilteredTasks())
  }, [dispatch])

  useEffect(() => {
    if (data) {
      dispatch(setTasks(data))
      dispatch(updateFilteredTasks())
    }
  }, [data, dispatch])

  const handleDropTask = (task: Task) => {
    dispatch(setTasks(tasks.map(x => (x.id === task.id ? task : x))))
    dispatch(updateFilteredTasks())

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
        <div className="container-xxl px-3 py-4">
          <Card bg="primary" className="h-100">
            <Card.Body>
              <SearchBar />
            </Card.Body>
            <Card.Body className="overflow-auto position-relative d-flex flex-column h-100">
              <Row className="flex-fill" style={{ minWidth: '60rem', minHeight: '30rem' }}>
                <Col xs={4}>
                  <Dropzone
                    title="To do"
                    description="This hasnt been started"
                    type={TaskStatus.TODO}
                    tasks={filteredTasks.filter(x => x.status === TaskStatus.TODO)}
                    handleDropTask={handleDropTask}
                  />
                </Col>
                <Col xs={4}>
                  <Dropzone
                    title="In progress"
                    description="This is being worked on"
                    type={TaskStatus.IN_PROGRESS}
                    tasks={filteredTasks.filter(x => x.status === TaskStatus.IN_PROGRESS)}
                    handleDropTask={handleDropTask}
                  />
                </Col>
                <Col xs={4}>
                  <Dropzone
                    title="Done"
                    description="This has been completed"
                    type={TaskStatus.DONE}
                    tasks={filteredTasks.filter(x => x.status === TaskStatus.DONE)}
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
