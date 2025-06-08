import { Link, useLocation } from 'react-router'
import { Container, Nav, Navbar as RBNavbar } from 'react-bootstrap'

interface Props {
  title: string
  bgTransparent?: boolean
  showNewTaskButton?: boolean
}

export const Navbar = ({ title, bgTransparent, showNewTaskButton = false }: Props) => {
  const { pathname } = useLocation()

  return (
    <RBNavbar
      bg={bgTransparent ? 'transparent' : 'primary'}
      className={`sticky-top ${bgTransparent ? 'border-0' : ''}`}
    >
      <Container
        fluid
        className="d-flex align-items-center justify-content-center justify-content-md-between flex-wrap px-4"
      >
        <RBNavbar.Brand as={Link} to="/" viewTransition>
          <i className="fa-solid fa-list-check me-2"></i> {title}
        </RBNavbar.Brand>
        {pathname !== '/' && (
          <Nav>
            {showNewTaskButton && (
              <Nav.Link as={Link} to="/tasks/new" viewTransition className="d-flex align-items-center">
                <h6 className="text-info mb-0">
                  <i className="fa-solid fa-plus-circle me-2"></i> NUEVA TAREA
                </h6>
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/" viewTransition>
              Cerrar sesión
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </RBNavbar>
  )
}
