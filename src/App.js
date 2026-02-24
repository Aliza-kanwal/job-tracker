import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JobProvider } from './context/JobContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob'; 
import JobDetails from './pages/JobDetails';

function App() {
  return (
    <JobProvider>
      <Router>
        <div style={{ background: 'transparent' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddJob />} />  
            <Route path="/job/:id" element={<JobDetails />} /> 
            <Route path="/edit/:id" element={<JobDetails />} />
          </Routes>
        </div>
      </Router>
    </JobProvider>
  );
}

export default App;