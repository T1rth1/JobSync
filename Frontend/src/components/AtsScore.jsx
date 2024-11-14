import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Progress } from "@/components/ui/progress"
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useMemo } from 'react';
import PdfViewer from "./PdfViewer";
import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const AtsScorePage = ({data}) => {
  const [userData, setUserData] = useState(null);
  const { isLoaded, isSignedIn, user } = useUser();
  const [openCategory, setOpenCategory] = useState(null);
  const location = useLocation();
  
  // const file = location.state?.file;
  console.log(file);
  const jd = location.state?.jobDescription;
  const fileURL = useMemo(() => {
    console.log("file",file);
    if (file) {
      const url = URL.createObjectURL(file);
      return url;
    }
  }, [file]);
  console.log("ats",data);
  // console.log("from ats",jd);

  // if (!data) {
  //   return <div className="p-4 text-center text-red-500">No PDF uploaded. Please upload a PDF file from the dashboard.</div>;
  // }

  // const fileURL = URL.createObjectURL(file);
  console.log("hii");
  useEffect(() => {
    console.log("hii");
    return () => {
      // Clean up URL object when the component unmounts
      if (fileURL) URL.revokeObjectURL(fileURL);
    };
  }, [fileURL]);

  useEffect(() => {
    console.log("hii");
    if (isLoaded && isSignedIn && user) {
      const { id } = user;
      const user_id = id.split('_')[1];
  
      const fetchUserData = async () => {
        try {
          const response = await fetch(`https://jobsync-q0ih.onrender.com/users/${user_id}`, {
            method: 'GET',
          });
          if (response.status === 200) {
            const data = await response.json();
            setUserData(data);
            console.log("User data:", data);
          } else if (response.status === 422) {
            const errorData = await response.json();
            setErrorDetails(errorData.detail);
            setError('Validation error occurred.');
          } else {
            throw new Error('Failed to fetch user data');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserData();
    }
  }, [isSignedIn, user]); // Add dependencies here
  

  const scoreCategories = [
    {
      name: 'Content',
      score: 25,
      subcategories: [
        { name: 'ATS Parse Rate', status: 'warning' },
        { name: 'Quantifying Impact', status: 'locked' },
        { name: 'Repetition', status: 'success' },
        { name: 'Spelling & Grammar', status: 'locked' }
      ],
      description: 'Your content score is low. Consider adding more relevant information and quantifying your impact.'
    },
    {
      name: 'Format',
      score: 67,
      subcategories: [
        { name: 'File Format & Size', status: 'success' },
        { name: 'Resume Length', status: 'warning' },
        { name: 'Long Bullet Points', status: 'success' }
      ],
      description: 'Your format is good, but there\'s room for improvement. Pay attention to resume length.'
    },
    {
      name: 'Sections',
      score: 33,
      subcategories: [
        { name: 'Contact Information', status: 'success' },
        { name: 'Essential Sections', status: 'locked' },
        { name: 'Personality', status: 'locked' }
      ],
      description: 'Some essential sections might be missing. Review your resume structure and add more personality.'
    },
    {
      name: 'Skills',
      score: 100,
      subcategories: [
        { name: 'Hard Skills', status: 'success' },
        { name: 'Soft Skills', status: 'success' }
      ],
      description: 'Excellent job on showcasing your skills! Both hard and soft skills are well represented.'
    },
    {
      name: 'Style',
      score: 75,
      subcategories: [
        { name: 'Design', status: 'success' },
        { name: 'Email Address', status: 'success' },
        { name: 'Active voice', status: 'warning' },
        { name: 'Buzzwords & Cliches', status: 'warning' }
      ],
      description: 'Your resume style is good. Minor tweaks could make it great. Focus on using more active voice and reducing buzzwords.'
    }
  ];

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

// Inside AtsScorePage component
const getStatusIcon = (status) => {
  switch (status) {
    case 'success':
      return '✓';
    case 'warning':
      return '!';
    default:
      return '✗';
  }
};

return (
  <div className="flex flex-col md:flex-row h-screen bg-gradient-to-b from-indigo-50 to bg-purple-50">
    {/* Left Side: PDF Viewer */}
    <div className="w-full md:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">ATS Score for your resume</h2>
        {/* <h3 className="text-2xl font-bold mb-4 text-gray-800">Your Resume Score: {data.ats_score}/100</h3> */}

        {/* <PdfViewer fileURL={fileURL} /> */}
      </div>

    {/* Right Side: ATS Score */}
    {/* <div className="w-full md:w-1/2 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Your Resume Score: {data.ats_score}/100</h3>
        <p className="mb-4 text-red-500 font-semibold"></p>

        {scoreCategories.map((category, index) => (
          <div key={index} className="mb-6">
            <div 
              className="flex justify-between items-center mb-2 cursor-pointer"
              onClick={() => toggleCategory(index)}
            >
              <h4 className="text-lg font-semibold text-gray-700">{category.name}</h4>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 mr-2">{category.score}%</span>
                {openCategory === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            <Progress value={category.score} className="h-2 mb-2" />
            <div 
              className={`overflow-hidden transition-all duration-500 ${openCategory === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
            >
              {openCategory === index && (
                <div className="mt-2 bg-gradient-to-r from-indigo-50 to bg-indigo-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                  <ul className="space-y-2">
                    {category.subcategories.map((subcat, subIndex) => (
                      <li key={subIndex} className="flex items-center">
                        <span className={`mr-2 ${
                          subcat.status === 'success' ? 'text-green-500' :
                          subcat.status === 'warning' ? 'text-yellow-500' :
                          'text-red-500'
                        }`}>
                          {getStatusIcon(subcat.status)}
                        </span>
                        <span className="text-sm">{subcat.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}

        <button className="mt-8 w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          Re-Scan
        </button>
      </div>
    </div> */}
  </div>
);

};

export default AtsScorePage;