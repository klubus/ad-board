import Home from './components/Home/Home.js';
import Container from './components/Container/Container.js';
import NavBar from './components/NavBar/NavBar.js';
import NoMatch from './components/NoMatch/NoMatch.js';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <main>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Container>
    </main>
  );
};

export default App;
