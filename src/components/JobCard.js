import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaExternalLinkAlt, FaLink } from 'react-icons/fa';

function JobCard({ job, onDelete }) {
  const getStatusColor = (status) => {
    const colors = {
      'Applied': 'bg-blue-100 text-blue-800',
      'Interviewing': 'bg-yellow-100 text-yellow-800',
      'Offer': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{job.company}</h3>
            <p className="text-gray-600">{job.position}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(job.status)}`}>
            {job.status}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-4">
          Applied: {new Date(job.date).toLocaleDateString()}
        </p>
        
        {job.notes && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {job.notes}
          </p>
        )}
        {job.link && (
  <a
    href={job.link}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 mb-4"
    onClick={(e) => e.stopPropagation()}
  >
    <FaLink size={12} />
    View Job Posting
  </a>
)}
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <Link
            to={`/job/${job.id}`}
            className="text-purple-600 hover:text-purple-800 flex items-center gap-1 transition"
            onClick={() => console.log('Navigating to:', `/job/${job.id}`)} 
            title="View Details"
          >
            <FaExternalLinkAlt size={12} />
            View Details
          </Link>
          
          <div className="flex gap-2">
            <Link
              to={`/job/${job.id}`}
              className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-full transition"
              title="Edit"
            >
              <FaEdit />
            </Link>
            <button
              onClick={() => onDelete(job.id)}
              className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-full transition"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;