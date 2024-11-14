import React, { useState } from 'react';
import { Button } from './ui/button'; // Example shadcn button component
import { Textarea } from './ui/textarea'; // Example shadcn textarea component
import { motion } from 'framer-motion';

const ResumeScan = () => {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [fileResume, setFileResume] = useState(null);

  const handleResumeChange = (e) => {
    setResume(e.target.value);
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleFileUpload = (e) => {
    setFileResume(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform scan functionality here
    console.log('Resume:', resume || fileResume);
    console.log('Job Description:', jobDescription);
  };

  const handleCancel = () => {
    setResume('');
    setJobDescription('');
    setFileResume(null);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <motion.h2
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Create New Scan
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Resume Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <label className="block text-lg font-medium">Resume</label>
          <Textarea
            placeholder="Copy and paste resume..."
            value={resume}
            onChange={handleResumeChange}
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="file"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
          />
        </motion.div>

        {/* Job Description Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <label className="block text-lg font-medium">Job Description</label>
          <Textarea
            placeholder="Job description..."
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </motion.div>

        {/* Buttons Section */}
        <motion.div
          className="flex justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button type="submit" className="bg-blue-600 text-white">
            Scan
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white"
          >
            Cancel
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default ResumeScan;
