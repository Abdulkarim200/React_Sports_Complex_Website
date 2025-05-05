import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Facilities from './pages/Facilities';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
  return (
    <Router>
      <AnimatePresence mode='wait'>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;