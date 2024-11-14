import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IoLocationOutline } from "react-icons/io5";
import { recommendedJobs } from '@/utils/jobs';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';



const JobTracker = () => {
  const [userData, setUserData] = useState([]);
  // const [jobs, setJobs] = useState([]);
  const { isLoaded, isSignedIn, user } = useUser();


  useEffect(() => {
    if (isLoaded && isSignedIn && user) {  // Check if Clerk is loaded, the user is signed in, and user data is available
      const { id } = user;
      const user_id = id.split('_')[1];

      const fetchUserData = async () => {
        try {
          const response = await axios.get(`https://jobsync-q0ih.onrender.com/users/${user_id}`);
          console.log("user", response.data);
          // setJobs(response?.data?.saved_jobs);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [isSignedIn,isLoaded,user]);

  if(userData?.saved_jobs) console.log("saved jobs",userData?.saved_jobs[0]);
  const initialJobs = {
    saved: userData?.saved_jobs,
    applied: [
    ],
    interview: [
    ],
    offer: [],
  };
  // setJobs(initialJobs);
  const jobs = initialJobs;
  console.log("sakuara",jobs)

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return; // Dropped outside a droppable area
    if (source.droppableId === destination.droppableId && source.index === destination.index) return; // Dropped in the same position

    const sourceCol = [...jobs[source.droppableId]];
    const destCol = source.droppableId === destination.droppableId ? sourceCol : [...jobs[destination.droppableId]];
    const [movedJob] = sourceCol.splice(source.index, 1); // Remove job from source
    destCol.splice(destination.index, 0, movedJob); // Insert in destination

    setJobs({
      ...jobs,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    });
  };

  const renderJobCard = (job, index) => (
    <Draggable key={job?.id} draggableId={job?.id} index={index}>
      {(provided) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }} // Smooth animation
        >
          <Card className="p-4 bg-white shadow rounded-2xl">
            <div className="flex items-center mb-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${typeof job?.score === 'number' ? 'bg-green-500' : 'bg-gray-400'}`}>
                {typeof job?.score === 'number' ? job?.score : job?.score}
              </div>
              <h3 className="font-bold text-lg ml-2">{job?.job_title}</h3>
            </div>
            <p className="text-sm text-gray-600">{job?.company}</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
            </div>
          </Card>
        </motion.div>
      )}
    </Draggable>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Job Tracker</h1>
        <div className="flex space-x-2">
          
          <Button variant="secondary" className="bg-white text-black">
                <Search className="w-4 h-4 mr-2" />Archive</Button>
          <Button className="bg-indigo-500 hover:bg-indigo-600">+ Add Job</Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <div className="space-y-4 mb-3">
            {/* First Input Field with Search Icon */}
            <div className="relative">
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black' />
              <Input
                placeholder="Web developer"
                className="pl-10" // Adjust padding to fit the search icon
              />
            </div>

            {/* Second Input Field with Location Icon */}
            <div className="relative">
              <IoLocationOutline className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black' />
              <Input
                placeholder="Search for a city"
                className="pl-10" // Adjust padding to fit the location icon
              />
            </div>

              <Button className="w-full bg-indigo-500 hover:bg-indigo-600">Search</Button>
          </div>
          
          <motion.div whileHover={{ scale: 1.02 }}>
            <div className="p-4 h-[27rem] overflow-auto scroll-container">
              {recommendedJobs.map(job => (
                <Card key={job?.id} className="p-4 mb-2">
                  <h3 className="font-bold">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job?.company}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{job?.saved_at}</p>
                </Card>
              ))}
            </div>
          </motion.div>          
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="col-span-4 grid grid-cols-4 gap-4">
            {Object.entries(jobs).map(([section, sectionJobs]) => (
              <Droppable key={section} droppableId={section}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-indigo-100 rounded-2xl p-4 h-[600px] "
                  >
                    <h2 className="text-xl font-semibold mb-4 capitalize flex items-center">
                      {section}
                      <span className="ml-2 bg-gray-300 rounded-full px-2 py-1 text-sm">
                        {sectionJobs?.length}
                      </span>
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      {section === 'saved' && 'Jobs saved from our chrome extension or the scan report will appear here.'}
                      {section === 'applied' && 'Application completed. Awaiting response from employer or recruiter.'}
                      {section === 'interview' && 'Invited to interview? Record the interview details and notes here.'}
                      {section === 'offer' && 'Interviews completed, awaiting for employer response.'}
                    </p>
                    <div className='overflow-y-auto scroll-container h-[30rem]'>
                    {sectionJobs?.map((job, index) => renderJobCard(job, index))}
                    {provided.placeholder}
                    {sectionJobs?.length === 0 && (
                        <Button variant="outline" className="w-full mt-2">
                          {section === 'saved' && 'Add company name'}
                          {section === 'applied' && 'Set application date'}
                          {section === 'interview' && 'Add an interview'}
                          {section === 'offer' && 'Add offer details'}
                        </Button>
                    )}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default JobTracker;
