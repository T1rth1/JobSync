import React, { useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from './ui/button';
import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaBriefcase, FaClipboardCheck, FaFileAlt, FaLink, FaBars, FaSearch, FaUpload, FaBell, FaChartBar, FaShieldAlt } from 'react-icons/fa';

import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
// import {image} from "../../src/assets/jobsync.png"

function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate(); // Added navigate hook for routing
  
  useEffect(() => {
    console.log(isSignedIn,user);
    
    const saveUserData = async () => {
      if (isSignedIn && user) {
        try {
          const { emailAddresses, firstName, lastName, phoneNumbers,id } = user;
          const user_id = id.split('_')[1];

          const userData = {
            user_id:user_id,
            name: `${firstName} ${lastName}`,
            email: emailAddresses[0]?.emailAddress,
            mobile: phoneNumbers[0]?.phoneNumber,
          };

          // Send user data to your backend API
          await axios.post("https://jobsync-q0ih.onrender.com/users", userData);
          console.log("User data sent to the backend successfully.");
        } catch (error) {
          console.error("Error saving user data:", error.response?.data || error.message);
        }
      }
    };

    saveUserData();
  }, [user]);
  useEffect(() => {
    if (isSignedIn==false) {
      navigate("/"); // Redirect to home if not signed in
    }
  }, [isSignedIn, navigate]);
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-gradient-to-r from-[#323277] to-[#857ffb] px-4 sm:px-6 md:h-20 md:px-8">
      <a href="/" className="flex items-center gap-2 mb-4" prefetch={false}>
        <img src="./src/assets/jobsync.png" className="h-10" alt="JobSync Logo"/>
        <div className="flex flex-col justify-center">
          <span className="text-2xl font-sans font-bold  text-white leading-tight mt-3">JobSync</span>
        </div>
      </a>
        <nav className="hidden gap-4 text-sm font-md md:flex">
          <a href="/">
            <Button variant="ghost" className="text-white hover:bg-slate-300 text-[1.1rem]" prefetch={false}>
                Home
            </Button>
          </a>
          <a href="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-slate-300 text-[1.1rem]" prefetch={false}>
                Dashboard
            </Button>
          </a>
          <a href="/tracker">
            <Button variant="ghost" className=" text-white hover:bg-slate-300 text-[1.1rem]" prefetch={false}>
              JobTracker
            </Button>
          </a>
          <a href="/ats">
            <Button variant="ghost" href="/ats" className="text-white hover:bg-slate-300 text-[1.1rem]" prefetch={false}>
              Your ATS Score
            </Button>
          </a>
          <a href="/jobs">
            <Button variant="ghost" href="/dashboard" className="text-white hover:bg-slate-300 text-[1.1rem]" prefetch={false}>
              Jobs
            </Button>
          </a>
        </nav>
        {isSignedIn ? (
          <div className="flex items-center justify-center space-x-4">
            <UserButton
              userProfileMode="navigation"
              className="rounded-full overflow-hidden border-2 border-blue-600"
            />
              <SignOutButton forceRedirectUrl="/">
                <Button variant="outline" size="sm" className="hidden md:inline-flex text-black">
                    Sign Out
                </Button>
              </SignOutButton>
          </div>
        )
        :(
          <div className="flex items-center gap-2">
            <SignInButton fallbackRedirectUrl="/dashboard" mode="modal" >
              <Button variant="outline" size="sm" className="hidden md:inline-flex text-black">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton fallbackRedirectUrl="/dashboard" mode="modal" size="sm">
              <Button size="sm" className="hidden md:inline-flex">
                <FaEnvelopeCircleCheck className="mr-2 h-4 w-4" />Sign Up
              </Button>
            </SignUpButton>
            <Button variant="ghost" size="icon" className="md:hidden">
              <FaBars className="h-6 w-6 text-white" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        )
        }
      </header>
  );
}

export default Navbar;
