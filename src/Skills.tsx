import React, { useState } from 'react';
import { Code, Database, Cloud, Brain, ChartNetwork, ThumbsUp } from 'lucide-react';
import renderRichText, { DetailItem } from './richText';

const iconLookup: Record<string, React.ComponentType<any>> = {
    "code": Code,
    "database": Database,
    "cloud": Cloud,
    "brain": Brain,
    "chart": ChartNetwork,
    "thumbs_up": ThumbsUp
};

interface SkillArea {
  name: string;
  iconName: keyof typeof iconLookup;
  skills: string[];
  moreDetails: DetailItem[];
}

interface SkillAreaProps {
  skills?: SkillArea[];
}

const SkillSection: React.FC<SkillAreaProps> = ({ skills = [] }) => {
    // const [selectedArea, setSelectedArea] = useState<SkillArea>(skills[0]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (skills.length === 0) {
        return (
        <section className="border rounded-lg p-4 bg-white shadow-sm">
            <h2 className="text-2xl font-bold mb-6 mt-4 text-center">Skills</h2>
            <p className="text-center text-gray-500">No skills provided.</p>
        </section>
        );
    }

    return (      
        <div className="flex gap-8">
            {/* Skill area cards list (left side) */}
            <div className="w-80 flex-shrink-0 space-y-4">
            {skills.map((skill, index) => {
                const isSelected = selectedIndex === index;
                const Icon = iconLookup[skill.iconName];
                
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
                        <Icon className="w-5 h-5 text-white" />
                        <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white">{skill.name}</div>
                        <p className="text-sm text-gray-200">{skill.skills.join(' • ')}</p>
                        </div>
                    </div>
                    </div>
                </div>
                );
            })}
            </div>

            {/* Skill area details (right side) */}
            <div className="flex-1 bg-gray-50 rounded-lg p-6 shadow-[inset_15px_15px_115px_-15px_rgba(0,100,200,0.3)]">
            {skills[selectedIndex] && (
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        {React.createElement(iconLookup[skills[selectedIndex].iconName], {
                            className: "w-8 h-8 text-blue-600"
                        })}
                        <h3 className="text-2xl font-bold text-gray-900">{skills[selectedIndex].name}</h3>
                    </div>
                
                {skills[selectedIndex].moreDetails && skills[selectedIndex].moreDetails.length > 0 && (
                    <div>
                    <ul className="list-disc list-outside space-y-2 ml-4">
                    {skills[selectedIndex].moreDetails.map((detail, index) => (
                        <li key={index} className="pl-3 -indent-0 text-gray-700">
                            {renderRichText(detail)}
                        </li>
                        ))}
                    </ul>
                    </div>
                )}
                </div>
            )}
            </div>
        </div>
    );
};

export default SkillSection;
export type { SkillArea };