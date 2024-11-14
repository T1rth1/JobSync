import { useState } from 'react'
import './App.css'
import {Toaster} from "sonner"
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar.jsx"
import MainPage from './components/MainPage'
import Dashboard from './components/Dashboard'
import JobTracker from './components/JobTracker'
import AtsScore_2 from './components/AtsScore_2'
import { useUser } from '@clerk/clerk-react';
import Jobs from './components/Jobs'
// import CardDetail from './components/CardDetail'

function Layout() {
  const { isLoaded, isSignedIn } = useUser();
  const location = useLocation();

  // if (!isLoaded) {
  //   // Optionally, you can add a loading state here while the auth status is being checked
  //   return <div>Loading...</div>;
  // }
  // console.log("sakura",isSignedIn);   
  return true ? (
    
    <div className='w-full h-screen flex flex-col md:flex-row'>
    <div className='flex-1 overflow-y-auto no-scrollbar'>
      <Navbar/>
      <div className=''>
        <Outlet /> 
      </div>
    </div>
  </div>
  ) : (
    <Navigate to='/' state={{ from: location }} replace={true} />
  );
}

function App() {
  return (
    <>
      <main className='w-full min-h-screen bg-[#f3f4f6]'>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<MainPage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/tracker" element={<JobTracker/>}/>
            <Route path="/ats" element={<AtsScore_2/>}/>
            <Route path="/jobs" element={<Jobs/>}/>

            {/* <Route path="/job/:id" element={<CardDetail/>}/> */}
          </Route>
        </Routes>
        <Toaster richColors />
      </main>
    </>
  );
}

export default App
