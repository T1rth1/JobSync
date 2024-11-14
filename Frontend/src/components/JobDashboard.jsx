// components/JobDashboardSection.js
import React from 'react';


const JobDashboardSection = () => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* LinkedIn Report */}
      <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center text-center">
        <h3 className="text-lg font-semibold mb-4">LinkedIn Report</h3>
        <p className="text-sm text-gray-500 mb-4">
          Optimize your LinkedIn profile to match your preferred job listings.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Optimize LinkedIn
        </button>
      </div>

      {/* Job Tracker */}
      <div className="bg-white shadow-xl rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">Job Tracker</h3>
        <div className="flex justify-around mb-4">
          <div>
            <p className="text-2xl font-bold">6</p>
            <p className="text-sm text-gray-500">Saved</p>
          </div>
          <div>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-500">Applied</p>
          </div>
          <div>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-500">Interview</p>
          </div>
          <div>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-500">Offer</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">No upcoming interviews</p>
      </div>

      {/* Latest Blog Posts */}
      <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center text-center">
        <h3 className="text-lg font-semibold mb-4">Latest Blog Posts</h3>
        <img
          src="https://via.placeholder.com/150"
          alt="Blog"
          className="mb-4 rounded-lg"
        />
        <p className="text-sm text-blue-600">
          120+ Words to Describe Yourself to Stand Out
        </p>
      </div>
    </div>
  );
};

export default JobDashboardSection;
