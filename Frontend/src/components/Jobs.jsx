import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IoLocationOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import axios from 'axios';
import { Search } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { jobs } from '@/utils/jobs';

const Dashboard = () => {
  const[jobs,setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Highlights');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    datePosted: '',
    experienceLevel: '',
    company: '',
    remote: '',
    easyApply: false
  });
  const jobsPerPage = 10;

  // Refs for scrolling sections
  const highlightsRef = useRef(null);
  const descriptionRef = useRef(null);
  const moreInfoRef = useRef(null);
  const recruiterInfoRef = useRef(null);

  const handleCardClick = (job) => {
    setSelectedJob(job);
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabClick = (tabName, ref) => {
    setSelectedTab(tabName);
    scrollToSection(ref);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
  };

  // Apply filters
  const filteredJobs = jobs?.filter(job => {
    return (
      (!filters.datePosted || job.postedTime === filters.datePosted) &&
      (!filters.experienceLevel || job.experience === filters.experienceLevel) &&
      (!filters.company || job.company === filters.company) &&
      (!filters.remote || job.type === filters.remote) &&
      (!filters.easyApply || job.easyApply)
    );
  });

  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
useEffect(() => {
  fetchJobs();
}, []);



  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
      {/* Left side: Job Search and Listings */}
      <div className="flex-1 mr-4">
        <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-[#34348c] to-indigo-500 bg-clip-text text-transparent">Discover Jobs</h1>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="relative w-2/3 flex items-center">
              <Search className="absolute left-3 h-5 w-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 py-2 border-indigo-300 focus:border-indigo-500 rounded-md"
              />
            </div>
            <div className="relative w-1/3 flex items-center">
              <IoLocationOutline className='absolute left-3 h-5 w-5 text-gray-500'/>
              <Input
                type="text"
                placeholder="Enter location..."
                className="w-full pl-10 py-2 border-indigo-300 focus:border-indigo-500 rounded-md"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-between items-center mb-4">
            <Select onValueChange={(value) => handleFilterChange('datePosted', value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Date posted" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="past_month">Past month</SelectItem>
                <SelectItem value="past_week">Past week</SelectItem>
                <SelectItem value="past_24_hours">Past 24 hours</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => handleFilterChange('experienceLevel', value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry level</SelectItem>
                <SelectItem value="mid">Mid level</SelectItem>
                <SelectItem value="senior">Senior level</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => handleFilterChange('company', value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="addweb">AddWeb Solution</SelectItem>
                {/* Add more companies */}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => handleFilterChange('remote', value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Remote" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="on-site">On-site</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600 ml-3"
                onChange={(e) => handleFilterChange('easyApply', e.target.checked)}
              />
              <span className="ml-2 text-gray-700">Easy Apply</span>
            </label>

            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              All filters
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 gap-6 overflow-auto h-[600px] scroll-container">
          {currentJobs.map((job) => {
            const skills = job?.skills?.split(", ").map(skill => skill.trim());

            return (
              <Card
                key={job.id}
                onClick={() => handleCardClick(job)}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-indigo-600">{job.job_title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">{job.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-sm"><strong>Location:</strong> {job.location}</p>
                  <p className="mb-2 text-sm"><strong>Experience:</strong> {job.experience}</p>
                  <p className="mb-2 text-sm"><strong>Type:</strong> {job.level}</p>
                  <p className="mb-2 text-sm"><strong>Posted:</strong> {job.job_post_time}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills?.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-sm bg-indigo-100">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>


        {/* Pagination */}
        <div className="mt-8">
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious className="cursor-pointer" onClick={() => handlePageChange(currentPage - 1)} />
              </PaginationItem>
            )}

            {/* First Page */}
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => handlePageChange(1)}
                isActive={currentPage === 1}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {/* Ellipses if there's a gap between the first page and current page's neighbors */}
            {currentPage > 3 && (
              <PaginationItem>
                <PaginationLink className="cursor-pointer">...</PaginationLink>
              </PaginationItem>
            )}

            {/* Previous Page Button (if necessary) */}
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            
            {/* Current Page */}
            {currentPage !== 1 && currentPage!==totalPages ? <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => handlePageChange(currentPage)}
                isActive={true}
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>:""}

            {/* Next Page Button (if necessary) */}
            {currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Ellipses if there's a gap between the current page and last page */}
            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationLink className="cursor-pointer">...</PaginationLink>
              </PaginationItem>
            )}

            {/* Last Page */}
            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => handlePageChange(totalPages)}
                  isActive={currentPage === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Next Button */}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext className="cursor-pointer" onClick={() => handlePageChange(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>

      </div>

      {/* Right side: Job Details Section */}
      {selectedJob && (
        <motion.div initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}className="w-full md:w-[700px] p-6 bg-white shadow-xl rounded-xl h-[787px] overflow-y-auto scroll-container border-l border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedJob.job_titel}</h2>
              <p className="text-indigo-600">{selectedJob.company}</p>
            </div>
            <div className='flex space-x-2'>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                Save Job
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                <a href={selectedJob?.job_link}>Quick Apply</a>
              </button>
            </div>
          </div>

          <div className="flex space-x-4 mb-4 border-b border-gray-200 pb-2">
            {[
              { name: 'Highlights', ref: highlightsRef },
              { name: 'Job Description', ref: descriptionRef },
              { name: 'More Info', ref: moreInfoRef },
              { name: 'Recruiter Information', ref: recruiterInfoRef }
            ].map((tab, index) => (
              <span
                key={index}
                className={`cursor-pointer font-semibold transition-colors duration-300 ${
                  selectedTab === tab.name ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'
                }`}
                onClick={() => handleTabClick(tab.name, tab.ref)}
              >
                {tab.name}
              </span>
            ))}
          </div>

          <div ref={highlightsRef} className={`mb-6 bg-gray-100 p-4 rounded-xl ${selectedTab === 'Highlights' ? 'bg-indigo-50' : ''}`}>
            <h3 className="text-xl font-bold mb-2">Highlights</h3>
            <ul className="list-disc pl-5">
              <li><span className='font-bold'>Position:</span> {selectedJob.job_title}</li>
              <li><span className='font-bold'>Company:</span> {selectedJob.company}</li>
              <li><span className='font-bold'>Location:</span> {selectedJob.location}</li>
              <li><span className='font-bold'>Experience Required:</span> {selectedJob.experience_type}</li>
            </ul>
          </div>

          <div ref={descriptionRef} className={`bg-gray-100 p-4 rounded-xl mb-6 ${selectedTab === 'Job Description' ? 'bg-indigo-50' : ''}`}>
            <h3 className="text-xl font-bold mb-2">Job Description</h3>
            {/* <p className="mb-2"><strong>Skills:</strong> {selectedJob.skills}</p> */}
            <ul className="list-disc pl-5">
              {/* {selectedJob?.description.map((item, index) => (
                <li key={index} className="mb-1">{item}</li>
              ))} */}
                {selectedJob?.description}
            </ul>
          </div>

          <div ref={moreInfoRef} className={`mb-6 ${selectedTab === 'More Info' ? 'bg-indigo-50 p-2 rounded-xl' : ''}`}>
            <h3 className="text-xl font-bold mb-2">More Info</h3>
            <p className="mb-2"><strong>Job Type:</strong> {selectedJob.level}</p>
            <p className="mb-2"><strong>Industry:</strong> {selectedJob.industry}</p>
            <p className="mb-2"><strong>Company Size:</strong> {selectedJob.companySize}</p>
            <p className="mb-2"><strong>Posted:</strong> {selectedJob.job_post_time}</p>
          </div>

          <div ref={recruiterInfoRef} className={`mb-6 ${selectedTab === 'Recruiter Information' ? 'bg-indigo-50 p-2 rounded-xl' : ''}`}>
            <h3 className="text-xl font-bold mb-2">Recruiter Information</h3>
            <p className="mb-2"><strong>Name:</strong> {selectedJob.recruiterName}</p>
            <p className="mb-2"><strong>Contact:</strong> {selectedJob.recruiterContact}</p>
            <p className="mb-2"><strong>Email:</strong> {selectedJob.recruiterEmail}</p>
          </div>

          <div className="flex justify-end mt-4">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
               <a href={selectedJob.job_link}>Apply Now</a>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;