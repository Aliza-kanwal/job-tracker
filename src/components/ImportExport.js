import React, { useRef, useState } from 'react';
import { useJobs } from '../context/JobContext';
import { FaDownload, FaUpload, FaCheck, FaTimes } from 'react-icons/fa';

function ImportExport() {
  const { exportJobs, importJobs } = useJobs();
  const fileInputRef = useRef();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await importJobs(file);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        setErrorMessage(error.message);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    }
    // Reset file input
    e.target.value = null;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Data Management</h3>
          <p className="text-sm text-gray-600">Export or import your job applications</p>
        </div>
        
        <div className="flex gap-3">
          {/* Export Button */}
          <button
            onClick={exportJobs}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <FaDownload />
            Export JSON
          </button>
          
          {/* Import Button */}
          <button
            onClick={handleImportClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FaUpload />
            Import JSON
          </button>
          
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
        </div>
      </div>
      
      {/* Success Message */}
      {showSuccess && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
          <FaCheck />
          <span>Jobs imported successfully!</span>
        </div>
      )}
      
      {/* Error Message */}
      {showError && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
          <FaTimes />
          <span>Error: {errorMessage}</span>
        </div>
      )}
    </div>
  );
}

export default ImportExport;