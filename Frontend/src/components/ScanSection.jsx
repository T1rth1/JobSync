import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const ScanSection = () => {
  const [file, setFile] = useState(null); // Manage file state for the resume
  const [jobDescription, setJobDescription] = useState(''); // Manage state for job description
  const fileInputRef = useRef(null); // Ref for hidden file input
  const navigate = useNavigate(); // Hook for navigation

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a PDF file.');
    }
  };

  // Trigger the hidden file input
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle scan button click
  const handleScanClick = () => {
    if (!file) {
      alert('Please upload your resume before scanning.');
      return;
    }

    if (!jobDescription.trim()) {
      alert('Please provide a job description before scanning.');
      return;
    }

    // Navigate to the /ats page, passing the resume and job description
    navigate('/ats', { state: { file, jobDescription } });
  };

  return (
    <section className="mb-8">
      <Card className="bg-gradient-to-br from-indigo-50">
        <CardHeader>
          <h2 className="text-2xl font-bold">Create New Scan</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Resume</h3>
              <textarea
                className="w-full h-[300px] p-2 border rounded-md"
                placeholder="Copy and paste resume..."
                readOnly
                value={file ? file.name : ''} // Display the uploaded file name
              />
              <div className="mt-2">
                <Button variant="outline" className="w-full" onClick={handleButtonClick}>
                  <FaCloudUploadAlt className="mr-2 text-xl" />
                  Drag-n-drop or upload your resume
                </Button>
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  accept=".pdf"
                  onChange={handleFileChange} // Handle file upload
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <textarea
                className="w-full h-[355px] p-2 border rounded-md"
                placeholder="Job description..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)} // Update job description
              ></textarea>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button className="px-7 text-md" onClick={handleScanClick} onChange={handleFileChange}>
              Scan
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ScanSection;
