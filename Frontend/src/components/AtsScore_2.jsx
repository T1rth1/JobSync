import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import axios from 'axios';
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Award, 
  BookOpen, 
  Code,
  GraduationCap,
  ExternalLink
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const formatSuggestion = (suggestion) => {
  const [title, description] = suggestion.split(':').map(s => s.trim());
  const cleanTitle = title.replace(/\*\*/g, '');
  const cleanDescription = description.replace(/\*\*/g, '');
  
  return {
    title: cleanTitle,
    description: cleanDescription
  };
};

const AtsScorePage = ({ data }) => {

    // console.log("data",data);
    const [userData, setUserData] = useState([]);
    const { isLoaded, isSignedIn, user } = useUser();
    // console.log("user",user);
    // const { id } = user;
    // const user_id = id.split('_')[1];

    useEffect(() => {
      if (isLoaded && isSignedIn && user) {  // Check if Clerk is loaded, the user is signed in, and user data is available
        const { id } = user;
        const user_id = id.split('_')[1];
  
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`https://jobsync-q0ih.onrender.com/users/${user_id}`);
            console.log("user", response.data);
            setUserData(response.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
  
        fetchUserData();
      }
    }, [isSignedIn,isLoaded,user]);
    
      console.log("userdata partg",userData);
    const {
    current_ats_score,
    current_skills,
    current_job_roles,
    current_improvement_suggestions,
    current_recommended_courses,
    resumes
  } = userData;

  const lastResume = resumes?.at(-1);

  console.log("last",lastResume?.content);

  const formattedSuggestions = current_improvement_suggestions?.map(formatSuggestion);
  const pdfBase64 = lastResume?.content; // The base64 encoded content of the PDF
  const pdfUrl = pdfBase64 ? `data:application/pdf;base64,${pdfBase64}` : "";
  
  // const pdfUrl = "";
  return (
    <div className="flex h-screen bg-gradient-to-b from-indigo-50 to bg-purple-50">
      {/* Left side - Resume Preview */}
      <div className="w-1/2 p-6 border-r">
        <Card className="h-full">
          <CardHeader>
            <CardTitle><span className='text-purple-600'>Res</span>ume <span className='text-purple-600'>Pre</span>view</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-5rem)] overflow-y-auto">
            <iframe
              src={pdfUrl}
              className="w-full h-full rounded-lg border"
              title="Resume Preview"
            />
          </CardContent>
        </Card>
      </div>

      {/* Right side - User Details */}
      <div className="w-1/2 p-6 overflow-y-auto">
        {/* ATS Score Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">ATS Score Analysis</h1>
                <p className="text-gray-500 mt-1">{lastResume?.filename.slice(0,-4)}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-purple-600">{current_ats_score}</div>
                <div className="text-sm text-gray-500">ATS Score</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={current_ats_score} className="h-2" />
          </CardContent>
        </Card>

        {/* Job Roles Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Target Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {current_job_roles?.map((role, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {role}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-600" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {current_skills?.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Courses Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              Recommended Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {current_recommended_courses?.map((course, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-purple-600">{course.course_name}</h3>
                    <Badge variant="outline">{course.platform}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 italic">{course.relevance}</p>
                    <a 
                      href={course.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
                    >
                      View Course <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Improvement Suggestions Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Improvement Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formattedSuggestions?.map((suggestion, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <div className="min-w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{suggestion.title}</h3>
                      <p className="text-gray-700 mt-1">{suggestion.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AtsScorePage;