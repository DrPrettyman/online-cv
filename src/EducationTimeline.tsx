import React, { useState } from 'react';
import { Award, MapPin, BookOpen, Sparkles } from 'lucide-react';
import renderRichText, { DetailItem } from './richText';

interface Publication {
  title: string;
  publisher?: string;
  date: string;  // Format: "YYYY-MM"
  abstract?: string;
  url?: string;
}

interface EducationPeriod {
  institution: string;
  institutionShort?: string;
  degree: string;
  startDate: string;  // Format: "YYYY-MM"
  endDate: string;  // Format: "YYYY-MM"
  description?: string;
  logoUrl?: string;
  highlights: DetailItem[];
  grade?: string;
  publications: Publication[];
}

interface EducationTimelineProps {
  history?: EducationPeriod[];
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

const TickMarks: React.FC<{ startDate: string, endDate: string, totalMonthSpan: number }> = ({ 
  startDate, 
  endDate, 
  totalMonthSpan
}) => {
  const startYear = parseInt(startDate.split('-')[0])+1;
  const endYear = parseInt(endDate.split('-')[0]);
  const ticks = [];

  for (let year = startYear; year <= endYear; year++) {
    const position = ((getDateInMonths(`${year}-01`) - getDateInMonths(startDate)) / totalMonthSpan) * 100;
    ticks.push(
      <div 
        key={year} 
        className="absolute flex flex-col items-center"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <time dateTime={`${year}-01-01`} className="text-xs text-gray-600 mb-1">{year}</time>
        <div className="w-px h-3 bg-gray-400" />
      </div>
    );
  }
  return <>{ticks}</>;
};

const EducationTimeline: React.FC<EducationTimelineProps> = ({ history = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(2);

  if (history.length === 0) {
    return (
      <section className="border rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-2xl font-bold mb-6 mt-4 text-center">My Education Journey</h2>
        <p>No education history provided.</p>
      </section>
    );
  }

  const startDate = history.reduce((min, period) => 
    period.startDate < min ? period.startDate : min, 
    history[0].startDate
  );
  
  const endDate = history.reduce((max, period) => 
    period.endDate > max ? period.endDate : max, 
    history[0].endDate
  );

  const totalMonthSpan = getDateInMonths(endDate) - getDateInMonths(startDate);

  const getBlockWidth = (period: EducationPeriod) => {
    const monthDiff = getDateInMonths(period.endDate) - getDateInMonths(period.startDate);
    return (monthDiff / totalMonthSpan) * 100;
  };

  const getBlockPosition = (period: EducationPeriod) => {
    const monthDiff = getDateInMonths(period.startDate) - getDateInMonths(startDate);
    return (monthDiff / totalMonthSpan) * 100;
  };

  return (
      <div className="px-4 pb-4">
        <div className="relative">
          <div className="relative h-6">
            <TickMarks 
              startDate={startDate}
              endDate={endDate}
              totalMonthSpan={totalMonthSpan}
            />
          </div>

          <div className="h-2 bg-gray-200 rounded-full absolute inset-x-0 top-6" />

          <div className="relative">
            <div className="relative h-20 mt-6">
              {history.map((period, index) => {
                const isSelected = selectedIndex === index;
                const bgColor = isSelected ? 'bg-blue-500' : 'bg-gray-600';
                return (
                  <div 
                    key={index}
                    tabIndex={0}
                    className={`absolute rounded-full cursor-pointer transition-all duration-300 hover:opacity-80 flex items-center p-2 ${bgColor}`}
                    style={{
                      width: `${getBlockWidth(period)}%`,
                      left: `${getBlockPosition(period)}%`,
                      height: '3.5rem'
                    }}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-center w-full">
                      {period.logoUrl && (
                        <img 
                          src={period.logoUrl} 
                          alt={`${period.institution} logo`} 
                          className="w-8 h-8 mr-3 rounded-full flex-shrink-0"
                        />
                      )}
                      <div className="flex-grow overflow-hidden">
                        <div className="text-sm font-bold text-white">{period.institutionShort ? period.institutionShort : period.institution}</div>
                        <div className="text-xs text-gray-200 truncate">{period.degree}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {history[selectedIndex] && (
              <div className="mt-4 bg-white p-6 rounded-lg shadow-[inset_15px_15px_115px_-15px_rgba(0,100,200,0.3)] flex items-start transition-all duration-300 ease-in-out">
                {history[selectedIndex].logoUrl && (
                  <img 
                    src={history[selectedIndex].logoUrl} 
                    alt={`${history[selectedIndex].institution} logo`} 
                    className="w-16 mr-6"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{history[selectedIndex].institution}</h3>
                  <p>{history[selectedIndex].degree}</p>
                  <p className="text-gray-600">
                    {formatDate(history[selectedIndex].startDate)} - {formatDate(history[selectedIndex].endDate)}
                  </p>
                  
                  {history[selectedIndex].grade && (
                    <div className="mt-2">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Award className="w-4 h-4 mr-2" /> {history[selectedIndex].grade}
                      </h4>
                    </div>
                  )}
                  
                  {history[selectedIndex].description && (
                    <p className="mt-2">{history[selectedIndex].description}</p>
                  )}
                  
                  {history[selectedIndex].highlights && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2" /> Key Points
                      </h4>
                      <ul className="list-disc list-outside text-gray-700 space-y-1">
                        {history[selectedIndex].highlights.map((achievement, index) => (
                        <li key={index} className="pl-3 -indent-0 text-gray-700">
                          {renderRichText(achievement)}
                        </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {history[selectedIndex].publications && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" /> Publications
                      </h4>
                      <div className="space-y-4">
                        {history[selectedIndex].publications.map((pub, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg ring-1">
                            <h5 className="font-medium">
                              {pub.url ? (
                                <a 
                                  href={pub.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  {pub.title}
                                </a>
                              ) : (
                                pub.title
                              )}
                            </h5>
                            <p className="text-sm text-gray-600 mt-1">
                              {pub.publisher} · {formatDate(pub.date)}
                            </p>
                            {pub.abstract && (
                              <div className="text-sm text-gray-700 mt-2">
                                <details>
                                  <summary className="cursor-pointer hover:text-gray-900">
                                    {/* {pub.abstract.slice(0, 150)} */}
                                    {/* {pub.abstract.length > 150 && '... '} */}
                                    <span className="text-blue-600 ml-1">
                                      {pub.abstract.length > 150 ? 'Read abstract...' : ''}
                                    </span>
                                  </summary>
                                  <p className="mt-2">{pub.abstract}</p>
                                </details>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
    
          </div>
        </div>
      </div>
  );
};

export default EducationTimeline;
export type { EducationPeriod };