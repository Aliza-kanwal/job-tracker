import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useJobs } from '../context/JobContext';
import { 
  FaSave, FaTimes, FaBriefcase, FaBuilding, 
  FaCalendar, FaStickyNote, FaLink, FaArrowLeft,
  FaCheckCircle, FaInfoCircle, FaMagic
} from 'react-icons/fa';

function AddJob() {
  const navigate = useNavigate();
  const { addJob } = useJobs();
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    link: '',
    status: 'Applied',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTips, setShowTips] = useState(true);

  const statusOptions = ['Applied', 'Interviewing', 'Offer', 'Rejected'];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.date) newErrors.date = 'Date is required';
    
    if (formData.link && !formData.link.match(/^https?:\/\/.+/)) {
      newErrors.link = 'Please enter a valid URL (starting with http:// or https://)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate submission delay for animation
      setTimeout(() => {
        addJob(formData);
        setIsSubmitting(false);
        navigate('/');
      }, 1000);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const getStatusColor = (status) => {
    const colors = {
      'Applied': 'from-blue-400 to-blue-600',
      'Interviewing': 'from-yellow-400 to-yellow-600',
      'Offer': 'from-green-400 to-green-600',
      'Rejected': 'from-red-400 to-red-600'
    };
    return colors[status] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={handleCancel}
          className="mb-6 flex items-center gap-2 text-[#097c7f] hover:text-[#6bb0d6] transition group"
        >
          <div className="p-2 rounded-full bg-gradient-to-r from-[#097c7f] to-[#326784] text-white group-hover:shadow-lg transition">
            <FaArrowLeft size={14} />
          </div>
          <span className="font-medium">Back to Dashboard</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#097c7f] via-[#326784] to-[#6bb0d6] bg-clip-text text-transparent">
              Add New Application
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Fill in the details of your job application
          </p>
        </motion.div>

        {/* Tips Banner */}
        <AnimatePresence>
          {showTips && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="mb-6 bg-gradient-to-r from-[#e0f7f5] to-[#c5e3ed] rounded-xl p-4 border border-[#097c7f]/20 relative overflow-hidden"
            >
              <button
                onClick={() => setShowTips(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={14} />
              </button>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#097c7f] rounded-lg text-white">
                  <FaMagic />
                </div>
                <div>
                  <h4 className="font-semibold text-[#097c7f] mb-1">✨ Pro Tips for Success</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Add the job posting link to easily access it later</li>
                    <li>• Include recruiter contact details in notes</li>
                    <li>• Set reminders for follow-ups</li>
                    <li>• Save company website for interview preparation</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Form Header with Status Color */}
          <div className={`bg-gradient-to-r ${getStatusColor(formData.status)} p-6 text-white`}>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-1">New Application</h2>
                <p className="text-white/80">Fill in the details below</p>
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl"
              >
                📝
              </motion.div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Company & Position - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaBuilding className="inline mr-2 text-[#097c7f]" />
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g., Google, Microsoft, Amazon"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#097c7f] focus:border-transparent transition ${
                    errors.company ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.company && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600 flex items-center gap-1"
                  >
                    <FaInfoCircle />
                    {errors.company}
                  </motion.p>
                )}
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaBriefcase className="inline mr-2 text-[#326784]" />
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g., Frontend Developer, UI Designer"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#097c7f] focus:border-transparent transition ${
                    errors.position ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.position && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600 flex items-center gap-1"
                  >
                    <FaInfoCircle />
                    {errors.position}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Job Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaLink className="inline mr-2 text-[#6bb0d6]" />
                Job Posting Link <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://www.linkedin.com/jobs/... or company career page"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#097c7f] focus:border-transparent transition ${
                  errors.link ? 'border-red-500 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.link && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-600 flex items-center gap-1"
                >
                  <FaInfoCircle />
                  {errors.link}
                </motion.p>
              )}
            </div>

            {/* Status and Date - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#097c7f] focus:border-transparent appearance-none bg-white"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Date Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCalendar className="inline mr-2 text-[#097c7f]" />
                  Application Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#097c7f] focus:border-transparent transition ${
                    errors.date ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.date && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600 flex items-center gap-1"
                  >
                    <FaInfoCircle />
                    {errors.date}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaStickyNote className="inline mr-2 text-[#326784]" />
                Notes <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="5"
                placeholder="Add any notes about your application (job description, contact person, interview details, etc.)"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#097c7f] focus:border-transparent resize-none"
              />
            </div>

            {/* Character Counter */}
            {formData.notes && (
              <div className="text-right text-xs text-gray-400">
                {formData.notes.length} characters
              </div>
            )}

            {/* Preview Card */}
            {formData.company && formData.position && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-6 bg-gradient-to-r from-[#e0f7f5] to-[#c5e3ed] rounded-xl border border-[#097c7f]/20"
              >
                <h4 className="text-sm font-semibold text-[#097c7f] mb-3 flex items-center gap-2">
                  <FaCheckCircle />
                  Preview
                </h4>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getStatusColor(formData.status)} flex items-center justify-center text-white font-bold text-xl`}>
                    {formData.company.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {formData.company} - {formData.position}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-white/80 text-gray-700`}>
                        {formData.status}
                      </span>
                      <span>•</span>
                      <span>{new Date(formData.date).toLocaleDateString()}</span>
                    </p>
                    {formData.link && (
                      <p className="text-xs text-[#097c7f] mt-1 truncate">
                        🔗 {formData.link}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <motion.button
                type="button"
                onClick={handleCancel}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition flex items-center gap-2 font-medium"
                disabled={isSubmitting}
              >
                <FaTimes />
                Cancel
              </motion.button>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-[#097c7f] to-[#326784] text-white rounded-xl hover:shadow-lg transition flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Save Application
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Success Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center text-sm text-gray-500"
        >
          <p>✨ All fields with <span className="text-red-500">*</span> are required</p>
        </motion.div>
      </div>
    </div>
  );
}

export default AddJob;