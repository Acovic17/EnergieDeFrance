import Home from './pages/home.js';
import Fade from 'react-reveal/Fade';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout.js';
import Energy from './pages/energy.js';
import Year from './pages/year.js';

function App() {
  return (
    <Router>
      <Fade bottom>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          }/>
          <Route path="/byyear" element={
            <Layout>
              <Year />
            </Layout>
          }/>
          <Route path="/byenergy" element={
            <Layout>
              <Energy />
            </Layout>
          }/>
        </Routes>
      </Fade>
    </Router>
  );
}

export default App;
