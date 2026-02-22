import Home from './components/pages/Home/Home.js';
import { Container } from 'react-bootstrap';
import NavBar from './components/views/NavBar/NavBar.js';
import NoMatch from './components/pages/NoMatch/NoMatch.js';
import { Routes, Route } from 'react-router-dom';
import SinglePost from './components/pages/SinglePost/SinglePost.js';
import AddPost from './components/pages/AddPost/AddPost.js';
import EditPost from './components/pages/EditPost/EditPost.js';
import Register from './components/pages/Register/Register.js';

const App = () => {
  return (
    <main>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/post/1" element={<SinglePost />} />
          <Route path="/post/add" element={<AddPost />} />
          <Route path="/post/edit/:id" element={<EditPost />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/register" element={<Register />} />
          {/* <Route path="/logout" element={<Logout />} /> */}
        </Routes>
      </Container>
    </main>
  );
};

export default App;
