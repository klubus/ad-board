import { Alert, AlertHeading, Button, Form, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logInUser } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError'
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    dispatch(logInUser(login, password))
      .then(() => {
        setStatus('success');
        navigate('/');
      })
      .catch(() => {
        setStatus('clientError');
      });
  };

  return (
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>
      <h1 className="my-4">Login</h1>

      {status === 'success' && (
        <Alert variant="success">
          <AlertHeading>Success!</AlertHeading>
          <p>You have been successfully logged in!</p>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant="danger">
          <AlertHeading>Something went wrong...</AlertHeading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}

      {status === 'clientError' && (
        <Alert variant="danger">
          <AlertHeading>Incorrect data!</AlertHeading>
          <p>Login or password is incorrect.</p>
        </Alert>
      )}

      {status === 'loading' && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Enter login"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign in
      </Button>
    </Form>
  );
};

export default Login;
