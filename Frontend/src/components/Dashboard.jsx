import React, { useState,useRef,useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FaCloudUploadAlt, FaLinkedin, FaCalendar, FaTags, FaBuilding, FaIndustry, FaUserTie } from 'react-icons/fa';
import { FaArrowRight } from "react-icons/fa6";
import { FiSearch,FiMapPin } from 'react-icons/fi'
import { SiGoogleanalytics } from "react-icons/si";
import { GiBackwardTime } from "react-icons/gi";
// import { jobs } from '@/utils/jobs';
import ScoreCircle from './ScoreCircle';
import { MdOutlineSaveAlt } from "react-icons/md";
import { FaRegFolderOpen } from "react-icons/fa";
import axios from 'axios';
import ScanSection from './ScanSection';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const JobCard = ({ job, onOpenDetails,onSaveJob }) => (
  <Card className="hover:shadow-lg transition-shadow duration-300">
    <CardContent className="p-4">
      <h3 className="font-semibold text-indigo-700">{job.job_title}</h3>
      <p className="text-sm text-gray-600">{job.company}</p>
      <p className="text-sm text-gray-600">{job.location}</p>
      <p className="text-xs text-gray-400 mt-2">{job.poste_time}</p>
      <div className="flex justify-between items-center mt-2">
        <Button variant="outline" size="sm" onClick={() => onOpenDetails(job)} className="bg-indigo-500 hover:bg-indigo-600  text-white text-xl hover:from-indigo-500 hover:to-purple-400 hover:text-white"><FaRegFolderOpen/></Button>
        <Button variant="ghost" size="sm" onClick={() => onSaveJob(job?.id)} className="text-indigo-700 text-2xl hover:text-indigo-800"><MdOutlineSaveAlt/></Button>
      </div>
    </CardContent>
  </Card>
);

const JobDetailsDialog = ({ job, isOpen, onClose }) => {
  const [selectedTab, setSelectedTab] = useState('Highlights');
  const highlightsRef = useRef(null);
  const descriptionRef = useRef(null);
  const moreInfoRef = useRef(null);
  const recruiterInfoRef = useRef(null);

  const formatDescription = (description) => {
    if (!description) return [];
    
    // Common section headers in job descriptions
    const sectionHeaders = [
      'Minimum qualifications',
      'Preferred qualifications',
      'Responsibilities',
      'Requirements',
      'What you\'ll do',
      'What you\'ll need',
      'About the job',
      'About the role',
      'Key responsibilities',
      'Basic qualifications',
      'Additional requirements',
      'Note:',
      'Benefits',
      'What we offer'
    ];
    
    // Create regex pattern for section headers
    const headerPattern = new RegExp(`(${sectionHeaders.join('|')})[:.]?`, 'i');
    
    // First split by section headers
    let sections = description.split(headerPattern).filter(Boolean);
    
    // Process each section
    let points = [];
    sections.forEach((section, index) => {
      // If this is a header (matches our list), add it as a bold point
      if (sectionHeaders.some(header => section.trim().toLowerCase().includes(header.toLowerCase()))) {
        points.push(`**${section.trim()}:**`);
      } else {
        // Split regular sections by periods followed by spaces and capital letters
        // Also split on bullet points and numbered lists
        const sectionPoints = section
          .split(/(?:\.|\;|\?|\!)\s+(?=[A-Z])|(?:\r?\n|\r)(?=[\d\-\*\•\★]|\([0-9]\))/g)
          .map(point => point.trim())
          .filter(point => point.length > 0)
          .map(point => {
            // Clean up the point
            point = point.replace(/^[-•*]|\([0-9]\)/, '').trim(); // Remove bullet points or numbering
            // Ensure point ends with proper punctuation
            if (!point.match(/[.!?;]$/)) {
              point += '.';
            }
            return point;
          });
        points.push(...sectionPoints);
      }
    });

    // Filter out duplicate points and empty strings
    points = points
      .filter(Boolean)
      .filter((point, index, self) => 
        self.indexOf(point) === index
      );

    return points;
  };

  const handleTabClick = (tabName, ref) => {
    setSelectedTab(tabName);
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const renderDescriptionPoint = (point, index) => {
    // If the point is a header (starts with ** and ends with **:)
    if (point.startsWith('**') && point.endsWith(':**')) {
      return (
        <li key={index} className="list-none font-bold text-lg mt-4 mb-2">
          {point.replace(/\*\*/g, '')}
        </li>
      );
    }
    // Regular point
    return (
      <li key={index} className="mb-2">
        {point}
      </li>
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full md:w-[700px] p-6 bg-white shadow-xl rounded-xl h-[787px] overflow-y-auto scroll-container border-l border-gray-200">
        {/* Previous dialog header code remains the same */}
        
        <div className="flex space-x-7 text-md mb-4 border-b border-gray-200 pb-2">
          {[
            { name: 'Highlights', ref: highlightsRef },
            { name: 'Job Description', ref: descriptionRef },
            { name: 'More Info', ref: moreInfoRef },
            { name: 'Recruiter Info.', ref: recruiterInfoRef }
          ].map((tab, index) => (
            <span
              key={index}
              className={`cursor-pointer font-semibold transition-colors duration-300 ${
                selectedTab === tab.name ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-500'
              }`}
              onClick={() => handleTabClick(tab.name, tab.ref)}
            >
              {tab.name}
            </span>
          ))}
        </div>

        <div ref={highlightsRef} className={`mb-6 bg-gray-100 shadow-lg p-4 rounded-xl ${selectedTab === 'Highlights' ? 'bg-indigo-50' : ''}`}>
          <h3 className="text-sm font-bold mb-2">Highlights</h3>
          <ul className="list-disc pl-5">
            <li><span className='font-bold'>Position:</span> {job.job_title}</li>
            <li><span className='font-bold'>Company:</span> {job.company}</li>
            <li><span className='font-bold'>Location:</span> {job.location}</li>
            <li><span className='font-bold'>Experience Required:</span> {job.experience_type}</li>
          </ul>
        </div>

        <div ref={descriptionRef} className={`bg-gray-100 shadow-lg p-4 rounded-xl mb-6 ${selectedTab === 'Job Description' ? 'bg-indigo-50' : ''}`}>
          <h3 className="text-xl font-bold mb-2">Job Description</h3>
          <p className="mb-2"><strong>Skills:</strong> {job.skills}</p>
          <ul className="list-disc pl-5">
            {formatDescription(job.description).map((point, index) => 
              renderDescriptionPoint(point, index)
            )}
          </ul>
        </div>

        <div ref={moreInfoRef} className={`mb-6 ${selectedTab === 'More Info' ? 'bg-indigo-50 p-2 rounded-xl' : ''}`}>
          <h3 className="text-xl font-bold mb-2">More Info</h3>
          <p className="mb-2"><strong>Job Type:</strong> {job.type}</p>
          <p className="mb-2"><strong>Job Link:</strong> {job.job_link}</p>
          <p className="mb-2"><strong>Posted:</strong> {job.poste_time}</p>
        </div>

        <div ref={recruiterInfoRef} className={`mb-6 ${selectedTab === 'Recruiter Info.' ? 'bg-indigo-50 p-2 rounded-xl' : ''}`}>
          <h3 className="text-xl font-bold mb-2">Recruiter Information</h3>
          <p className="mb-2"><strong>Name:</strong> {job?.recruiterName}</p>
          <p className="mb-2"><strong>Contact:</strong> {job?.recruiterContact}</p>
          <p className="mb-2"><strong>Email:</strong> {job?.recruiterEmail}</p>
        </div>

        <div className="flex justify-end mt-4">
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
            <a href={job.job_link} className="text-white" target="_blank" 
    rel="noopener noreferrer">
               Apply
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const JobSyncDashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [userData, setUserData] = useState([]);

  const [jobs, setJobs] = useState([]);
  const[savedJobs,setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 12;
    const { isLoaded, isSignedIn, user } = useUser();
    const navigate = useNavigate(); // Added navigate hook for routing

    // const { emailAddresses, firstName, lastName, phoneNumbers,id } = user;
    // if(!isSignedIn || !user){
    //    navigate("/");
    // }

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const uniqueJobs = jobs.reduce((accumulator, job) => {
      // Create a unique key using job name and location
      const key = `${job.name}-${job.location}`;
      
      // Check if the key already exists in the accumulator
      if (!accumulator[key]) {
        accumulator[key] = job; // Store the job if it's unique
      }
      
      return accumulator;
    }, {});
    
    // Convert the object values back to an array
    const filteredJobs = Object.values(uniqueJobs);
    console.log(filteredJobs);
    const currentJobs = Array.isArray(filteredJobs) ? filteredJobs.slice(indexOfFirstJob, indexOfLastJob) : [];

    const handleOpenDetails = (job) => {
        setSelectedJob(job);
        setIsDetailsOpen(true);
    };

    const handleCloseDetails = () => {
        setIsDetailsOpen(false);
    };

    const fetchJobs = async () => {
        console.log("Fetching jobs...");
        try {
            const response = await axios.get('https://jobsync-q0ih.onrender.com/jobs');
            console.log("API Response:", response.data); // Inspect the structure here

            // Adjust based on the actual structure of your response
            if (Array.isArray(response.data)) {
                setJobs(response.data);
            } else if (response.data.jobs) {
                setJobs(response.data.jobs);
            } else {
                console.error('Unexpected data structure:', response.data);
                setJobs([]);
            }
            console.log("Jobs set successfully");
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };
  
    // Fetch jobs from the FastAPI backend
    const fetchJobsScrap = async () => {
      try {
        const response = await axios.get('https://jobsync-q0ih.onrender.com/fetch_jobs'); // Replace with your backend URL
        // setJobs(response.data.jobs); // Assuming jobs are returned in the 'jobs' field
        console.log("fetched",response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching jobs');
        setLoading(false);
      }
    };
    useEffect(() => {
      if (isLoaded && isSignedIn && user) {  // Check if Clerk is loaded, the user is signed in, and user data is available
        const { id } = user;
        const user_id = id.split('_')[1];
  
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`https://jobsync-q0ih.onrender.com/users/${user_id}`);
            console.log("user dashboard", response.data);
            setUserData(response.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
  
        fetchUserData();
      }
    }, [isSignedIn,isLoaded,user]);
  useEffect(() => {
    fetchJobs();
    fetchJobsScrap();
  }, []);
  const handleSaveJob = async (jobId) => {
    console.log(jobId);
    const { id } = user;
    const user_id = id.split('_')[1];
    try {
      const response = await axios.post(`https://jobsync-q0ih.onrender.com/users/${user_id}/save_job/${jobId}`);
      if (response.status === 200) {
        setSavedJobs([...savedJobs, jobId]);
        // toast({
        //   title: "Job saved successfully",
        //   description: "You can view it in your saved jobs",
        // });
      }
    } catch (error) {
      // toast({
      //   title: "Error saving job",
      //   description: "Please try again later",
      //   variant: "destructive",
      // });
      console.error('Error saving job:', error);
    }
  };

  // if (loading) {
  //   return <div>Loading jobs...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }
  const totalPages = Math.ceil(currentJobs.length / jobsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

        {/* Welcome Section */}
        <section className="mb-8 bg-transparent">
          <Card>
            <CardContent className="p-6 bg-gradient-to-br from-indigo-50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Welcome, Tirth!</h2>
                <div>
                  {/* <span className="mr-2 bg-indigo-100 border-blue-50 p-2 rounded-lg">Available scans: 0</span> */}
                  <Button variant="outline" className="mr-2"><span className="mr-2 text-indigo-800">Available scans: 0</span>Upgrade</Button>
                  <Button className="bg-indigo-500 hover:bg-indigo-500">New Scan</Button>
                </div>
              </div>
              <Card className="bg-indigo-100 border border-blue-200">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-indigo-600 rounded-full p-2 mr-4">
                      <FaCloudUploadAlt className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Help us get to know you</h3>
                      <p className="text-sm text-gray-600">Answer a few questions that will help us better understand how to improve your experience.</p>
                    </div>
                  </div>
                  <div>
                    <Button variant="outline" className="mr-2">Snooze</Button>
                    <Button>Update Profile</Button>
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardContent className="p-4 flex flex-col h-[300px]">
                    <h3 className="font-semibold flex items-center">
                      <GiBackwardTime className="mr-2 text-indigo-500 text-3xl" />
                      Latest Resume Scan
                    </h3>
                    <div className="mt-4">
                      <ScoreCircle  
                        score={userData?.current_ats_score} 
                        jobTitle={userData?.current_job_roles ? userData?.current_job_roles[0] : ""} 
                        company="Company Name" 
                      />
                          {console.log("skill",userData?.current_skills)}
                      <div className="mt-4">
                        {userData?.current_skills?.map((skill, index) => (
                          <Badge variant="outline" className="text-sm bg-gradient-to-b from-indigo-50 to bg-purple-50 mb-2 mr-2">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold flex items-center">
                      <SiGoogleanalytics className='mr-3 text-indigo-500 text-2xl'/>
                      Job Tracker
                    </h3>
                    <div className="grid grid-cols-4 gap-2 mt-5">
                      <div className="text-center bg-slate-200 py-2 rounded-lg">
                        <div className="font-bold text-2xl text-indigo-500">{userData?.saved_jobs?.length}</div>
                        <div className="text-sm">Saved</div>
                      </div>
                      <div className="text-center bg-slate-200 py-2 rounded-lg">
                        <div className="font-bold text-2xl text-indigo-500 ">2</div>
                        <div className="text-s">Applied</div>
                      </div>
                      <div className="text-center bg-slate-200 py-2 rounded-lg">
                        <div className="font-bold text-2xl text-indigo-500 ">2</div>
                        <div className="text-s">Interview</div>
                      </div>
                      <div className="text-center bg-slate-200 py-2 rounded-lg">
                        <div className="font-bold text-2xl text-indigo-500 ">0</div>
                        <div className="text-s">Offer</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold text-md">Next Interview</h4>
                      <div className="flex items-center flex-col mt-1">
                        <FaCalendar className="text-indigo-200 mr-2 text-5xl my-2" />
                        <span className="text-md text-gray-600">No upcoming interview</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* <Card>
                  <CardContent className="p-4 flex flex-col">
                    <h3 className="font-semibold flex flex-row">
                      <GiBackwardTime className="mr-2 text-indigo-500 text-3xl" />
                      Linkedin Report
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">Optimize your Linkedin profile to match your preferred job listings..</p>
                    <Button variant="outline" className="mt-4">Optimize LinkedIn</Button>
                  </CardContent>
                </Card> */}
              </div>
            </CardContent>
          </Card>
        </section>
      {/* <section className="mb-8">
          <Card className="bg-gradient-to-br from-indigo-50">
            <CardHeader>
              <h2 className="text-2xl font-bold">Create new scan</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Resume</h3>
                  <textarea
                    className="w-full h-[300px] p-2 border rounded-md"
                    placeholder="Copy and paste resume..."
                  >
                  </textarea>
                    <div className="mt-2">
                      <Button variant="outline" className="w-full">
                        <FaCloudUploadAlt className="mr-2 text-xl" />
                        Drag-n-drop or upload your resume
                      </Button>
                    </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Job description</h3>
                  <textarea
                    className="w-full h-[355px] p-2 border rounded-md"
                    placeholder="Job description..."
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button className="px-7 text-md">Scan</Button>
              </div>
            </CardContent>
          </Card>
        </section> */}
        <ScanSection/>


        {/* Jobs Section */}
        <section>
          <Card className="bg-white bg-gradient-to-br from-indigo-50">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-5xl font-bold text-indigo-700">Jobs</h2>
                <a href="/jobs">
                  <div className='flex flex-row'>
                    <Button variant="link" className="text-[#323277] hover:from-indigo-500 text-lg">View all</Button>
                    <FaArrowRight className='text-lg mt-3'/>
                  </div>
                </a>
              </div>
              <p className="text-gray-600 text-lg">Discover and apply to jobs</p>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-4">
                <div className="relative flex-grow">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
                  <Input placeholder="Web developer" className="pl-10" />
                </div>
                <div className="relative flex-grow">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
                  <Input placeholder="Ahmedabad" className="pl-10" />
                </div>
                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white hover:from-indigo-500 hover:to-purple-400">Search</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentJobs.map((job) => (
                  <JobCard key={job.id} job={job} onSaveJob={handleSaveJob} onOpenDetails={handleOpenDetails} />
                ))}
              </div>
              <div className="flex justify-center mt-6">
              <nav className="inline-flex rounded-md shadow">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-black hover:bg-gray-50"
                >
                  Previous
                </Button>
                
                <div className="flex">
                  {/* First Page */}
                  <Button
                    onClick={() => setCurrentPage(1)}
                    className={`px-3 py-2 border border-gray-300 bg-white text-sm font-medium min-w-[40px] ${
                      currentPage === 1 ? 'text-black bg-indigo-50 hover:bg-indigo-50' : 'text-black hover:bg-gray-50'
                    }`}
                  >
                    1
                  </Button>

                  {/* Show dots if there’s a gap between the first page and the previous of current page */}
                  {currentPage > 3 && <span className="px-2">...</span>}

                  {/* Pages around the current page */}
                  {currentPage > 2 && (
                    <Button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium min-w-[40px] text-black hover:bg-gray-50"
                    >
                      {currentPage - 1}
                    </Button>
                  )}

                  {currentPage !== 1 && currentPage!==totalPages ?<Button
                    onClick={() => setCurrentPage(currentPage)}
                    className="px-3 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium min-w-[40px] text-black"
                  >
                    {currentPage}
                  </Button> : ""}

                  {currentPage < totalPages - 1 && (
                    <Button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium min-w-[40px] text-black hover:bg-gray-50"
                    >
                      {currentPage + 1}
                    </Button>
                  )}

                  {/* Show dots if there’s a gap between the current page and the last page */}
                  {currentPage < totalPages - 2 && <span className="px-2">...</span>}

                  {/* Last Page */}
                  {totalPages > 1 && (
                    <Button
                      onClick={() => setCurrentPage(totalPages)}
                      className={`px-3 py-2 border border-gray-300 bg-white text-sm font-medium min-w-[40px] ${
                        currentPage === totalPages ? 'text-black bg-indigo-50 hover:bg-indigo-50' : 'text-black hover:bg-gray-50'
                      }`}
                    >
                      {totalPages}
                    </Button>
                  )}
                </div>

                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-black hover:bg-gray-50"
                >
                  Next
                </Button>
              </nav>
            </div>

            </CardContent>
          </Card>
        </section>
      </main>
      {selectedJob && (
        <JobDetailsDialog
          job={selectedJob}
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default JobSyncDashboard;