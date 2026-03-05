import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJobs } from '../context/JobContext';
import AnimatedCard from '../components/AnimatedCard';
import StatsCard from '../components/StatsCard';
import EmptyState from '../components/EmptyState';
import { 
  FaSearch, FaFilter, FaBriefcase, FaClock, 
  FaCheckCircle, FaTimesCircle, FaLink, FaCalendarCheck,
  FaChartLine, FaDownload, FaUpload, FaBell, FaCheck,
  FaTimes
} from 'react-icons/fa';

function Dashboard() {
  const { jobs, deleteJob, getStats, loading, exportJobs, importJobs } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [importSuccess, setImportSuccess] = useState(false);
  const [importError, setImportError] = useState('');
  const fileInputRef = useRef();

  const statuses = ['All', 'Applied', 'Interviewing', 'Offer', 'Rejected'];
  const stats = getStats();

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await importJobs(file);
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
      } catch (error) {
        setImportError(error.message);
        setTimeout(() => setImportError(''), 3000);
      }
    }
    e.target.value = null;
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  // Different colors for each stat card
  const statCards = [
    { icon: <FaBriefcase />, label: 'Total Applications', value: stats.total, bgColor: 'from-purple-500 to-purple-700' },
    { icon: <FaClock />, label: 'Applied', value: stats.applied, bgColor: 'from-blue-500 to-blue-700' },
    { icon: <FaCalendarCheck />, label: 'Interviewing', value: stats.interviewing, bgColor: 'from-yellow-500 to-yellow-700' },
    { icon: <FaCheckCircle />, label: 'Offers', value: stats.offer, bgColor: 'from-green-500 to-green-700' },
    { icon: <FaTimesCircle />, label: 'Rejected', value: stats.rejected, bgColor: 'from-red-500 to-red-700' },
    { icon: <FaLink />, label: 'With Links', value: stats.hasLink, bgColor: 'from-teal-500 to-teal-700' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#097c7f] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-[#326784] font-medium">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Welcome Banner */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="mb-8 bg-gradient-to-r from-[#097c7f] to-[#326784] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
              
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to Your Job Tracker! 👋</h2>
                  <p className="text-white/90">You have {stats.total} applications in progress. Keep up the great work!</p>
                </div>
                <button
                  onClick={() => setShowWelcome(false)}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {importSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-2"
            >
              <FaCheck />
              <span>Jobs imported successfully!</span>
            </motion.div>
          )}
          
          {importError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2"
            >
              <FaTimes />
              <span>Error: {importError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header with Animated Teal Gradient */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#097c7f] via-[#326784] to-[#6bb0d6] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Job Applications Dashboard
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Track and manage your job search journey with style
          </p>
        </motion.div>

        {/* Import/Export Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex justify-end gap-4"
        >
          {/* Export Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportJobs}
            className="px-6 py-3 bg-gradient-to-r from-[#097c7f] to-[#326784] text-white rounded-xl shadow-lg hover:shadow-xl transition flex items-center gap-2"
          >
            <FaDownload />
            Export JSON
          </motion.button>
          
          {/* Import Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleImportClick}
            className="px-6 py-3 bg-white text-[#097c7f] border-2 border-[#097c7f] rounded-xl hover:bg-[#e0f7f5] transition flex items-center gap-2"
          >
            <FaUpload />
            Import JSON
          </motion.button>
          
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
        </motion.div>

        {/* Stats Grid - With Different Colors */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: { y: 0, opacity: 1 }
              }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by company or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#097c7f] focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-[#097c7f] to-[#326784] text-white rounded-xl hover:shadow-lg transition flex items-center gap-2 justify-center"
              >
                <FaFilter />
                Filter by Status
              </motion.button>
              
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    {statuses.map(status => (
                      <motion.button
                        key={status}
                        whileHover={{ x: 5, backgroundColor: '#e0f7f5' }}
                        onClick={() => {
                          setFilterStatus(status);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left transition ${
                          filterStatus === status ? 'bg-[#e0f7f5] text-[#097c7f] font-semibold' : ''
                        }`}
                      >
                        {status}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Active Filters Display */}
          {filterStatus !== 'All' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2"
            >
              <span className="text-sm text-gray-500">Active Filter:</span>
              <span className="px-3 py-1 bg-[#e0f7f5] text-[#097c7f] rounded-full text-sm font-medium">
                {filterStatus}
              </span>
              <button
                onClick={() => setFilterStatus('All')}
                className="text-gray-400 hover:text-red-500 transition"
              >
                ✕
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4 flex justify-between items-center"
        >
          <p className="text-gray-600">
            Showing <span className="font-semibold text-[#097c7f]">{filteredJobs.length}</span> of{' '}
            <span className="font-semibold text-[#326784]">{jobs.length}</span> applications
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaBell className="text-[#6bb0d6]" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </motion.div>

        {/* Job Cards Grid */}
        {filteredJobs.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {filteredJobs.map((job, index) => (
              <AnimatedCard 
                key={job.id} 
                job={job} 
                onDelete={deleteJob}
                index={index}
              />
            ))}
          </motion.div>
        )}

        {/* Quick Stats Summary */}
        {filteredJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaChartLine className="text-[#097c7f]" />
              Quick Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Success Rate</p>
                <p className="text-2xl font-bold text-[#097c7f]">
                  {stats.total > 0 ? Math.round((stats.offer / stats.total) * 100) : 0}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Interview Rate</p>
                <p className="text-2xl font-bold text-[#326784]">
                  {stats.total > 0 ? Math.round((stats.interviewing / stats.total) * 100) : 0}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Response Rate</p>
                <p className="text-2xl font-bold text-[#6bb0d6]">
                  {stats.total > 0 ? Math.round(((stats.offer + stats.rejected) / stats.total) * 100) : 0}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Applications</p>
                <p className="text-2xl font-bold text-[#097c7f]">
                  {stats.applied + stats.interviewing}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;