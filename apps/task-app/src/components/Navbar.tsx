import { Container, Navbar as RBNavbar } from 'react-bootstrap'
import { Link } from 'react-router'

interface Props {
  title: string
  bgTransparent?: boolean
}

export const Navbar = ({ title, bgTransparent }: Props) => {
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
        {/* <Nav>
          <Nav.Link href="/">Cerrar sesión</Nav.Link>
        </Nav> */}
      </Container>
    </RBNavbar>
  )
}
