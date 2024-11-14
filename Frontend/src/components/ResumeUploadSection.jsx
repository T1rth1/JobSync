import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

import AtsScorePage from './AtsScore';
// import { toast } from 'react-toastify';

const ResumeUploadSection = () => {
  const [file, setFile] = useState(null); // Added useState to manage file state
  const fileInputRef = useRef(null); // Create a ref for the hidden file input
  const [atsData, setAtsData] = useState(null);
  const navigate = useNavigate(); // Added navigate hook for routing
  const { isLoaded, isSignedIn, user } = useUser();


  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === 'application/pdf') {
      // Set the file to the state
      setFile(selectedFile);
      const { id } = user;
      const user_id = id.split('_')[1];
      

      // Assuming you have the user_id available, if not, you might need to retrieve it from context, props, or a global store
       // Replace this with the actual user_id logic

      // Prepare the FormData object for the POST request
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        // Send the POST request with the file as multipart/form-data
        const response = await axios.post(`https://jobsync-q0ih.onrender.com/upload_resume/${user_id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle the response from the server
        console.log('File uploaded successfully:', response.data);
        // const atsData = response.data;
        // Set atsData in the state
        setAtsData(response.data);
        
        // Navigate to the ATS Score route with the file in state
        navigate('/ats', { state: { atsData } });
        // navigate('/ats');


      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload the resume. Please try again.');
      }
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the hidden input on button click
  };
  const handleRedirect = () => {
    // navigate('/ats');
    navigate('/ats');
  }

  return (
    <>
    <section className="py-12 sm:py-16 md:py-18">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Get your resume score now!</h2>
          {/* <p className="text-xl text-white/90">
            Upload your resume and you'll get a personalized email with an actionable tasklist.
          </p> */}
        </div>
        <Card className="max-w-xl mx-auto bg-transparent text-white border-dashed shadow-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col items-center">
              <FaCloudUploadAlt className="text-6xl mb-4 text-white" />
              <Input
                type="file"
                className="hidden"
                id="imgUpload"
                onChange={handleFileChange}
                accept=".pdf"
                multiple={false}
                ref={fileInputRef} // Reference to hidden file input
              />
              <Button 
                variant="secondary" 
                size="lg" 
                className="mb-4 text-[1rem]border-8 text-bold hover:text-white glow-on-hover"
                onClick={handleButtonClick} // Button triggers the file input click
              >
                Scan Your Resume
              </Button>


              <p className="text-sm text-center mb-4">
                Drop your resume here or choose a file.<br />
                PDF & DOCX only. Max 2MB file size.
              </p>
              <span className="text-white border-gray-300 hover:text-white hover:bg-transparent">
                🔒 Privacy guaranteed
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
    {/* {atsData && <AtsScorePage data={atsData} onChange={handleRedirect} />} */}
    </>
  );
};

export default ResumeUploadSection;
