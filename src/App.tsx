import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';


 // Import components (we'll create these next)
 import Home from './pages/Home';
 import Projects from './pages/Projects';
 import Contact from './pages/Contact';
 import Education from './pages/Education';
 import About from './pages/About';
 import Navbar from './components/Navbar';
 
 function App() {
   const [darkMode, setDarkMode] = useState(() => {
     // Check local storage or prefer-color-scheme
     return localStorage.getItem('darkMode') === 'true' || 
       (window.matchMedia('(prefers-color-scheme: dark)').matches && 
        localStorage.getItem('darkMode') !== 'false');
   });
 
   useEffect(() => {
     // Apply theme class to document
     document.documentElement.classList.toggle('dark', darkMode);
     localStorage.setItem('darkMode', String(darkMode));
   }, [darkMode]);
 
   return (
     <HelmetProvider>
       <div className={`min-h-screen  transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
         <Router>
           <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
           <AnimatePresence mode="wait">
             <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/about" element={<About />} />
               <Route path="/projects" element={<Projects />} />
               <Route path="/education" element={<Education />} />
               <Route path="/contact" element={<Contact />} />
             </Routes>
           </AnimatePresence>
         </Router>
       </div>
     </HelmetProvider>
   );
 }
 
 export default App;


