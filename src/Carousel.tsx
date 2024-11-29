import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import EducationTimeline, { EducationPeriod } from './EducationTimeline';
import EmploymentHistory, { Job } from './EmploymentHistory';
import SkillSection, { SkillArea } from './Skills';


const MySkills = () => {
    const [skillAreas, setSkillAreas] = useState<SkillArea[]>([]);
  
    useEffect(() => {
      import('./my-skills.json').then((data) => {
        setSkillAreas(data.default as SkillArea[]);
      });
    }, []);
  
    return <SkillSection skills={skillAreas} />
    
  };
  
  const MyEducationHistory = () => {
    const [educationHistory, setEducationHistory] = useState<EducationPeriod[]>([]);
  
    useEffect(() => {
      import('./my-education-history.json').then((data) => {
        setEducationHistory(data.default as EducationPeriod[]);
      });
    }, []);
  
    return <EducationTimeline history={educationHistory} />;
  };
  
  const MyEmploymentHistory = () => {
    const [employmentHistory, setEmploymentHistory] = useState<Job[]>([]);
  
    useEffect(() => {
      import('./my-jobs.json').then((data) => {
        setEmploymentHistory(data.default as Job[]);
      });
    }, []);
  
    return <EmploymentHistory history={employmentHistory} />;
  };


const CarouselSection = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  
  const sections = [
    { title: "Skills", component: <MySkills /> },
    { title: "Employment History", component: <MyEmploymentHistory /> },
    { title: "Academic Background", component: <MyEducationHistory /> }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sections.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sections.length) % sections.length);
  };

  return (
    <div className="flex-1 pl-[25%]">
      <main className="p-8 bg-gray-100 min-h-screen">
        {/* Navigation Headers */}
        <div className="flex justify-center items-center gap-8 mb-8">
          {sections.map((section, index) => (
            <h2
              key={index}
              className={`cursor-pointer transition-all duration-0 ${
                index === currentIndex
                  ? 'text-3xl font-bold text-blue-600'
                  : 'text-xl text-gray-400 hover:text-gray-600'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              {section.title}
            </h2>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {/* <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </button> */}

          {/* Current Section */}
          {/* <div className="border rounded-lg bg-white shadow-sm"> */}
            {sections[currentIndex].component}
          {/* </div> */}
        </div>
      </main>
    </div>
  );
};

export default CarouselSection;


// Key features:
// 1. Navigation headers at the top that show all sections
// - Current section is larger and blue
// - Clickable to switch sections
// - Other sections are gray and smaller

// 2. Carousel controls
// - Left/right arrows for navigation
// - Circular navigation (loops back to start/end)

// 3. Animation and styling
// - Smooth transitions for text size and color
// - Hover effects on navigation elements
// - Consistent section sizing with min-height

// To use this:
// 1. Replace the current sections code with this component
// 2. Ensure you have the ChevronLeft and ChevronRight icons imported from lucide-react

