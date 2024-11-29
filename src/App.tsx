import React from 'react';
import { Linkedin, Github, Mail, Download } from 'lucide-react';
import CarouselSection from './Carousel';


const SocialLinks = () => {
  return (
    <div className="flex gap-1 mt-4 mb-6 justify-center w-full text-xs sm:text-sm sm:gap-2">
      <a href="https://www.linkedin.com/in/joshuaprettyman" target="_blank" rel="noopener noreferrer" 
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>LinkedIn</span>
      </a>
      <a href="https://github.com/drprettyman" target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
        <Github className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>GitHub</span>
      </a>
      <a href="mailto:j.prettyman@icloud.com"
        className="flex items-center gap-1 text-red-600 hover:text-red-800">
        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Email</span>
      </a>
      <a 
        href="/cv_jprettyman.pdf" 
        download
        className="flex items-center gap-1 text-green-600 hover:text-green-800"
      >
        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>CV.pdf</span>
      </a>
    </div>
  );
};

const InteractiveDashboard: React.FC = () => {
  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <div className="fixed w-1/4 h-screen bg-blue-50 p-4 lg:p-6 overflow-y-auto">
      
        <div className="flex flex-col items-center w-full max-w-full">

          <h1 className="text-[min(4vw)] md:text-[min(3vw)] lg:text-[min(2.5vw,28px)] font-bold mb-2 text-center text-gray-800 whitespace-nowrap px-4">
            Joshua Prettyman, Ph.D.
          </h1>

          <SocialLinks />
          
          <div className="rounded-lg overflow-hidden shadow-2xl mb-6 w-full">
            <img 
              src="/images/headshot.jpg" 
              alt="Joshua Prettyman looking handsome" 
              className="object-cover w-full h-full"
            />
          </div>
          
          <p className="text-gray-600 text-justify mb-6 w-full leading-relaxed">
            Data scientist, Maths Ph.D. and software developer. Creating meaning from data and doing cool things with python.
          </p>
          <p className="text-gray-600 text-justify mb-6 w-full leading-relaxed">
            In my last role at Blink SEO I built the in-house software from scratch using python, Big Query and JavaScript. 
            This evolved into <a href="https://www.macaroni.works">Macaroni</a>, a SaaS 
            product for SEO agencies boasting a <a href="https://blinkseo.co.uk/blogs/case-studies/how-macaroni-made-us-20x-more-productive"> 20x increase in productivity</a>!
          </p>
          <p className="text-gray-600 text-justify mb-6 w-full leading-relaxed">
            My Ph.D. gave me the opportunity to present at international conferences 
            and publish in respected journals. I also have two years lecturing experience so 
            I am used to communicating difficult concepts to a variety of audiences. 
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <CarouselSection />
    </div>
  );
};

export default InteractiveDashboard;