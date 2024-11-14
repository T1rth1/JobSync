import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card'; // Assuming you have Shadcn card component
import { Button } from './ui/button'; // Button component from Shadcn

const steps = [
  {
    title: 'Get Started',
    description: "Click on ‘Check Your Resume Score’ or 'Upload Resume' button on this page to get started & upload the PDF/Docx resume file you wish to assess.",
    icon: '✈️',
  },
  {
    title: 'Select Job Function & Role',
    description: "Identify your Job Function along with the Role you aspire to work towards from provided drop-down options.",
    icon: '🖱️',
  },
  {
    title: 'Add Identified Job Description',
    description: "This is an optional step that will help you check resume against the job description & align your resume's keywords. Leverage this effectively.",
    icon: '🔍',
  },
  {
    title: 'You Are All Set',
    description: "Signup to get access to your jobsync GAP Report & some of the significant parameters your profile is being evaluated upon. You can also expect actionable tips in your Report.",
    icon: '👍',
  },
];

const ResumeCheckerPage = () => {
  return (
    <div className="p-8 bg-gray-50 text-gray-800">
      {/* Title Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">How Does the Resume Score Checker Work?</h1>
        <p className="text-lg text-gray-600">
          Our Resume Score Check tool has been designed by us, Consultants & Recruiters. Your GAP Report will hold easy & applicable tips to improve your resumes.
        </p>
      </motion.section>

      {/* Steps Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0], transition: { duration: 0.5 } }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
          >
            <Card className="bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 w-full h-72">
              <CardContent className="text-center p-6 flex flex-col justify-center h-full">
                {/* Icon */}
                <div className="text-5xl mb-4">{step.icon}</div>
                {/* Title */}
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                {/* Description */}
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResumeCheckerPage;
