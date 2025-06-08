import { Card, Col, Row } from 'react-bootstrap'
import { AppLayout } from '@/layouts'
import { Dropzone } from '@/components'
import { TaskStatus } from '@/interfaces'

export const BoardPage = () => {
  return (
    <AppLayout title="Task App" showNewTaskButton>
      <div className="container p-3">
        <Card bg="primary" className="h-100">
          <Card.Body className="overflow-auto position-relative">
            <Row className="h-100" style={{ minWidth: '60rem', minHeight: '30rem' }}>
              <Col xs={4}>
                <Dropzone title="To do" description="This hasnt been started" type={TaskStatus.TODO} tasks={[]} />
              </Col>
              <Col xs={4}>
                <Dropzone
                  title="In progress"
                  description="This is being worked on"
                  type={TaskStatus.IN_PROGRESS}
                  tasks={[]}
                />
              </Col>
              <Col xs={4}>
                <Dropzone title="Done" description="This has been completed" type={TaskStatus.DONE} tasks={[]} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </AppLayout>
  )
}
