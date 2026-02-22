import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';

const NavBar = () => {
  const user = useSelector(getUser);

  return (
    <Navbar bg="primary" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Ad-board
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>

          {user && (
            <Nav.Link as={NavLink} to="/logout">
              Sign out
            </Nav.Link>
          )}

          {!user && (
            <>
              <Nav.Link as={NavLink} to="/login">
                Sign in
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register">
                Sign up
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
