import Home from './components/pages/Home/Home.js';
import { Container } from 'react-bootstrap';
import NavBar from './components/views/NavBar/NavBar.js';
import NoMatch from './components/pages/NoMatch/NoMatch.js';
import { Routes, Route } from 'react-router-dom';
import SingleAd from './components/pages/SingleAd/SingleAd.js';
import AddAd from './components/pages/AddAd/AddAd.js';
import EditAd from './components/pages/EditAd/EditAd.js';
import Register from './components/pages/Register/Register.js';
import Login from './components/pages/Login/Login.js';
import Logout from './components/pages/Logout/Logout.js';

const App = () => {
  return (
    <main>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/ad/:id" element={<SingleAd />} />
          <Route path="/ad/add" element={<AddAd />} />
          <Route path="/ad/edit/:id" element={<EditAd />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Container>
    </main>
  );
};

export default App;
