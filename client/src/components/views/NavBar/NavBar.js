import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" className="mt-4 mb-4 rounded">
      <Container>
        <Navbar.Brand href="/">Ad-board</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/categories">
            Sign out
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            Sign in
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            Sign up
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
