import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaExternalLinkAlt, FaLink, FaMapPin } from 'react-icons/fa';

function AnimatedCard({ job, onDelete, index }) {
  const getStatusColor = (status) => {
    const colors = {
      'Applied': 'from-blue-400 to-blue-600',
      'Interviewing': 'from-yellow-400 to-yellow-600',
      'Offer': 'from-green-400 to-green-600',
      'Rejected': 'from-red-400 to-red-600'
    };
    return colors[status] || 'from-gray-400 to-gray-600';
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      'Applied': 'bg-blue-100 text-blue-800 border-blue-200',
      'Interviewing': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Offer': 'bg-green-100 text-green-800 border-green-200',
      'Rejected': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 12
      }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      className="relative group"
    >
      {/* Gradient Border Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${getStatusColor(job.status)} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500`}></div>
      
      {/* Main Card */}
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Colored Top Bar */}
        <div className={`h-2 bg-gradient-to-r ${getStatusColor(job.status)}`}></div>
        
        <div className="p-6">
          {/* Pin Icon for Important Jobs (Future feature) */}
          <motion.button
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 text-gray-300 hover:text-yellow-400 transition"
          >
            <FaMapPin />
          </motion.button>

          {/* Company Logo Placeholder */}
          <div className="flex items-center gap-4 mb-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStatusColor(job.status)} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
            >
              {job.company.charAt(0)}
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition">
                {job.company}
              </h3>
              <p className="text-gray-600">{job.position}</p>
            </div>
          </div>

          {/* Status Badge */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getStatusBadgeColor(job.status)} mb-4`}
          >
            {job.status}
          </motion.div>

          {/* Date with Icon */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📅
            </motion.div>
            <span>Applied: {new Date(job.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>

          {/* Notes Preview */}
          {job.notes && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 p-3 rounded-lg mb-4 text-sm text-gray-600 border border-gray-100"
            >
              <p className="line-clamp-2">{job.notes}</p>
            </motion.div>
          )}

          {/* Link Button */}
          {job.link && (
            <motion.a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 5 }}
              className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 mb-4 transition"
            >
              <FaLink />
              View Job Posting
              <FaExternalLinkAlt size={10} />
            </motion.a>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <Link
              to={`/job/${job.id}`}
              className="text-purple-600 hover:text-purple-800 flex items-center gap-1 transition group"
            >
              <motion.span
                whileHover={{ x: 5 }}
                className="flex items-center gap-1"
              >
                View Details
                <FaExternalLinkAlt size={12} />
              </motion.span>
            </Link>
            
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to={`/job/${job.id}`}
                  className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-full transition block"
                  title="Edit"
                >
                  <FaEdit />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <button
                  onClick={() => onDelete(job.id)}
                  className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-full transition"
                >
                  <FaTrash />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AnimatedCard;