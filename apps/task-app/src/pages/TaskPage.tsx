import { useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router'
import { Button, Card, Col, FloatingLabel, Form, InputGroup, Row } from 'react-bootstrap'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Swal from 'sweetalert2'
import { taskSchema } from '@mono/shared/schemas'
import { isValidMongoId, TASK_COLOR } from '@/utils'
import { AppLayout } from '@/layouts'
import { StaticAlert } from '@/components'
import { useApiTasks } from '@/hooks'
import { TaskPriority, TaskStatus, type ErrorResponse, type Task } from '@/interfaces'

const defaultValues: Task = {
  id: null,
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
  title: '',
  description: '',
  priority: TaskPriority.MEDIUM,
  dueDate: null,
  assignedTo: null,
  status: TaskStatus.TODO,
}

const today = new Date()

export const TaskPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { task, getTask, isLoading, isFetching, getTaskError, addTask, isAdding, updateTask, isUpdating } =
    useApiTasks()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
    setValue,
    reset,
  } = useForm<Task>({ defaultValues, resolver: zodResolver(taskSchema) })
  const [dueDate] = watch(['dueDate'])

  useEffect(() => {
    if (id && isValidMongoId(id)) getTask(id)
  }, [id, getTask])

  useEffect(() => {
    if (task) reset(task)
  }, [task, reset])

  const onSubmit: SubmitHandler<Task> = async (data): Promise<void> => {
    const { value } = await Swal.fire<boolean>({
      title: id === 'new' ? 'Saving' : 'Updating',
      html: `<p class="card-text">Is all correct ?</p>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Ok, ${id === 'new' ? 'Save' : 'Update'}`,
      confirmButtonColor: 'var(--bs-primary)',
      cancelButtonText: 'Check',
      cancelButtonColor: 'var(--bs-gray)',
    })

    if (!value) return

    if (task) updateTask(data)
    else addTask(data)
  }

  if (!id || (!isValidMongoId(id) && id !== 'new')) return <Navigate to="/tasks" />

  return (
    <AppLayout title={id === 'new' ? 'New task' : 'Update task'}>
      <div className="flex-fill d-flex align-items-center justify-content-center p-3">
        {getTaskError ? (
          <StaticAlert type="danger" icon="fa-bug" message={(getTaskError as ErrorResponse).data.msg} />
        ) : isLoading ? (
          <StaticAlert type="primary" icon="fa-spin fa-spinner" message="Searching task" />
        ) : (
          <Card bg="primary" className="w-100" style={{ maxWidth: '50rem' }}>
            <Card.Body>
              <div className="mb-3">
                <Link to="/tasks" className="text-muted small">
                  <i className="fa-solid fa-arrow-left me-1"></i>back to tasks
                </Link>
              </div>
              <div className="d-flex align-items-start justify-content-between flex-wrap gap-2 mb-4">
                <h4 className="card-title mb-0">
                  {id === 'new' ? 'Create a new task' : 'Update task'}
                  {isFetching && <i className="fa-solid fa-sm fa-spin fa-spinner text-info ms-2"></i>}
                </h4>
                {task?.priority && (
                  <h5 className={`text-${TASK_COLOR[task.priority]}`}>
                    {task.priority.toUpperCase()} / {task.status}
                  </h5>
                )}
              </div>
              <Form noValidate validated={isSubmitted} onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={8}>
                    <Row>
                      <Col xs={12} className="mb-3">
                        <FloatingLabel label="Title">
                          <Form.Control
                            type="text"
                            {...register('title')}
                            placeholder="Title"
                            required
                            minLength={3}
                            maxLength={100}
                          />
                          <Form.Control.Feedback type="valid">Válido</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} className="mb-3">
                        <FloatingLabel label="Description">
                          <Form.Control
                            as="textarea"
                            {...register('description')}
                            placeholder=""
                            required
                            minLength={10}
                            maxLength={500}
                            style={{ height: '100px', maxHeight: '150px' }}
                          />
                          <Form.Control.Feedback type="valid">Válido</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}>
                    <Row>
                      <Col xs={12} className="mb-3">
                        <InputGroup>
                          <InputGroup.Text>
                            <i className="fa-solid fa-exclamation-triangle"></i>
                          </InputGroup.Text>
                          <Form.Select {...register('priority')}>
                            {Object.values(TaskPriority).map(priority => (
                              <option key={priority} value={priority}>
                                {priority.toUpperCase()}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="valid">Válido</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">{errors.priority?.message}</Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                      <Col xs={12} className="mb-3">
                        <InputGroup>
                          <InputGroup.Text>
                            <i className="fa-solid fa-calendar-alt"></i>
                          </InputGroup.Text>
                          <Form.Control
                            type="date"
                            value={!dueDate ? '' : new Date(dueDate).toISOString().split('T')[0]}
                            onChange={({ target: { value } }) =>
                              setValue('dueDate', value === '' ? null : new Date(value).toISOString())
                            }
                            min={today.toISOString().split('T')[0]}
                          />
                          <Form.Control.Feedback type="valid">Válido</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">{errors.dueDate?.message}</Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                      <Col xs={12} className="mb-3">
                        <InputGroup>
                          <InputGroup.Text>
                            <i className="fa-solid fa-user-tag"></i>
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            {...register('assignedTo')}
                            placeholder="a ti mero"
                            maxLength={50}
                          />
                          <Form.Control.Feedback type="valid">Válido</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">{errors.assignedTo?.message}</Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} className="d-grid d-sm-flex justify-content-sm-between gap-2 mt-4">
                    <Button variant="success" type="submit" disabled={isAdding || isUpdating}>
                      {isAdding || isUpdating ? (
                        <>
                          <i className="fa-solid fa-spin fa-spinner"></i> {isAdding ? 'Adding' : 'Updating'}
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-check"></i> Save
                        </>
                      )}
                    </Button>
                    <Button variant="" disabled={isAdding || isUpdating} onClick={() => navigate('/tasks')}>
                      <i className="fa-solid fa-xmark text-danger"></i> Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
