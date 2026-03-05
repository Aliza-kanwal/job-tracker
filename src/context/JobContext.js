import React, { createContext, useState, useContext, useEffect } from 'react';

const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load jobs from localStorage on mount
  useEffect(() => {
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever jobs change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('jobs', JSON.stringify(jobs));
    }
  }, [jobs, loading]);

  // Add a new job
  const addJob = (job) => {
    const newJob = {
      ...job,
      id: Date.now().toString()
    };
    setJobs(prev => [newJob, ...prev]);
    return newJob;
  };

  // Update an existing job
  const updateJob = (id, updatedJob) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...updatedJob, id } : job
    ));
  };

  // Delete a job
  const deleteJob = (id) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  // Get a single job by ID
  const getJob = (id) => {
    return jobs.find(job => job.id === id);
  };

  // Get stats
  const getStats = () => {
    return {
      total: jobs.length,
      applied: jobs.filter(j => j.status === 'Applied').length,
      interviewing: jobs.filter(j => j.status === 'Interviewing').length,
      offer: jobs.filter(j => j.status === 'Offer').length,
      rejected: jobs.filter(j => j.status === 'Rejected').length,
      hasLink: jobs.filter(j => j.link).length
    };
  };

 // Export jobs as JSON
const exportJobs = () => {
  const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
  const dataStr = JSON.stringify(jobs, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  const exportFileDefaultName = `job-applications-${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

// Import jobs from JSON
const importJobs = (jsonFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedJobs = JSON.parse(e.target.result);
        if (Array.isArray(importedJobs)) {
          // Validate each job has required fields
          const validJobs = importedJobs.every(job => 
            job.id && job.company && job.position && job.status && job.date
          );
          
          if (validJobs) {
            localStorage.setItem('jobs', JSON.stringify(importedJobs));
            // Update state
            setJobs(importedJobs);
            resolve(importedJobs);
          } else {
            reject(new Error('Invalid job data format'));
          }
        } else {
          reject(new Error('Invalid JSON format - expected an array'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(jsonFile);
  });
};

  return (
    <JobContext.Provider value={{
      jobs,
      loading,
      addJob,
      updateJob,
      deleteJob,
      getJob,
      getStats,
      exportJobs,
      importJobs
    }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}
