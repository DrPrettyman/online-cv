import React, { useState } from 'react';
import renderRichText, { DetailItem } from './richText';

interface Job {
  role: string;
  company: string;
  companyUrl?: string;
  logoUrl?: string;
  startDate: string;  // Format: "YYYY-MM"
  endDate: string;    // Format: "YYYY-MM"
  description?: string;
  achievements: DetailItem[];
}

interface JobProps {
  history?: Job[];
}

const getDateInMonths = (dateStr: string): number => {
  const [year, month] = dateStr.split('-').map(Number);
  return year * 12 + (month - 1);
};

const formatDate = (dateStr: string): string => {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
};

const calculateDuration = (startDate: string, endDate: string): string => {
  const months = getDateInMonths(endDate) - getDateInMonths(startDate);
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
};

const EmploymentHistory: React.FC<JobProps> = ({ history = [] }) => {
  // Select the first job by default
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (      
      <div className="flex gap-8">
        {/* Job cards list (left side) */}
        <div className="w-80 flex-shrink-0 space-y-4">
          {history.map((job, index) => {
            const isSelected = selectedIndex === index;
            
            return (
              <div
                key={index}
                tabIndex={0}
                className={`rounded-lg cursor-pointer transition-all duration-300 
                           ${isSelected ? 'bg-blue-600 ring-2 ring-blue-300' : 'bg-gray-700 hover:bg-blue-500'}`}
                onClick={() => setSelectedIndex(index)}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    {job.logoUrl && (
                      <img
                        src={job.logoUrl}
                        alt={`${job.company} logo`}
                        className="w-10 h-10 rounded-full flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white">{job.role}</div>
                      <div className="text-xs text-gray-200">{job.company}</div>
                      <div className="text-xs text-gray-300 mt-1">
                        {formatDate(job.startDate)} - {formatDate(job.endDate)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Job details (right side) */}
        <div className="flex-1 bg-gray-50 rounded-lg p-6 shadow-[inset_15px_15px_115px_-15px_rgba(0,100,200,0.3)]">
          {history[selectedIndex] && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                {history[selectedIndex].logoUrl && (
                  <img
                    src={history[selectedIndex].logoUrl}
                    alt={`${history[selectedIndex].company} logo`}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{history[selectedIndex].role}</h3>
                  <p className="text-lg text-gray-600"><a href={history[selectedIndex].companyUrl}>{history[selectedIndex].company}</a></p>
                  <p className="text-sm text-gray-500">
                    {formatDate(history[selectedIndex].startDate)} - {formatDate(history[selectedIndex].endDate)}
                    {' '}· {calculateDuration(history[selectedIndex].startDate, history[selectedIndex].endDate)}
                  </p>
                </div>
              </div>
                
            {
                <p className="text-gray-600 text-justify mb-6 w-full leading-relaxed">
                    {history[selectedIndex].description}
                </p>
            }

            {history[selectedIndex].achievements && history[selectedIndex]?.achievements.length > 0 && (
                <div>
                  <ul className="list-disc list-outside space-y-2 ml-4">
                  {history[selectedIndex].achievements.map((achievement, index) => (
                      <li key={index} className="pl-3 -indent-0 text-gray-700">
                        {renderRichText(achievement)}
                      </li>
                    ))}
                  </ul>
                </div>
              )
              }
            </div>
          )}
        </div>
      </div>
  );
};

export default EmploymentHistory;
export type { Job };