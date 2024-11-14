import React from 'react';

const ScoreCircle = ({ score, jobTitle, company }) => (
  <div className="flex items-center space-x-3">
    <div className="relative w-16 h-16">
      <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center">
        <span className="text-2xl font-bold text-indigo-600">{score}</span>
      </div>
      <div className="absolute inset-0 rounded-full border-4 border-indigo-500 opacity-25"></div>
    </div>
    <div className="flex flex-col">
      <span className="text-lg font-medium text-gray-700">{jobTitle}</span>
      <span className="text-md text-gray-500">{company}</span>
    </div>
  </div>
);

export default ScoreCircle;