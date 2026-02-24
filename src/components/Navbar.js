import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaPlusCircle, FaBriefcase } from 'react-icons/fa';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-white/20' : '';
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-gradient-to-r from-[#097c7f] to-[#326784] text-white shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FaBriefcase className="text-2xl" />
            </motion.div>
            <motion.span 
              className="font-bold text-xl"
              whileHover={{ scale: 1.05 }}
            >
              JobTracker
            </motion.span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-white/20 transition ${isActive('/')}`}
            >
              <FaHome />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/add"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-white/20 transition ${isActive('/add')}`}
            >
              <FaPlusCircle />
              <span>Add Job</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;