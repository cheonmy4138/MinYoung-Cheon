import React from 'react';
import { Star, Award, Cpu, Sparkles } from 'lucide-react';
import { SkillItem } from '../types';

interface SkillsProps {
  skills: SkillItem[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating
              ? 'fill-[#E06D3B] text-[#E06D3B]'
              : 'fill-transparent text-white/20'
          }`}
        />
      );
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  return (
    <section id="skills" className="py-24 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#2BB6A3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-6">
          <div>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#2BB6A3] block mb-2">
              TECHNICAL PROFICIENCY
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              SKILLS & TOOLS
            </h2>
          </div>
          <p className="text-xs font-mono uppercase text-white/40 tracking-wider mt-4 md:mt-0">
            Professional Software Expertise
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-6 sm:p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#2BB6A3]/50 transition-all duration-300 rounded-sm group flex flex-col justify-between space-y-6"
            >
              {/* Header: Skill Name & Category */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#2BB6A3]">
                    {skill.category}
                  </span>
                  <span className="text-xs font-mono text-white/50 font-bold">
                    {skill.percentage}%
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-[#2BB6A3] transition-colors">
                  {skill.name}
                </h3>
              </div>

              {/* Star Rating Display */}
              <div className="flex items-center justify-between py-2 border-y border-white/5">
                <span className="text-xs text-white/40 font-mono">PROFICIENCY</span>
                {renderStars(skill.rating)}
              </div>

              {/* Animated Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#208B7D] to-[#2BB6A3] rounded-full transition-all duration-1000 ease-out group-hover:brightness-125"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-white/60 leading-relaxed font-light pt-2">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
