import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FaBriefcase, FaClipboardCheck, FaFileAlt, FaLink, FaBars, FaSearch, FaUpload, FaBell, FaChartBar, FaShieldAlt } from 'react-icons/fa';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import * as React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import ResumeUploadSection from "./ResumeUploadSection";
// import jobsync from "../assets/"

export default function Mainpage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      
      <main className="flex-1">
        <section className="bg-gradient-to-r from-[#323277] to-[#857ffb] py-12 sm:py-16 md:py-30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-2xl mb-3 py-5 leading-tight font-bold orange_gradient text-white sm:text-4xl md:text-[3.5rem]">
                Discover your next
              </h1>
              <h1 className="text-2xl mb-8 leading-tight font-bold text-white sm:text-4xl md:text-[3.5rem]">
                Dream Job with JobSync
              </h1>
              <p className="mt-4 mx-10 text-white/90 sm:text-xl text-xl font-light tracking-normal mb-10 px-5">
                Streamline your job search with our powerful platform that integrates multiple job portals and offers
                advanced resume analysis.
              </p>
              {/* <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button variant="outline" size="lg" className="hidden md:inline-flex text-black">
                  <FaUpload className="mr-2 h-5 w-5 " />
                  Upload Resume
                </Button>
              </div> */}
              <ResumeUploadSection/>
            </div>
          </div>
        </section>
        {/* <section className="bg-gradient-to-r from-[#323277] to-[#857ffb] py-12 sm:py-16 md:pt-10 md:pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center gap-4 rounded-lg p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md hover:shadow-white hover:bg-transparent">
                <FaSearch className="h-10 w-10 text-white" />
                <h3 className="text-xl font-bold text-white text-center">Powerful Job Search</h3>
                <p className="text-white text-center">Search across multiple job portals with a single platform.</p>
              </div>
              <div className="flex flex-col items-center gap-4 rounded-lg p-6 shadow-sm transition-all hover:scale-105 hover:shadow-white hover:shadow-md bg-transparent">
                <FaFileAlt className="h-10 w-10 text-white" />
                <h3 className=" text-white text-xl font-bold text-foreground text-center">Resume Builder</h3>
                <p className="text-white text-muted-foreground text-center">Create a professional resume with our easy-to-use builder.</p>
              </div>
              <div className="flex flex-col items-center gap-4 rounded-lg p-6 shadow-sm transition-all hover:scale-105 hover:shadow-white hover:shadow-md bg-transparent">
                <FaClipboardCheck className="h-10 w-10 text-white" />
                <h3 className="text-white text-xl font-bold text-foreground text-center">ATS Scoring</h3>
                <p className=" text-white text-muted-foreground text-center">
                  Get an ATS score to see how your resume matches job requirements.
                </p>
              </div>
            </div>

          </div>
        </section> */}
        <hr className="border-t border-gray-200" />

        {/* <hr className="text-red"/> */}
        <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-r from-[#323277] to-[#857ffb]">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Powerful Features for Exceptional Job Search</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 ">
              <CardHeader>
                <FaFileAlt className="h-8 w-8 text-[#2922B2] mb-2" />
                <h3 className="text-xl font-semibold">Resume Analysis</h3>
              </CardHeader>
              <CardContent>
                <p>Get personalized feedback on your resume with our AI-powered analysis tool</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
              <CardHeader>
                <FaBriefcase className="h-8 w-8 text-[#2922B2] mb-2" />
                <h3 className="text-xl font-semibold">Job Portal Integration</h3>
              </CardHeader>
              <CardContent>
                <p>Search and apply to jobs from multiple portals in one centralized platform</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
              <CardHeader>
                <FaClipboardCheck className="h-8 w-8 text-[#2922B2] mb-2" />
                <h3 className="text-xl font-semibold">ATS Scoring</h3>
              </CardHeader>
              <CardContent>
                <p>See how your resume scores against Applicant Tracking Systems for each job</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
              <CardHeader>
                <FaBell className="h-8 w-8 text-[#2922B2] mb-2" />
                <h3 className="text-xl font-semibold">Smart Notifications</h3>
              </CardHeader>
              <CardContent>
                <p>Receive timely alerts for new job postings matching your profile and preferences</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
              <CardHeader>
                <FaChartBar className="h-8 w-8 text-[#2922B2] mb-2" />
                <h3 className="text-xl font-semibold">Advanced Reporting</h3>
              </CardHeader>
              <CardContent>
                <p>Track your application progress and gain insights with detailed analytics</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
              <CardHeader>
                <FaShieldAlt className="h-8 w-8 text-[#2922B2] mb-2" />
                <h3 className="text-xl font-semibold">Data Protection</h3>
              </CardHeader>
              <CardContent>
                <p>Your data is secure with our data management practices</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <hr className="border-t border-gray-200" />

      {/* Customer Success Stories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-8">How JobSync has helped real job seekers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <img src="https://static.jobscan.co/blog/uploads/Blog_ATS_02_2.webp" alt="Connor" className="w-full h-48 object-cover mb-4 rounded" />
                <h3 className="text-xl font-semibold mb-2">Within Hours of Using JobSync, Connor Attracted Recruiters on LinkedIn</h3>
                <p className="text-gray-600 mb-4">This is part of our Customer Stories series, where we ask real job seekers about...</p>
                <Button variant="link" className="text-blue-600 hover:text-blue-800">Read more</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <img src="https://static.jobscan.co/blog/uploads/How-to-write-an-ATS-friendly-resume.webp" alt="Daniel" className="w-full h-48 object-cover mb-4 rounded" />
                <h3 className="text-xl font-semibold mb-2">How Daniel Overcame 8 Months of Unemployment to Land His Dream Job</h3>
                <p className="text-gray-600 mb-4">This is part of our Customer Stories series, where we ask real job seekers about...</p>
                <Button variant="link" className="text-blue-600 hover:text-blue-800">Read more</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <img src="https://static.jobscan.co/blog/uploads/ChatGPT-Resume.webp" alt="Kelly" className="w-full h-48 object-cover mb-4 rounded" />
                <h3 className="text-xl font-semibold mb-2">Kelly Built a Network and Landed a Job in a New City using JobSync's LinkedIn Optimization</h3>
                <p className="text-gray-600 mb-4">When Kelly, a long-time software engineer, moved from Denver, Colorado to Hilton Head, South Carolina,...</p>
                <Button variant="link" className="text-blue-600 hover:text-blue-800">Read more</Button>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button variant="link" className="text-blue-600 hover:text-blue-800">See more stories</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">© 2024. All rights reserved.</p>
            <div className="flex space-x-4 my-4 md:my-0">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <FaTwitter size={20} />
              </a>
            </div>
            <p className="text-gray-600 text-sm flex items-center">
              Made with love by people who care. 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500 ml-1">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </p>
          </div>
        </div>
      </footer>
      </main>
    </div>
  );
}
