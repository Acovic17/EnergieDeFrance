import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Energy from './pages/energy.js';
import Year from './pages/year.js';
import Nav from './components/navbar.js'
import Home from './pages/home.js';
import './App.css'

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/byyear" element={<Year />} />
        <Route path="/byenergy" element={<Energy />} />
      </Routes>
    </Router>
  );
}

export default App;
