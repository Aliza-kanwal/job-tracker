import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useJobs } from '../context/JobContext';
import { 
  FaArrowLeft, FaEdit, FaTrash, FaBuilding, FaBriefcase, 
  FaCalendar, FaStickyNote, FaLink, FaExternalLinkAlt, 
  FaMapPin, FaShare, FaPrint, FaCheckCircle, FaTimesCircle,
  FaClock, FaEnvelope, FaPhone, FaUserTie
} from 'react-icons/fa';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJob, updateJob, deleteJob } = useJobs();
  const [job, setJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const foundJob = getJob(id);
    if (foundJob) {
      setJob(foundJob);
      setFormData(foundJob);
      if (window.location.pathname.includes('/edit/')) {
        setIsEditing(true);
      }
    } else {
      navigate('/');
    }
  }, [id, navigate, getJob]);

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

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Applied': return <FaClock className="text-blue-600" />;
      case 'Interviewing': return <FaUserTie className="text-yellow-600" />;
      case 'Offer': return <FaCheckCircle className="text-green-600" />;
      case 'Rejected': return <FaTimesCircle className="text-red-600" />;
      default: return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    updateJob(id, formData);
    setJob(formData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteJob(id);
    navigate('/');
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    const subject = `Job Application: ${job.position} at ${job.company}`;
    const body = `Check out this job application:\n\nCompany: ${job.company}\nPosition: ${job.position}\nStatus: ${job.status}\nDate: ${new Date(job.date).toLocaleDateString()}\n\nNotes: ${job.notes || 'No notes'}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#097c7f] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-[#326784] font-medium">Loading your application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Back Button with Teal Gradient */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-[#097c7f] hover:text-[#6bb0d6] transition group"
        >
          <div className="p-2 rounded-full bg-gradient-to-r from-[#097c7f] to-[#326784] text-white group-hover:shadow-lg transition">
            <FaArrowLeft size={14} />
          </div>
          <span className="font-medium">Back to Dashboard</span>
        </motion.button>

        {/* Main Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
        >
          {/* Header with Teal Gradient */}
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r from-[#097c7f] to-[#326784] opacity-90`}></div>
            <div className="relative p-8 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl"
                    >
                      🏢
                    </motion.div>
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold">{job.company}</h1>
                      <p className="text-white/80 text-lg">{job.position}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30`}
                    >
                      {getStatusIcon(job.status)}
                      <span className="font-medium">{job.status}</span>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                    >
                      <FaCalendar />
                      <span>{new Date(job.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                    </motion.div>
                  </div>
                </div>

                {/* Action Icons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPinned(!isPinned)}
                    className={`p-3 rounded-xl transition ${isPinned ? 'bg-yellow-400 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
                  >
                    <FaMapPin />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-3 rounded-xl bg-white/20 text-white hover:bg-white/30 transition relative"
                  >
                    <FaShare />
                    
                    {/* Share Dropdown */}
                    <AnimatePresence>
                      {showShareOptions && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                        >
                          <button
                            onClick={handleEmail}
                            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-[#e0f7f5] flex items-center gap-3 transition"
                          >
                            <FaEnvelope className="text-[#097c7f]" />
                            Email
                          </button>
                          <button
                            onClick={handlePrint}
                            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-[#e0f7f5] flex items-center gap-3 transition"
                          >
                            <FaPrint className="text-[#326784]" />
                            Print
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {!isEditing ? (
              /* View Mode */
              <div className="space-y-8">
                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-[#e0f7f5] to-[#c5e3ed] rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#097c7f]">
                        <FaBuilding size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Company</p>
                        <p className="text-xl font-bold text-[#097c7f]">{job.company}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-[#e0f7f5] to-[#c5e3ed] rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#326784]">
                        <FaBriefcase size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Position</p>
                        <p className="text-xl font-bold text-[#326784]">{job.position}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-[#e0f7f5] to-[#c5e3ed] rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#6bb0d6]">
                        <FaCalendar size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Applied On</p>
                        <p className="text-xl font-bold text-[#6bb0d6]">
                          {new Date(job.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Job Link */}
                {job.link && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#097c7f] to-[#326784] rounded-lg flex items-center justify-center text-white">
                        <FaLink />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-2">Job Posting Link</p>
                        <a 
                          href={job.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#097c7f] hover:text-[#6bb0d6] flex items-center gap-2 break-all transition group"
                        >
                          {job.link}
                          <FaExternalLinkAlt size={12} className="group-hover:translate-x-1 transition" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Notes */}
                {job.notes && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#326784] to-[#6bb0d6] rounded-lg flex items-center justify-center text-white">
                        <FaStickyNote />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-2">Notes</p>
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.notes}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-end gap-4 pt-6 border-t border-gray-200"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-gradient-to-r from-[#097c7f] to-[#326784] text-white rounded-xl hover:shadow-lg transition flex items-center gap-2"
                  >
                    <FaEdit />
                    Edit Application
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition flex items-center gap-2"
                  >
                    <FaTrash />
                    Delete
                  </motion.button>
                </motion.div>
              </div>
            ) : (
              /* Edit Mode */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#097c7f] to-[#326784] bg-clip-text text-transparent">
                  Edit Application
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#097c7f] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#097c7f] focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Link</label>
                    <input
                      type="url"
                      name="link"
                      value={formData.link || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#097c7f] focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#097c7f] focus:border-transparent"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#097c7f] focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes || ''}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#097c7f] focus:border-transparent"
                      placeholder="Add your notes here..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUpdate}
                    className="px-6 py-3 bg-gradient-to-r from-[#097c7f] to-[#326784] text-white rounded-xl hover:shadow-lg transition"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowDeleteConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTrash className="text-red-500 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-2">Delete Application?</h3>
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete the application for <span className="font-semibold text-[#097c7f]">{job.company}</span>? 
                  This action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default JobDetails;