import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 px-4"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="text-8xl mb-6"
      >
        📋
      </motion.div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-2">No Job Applications Yet</h3>
      <p className="text-gray-600 mb-8">Start tracking your job search journey today!</p>
      
      <Link to="/add">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition flex items-center gap-2 mx-auto"
        >
          <FaPlusCircle />
          Add Your First Application
        </motion.button>
      </Link>
    </motion.div>
  );
}

export default EmptyState;