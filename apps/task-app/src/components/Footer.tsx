import { Container, Nav, Navbar } from 'react-bootstrap'

export const Footer = () => {
  return (
    <Navbar bg="transparent" className="border-0">
      <Container
        fluid
        className="d-flex align-items-center justify-content-center justify-content-md-between flex-wrap px-4 fw-normal"
      >
        <Navbar.Text>© {new Date().getFullYear()}, all rights reserved. Created with ❤️ by Alejandro Ríos</Navbar.Text>
        <Nav>
          <Nav.Link href="https://github.com/riversdev/task-app" target="_blank" rel="noopener noreferrer">
            <i className="fa-solid fa-arrow-up-right-from-square me-2"></i>
            Check the project on GitHub
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
