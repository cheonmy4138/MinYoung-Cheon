import React, { useState } from 'react';
import { Play, ArrowUpRight, Film, Tag } from 'lucide-react';
import { Project, CategoryItem } from '../types';

interface PortfolioProps {
  projects: Project[];
  categories: CategoryItem[];
  onSelectProject: (project: Project) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ projects, categories, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filterCategories: CategoryItem[] = [
    { id: 'ALL', label: 'ALL', desc: '전체 프로젝트' },
    ...categories,
  ];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 bg-transparent border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6">
          <div>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#2BB6A3] block mb-2">
              FEATURED WORKS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              PORTFOLIO
            </h2>
          </div>
          <p className="text-xs font-mono uppercase text-white/50 tracking-wider mt-4 md:mt-0">
            Click card to explore details & video
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-12 pb-4 border-b border-white/5">
          {filterCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-sm text-xs font-semibold tracking-wider transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#2BB6A3] text-white shadow-lg shadow-[#2BB6A3]/20 font-bold'
                    : 'bg-white/[0.03] text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] opacity-70 font-mono hidden sm:inline ${isActive ? 'text-white' : 'text-white/40'}`}>
                  ({cat.id === 'ALL' ? projects.length : projects.filter((p) => p.category === cat.id).length})
                </span>
              </button>
            );
          })}
        </div>

        {/* Large Cards Layout Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#2BB6A3] transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />

                  {/* Dark Vignette Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Category Pill Tag Top Left */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-widest font-mono text-white font-bold rounded-xs shadow-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Play Button Center Overlay - Point Orange */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90">
                    <div className="w-16 h-16 rounded-full bg-[#E06D3B] text-white flex items-center justify-center shadow-xl shadow-[#E06D3B]/40 transform group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 ml-1 fill-current" />
                    </div>
                  </div>

                  {/* Duration/Period Badge Bottom Right */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md text-[10px] font-mono text-white/80 rounded-xs">
                      {project.period}
                    </span>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#2BB6A3] font-semibold">
                        {project.category}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#E06D3B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#2BB6A3] transition-colors line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/60 line-clamp-2 font-light leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Tools / Roles Bottom Row */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {project.roles.slice(0, 3).map((role, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[11px] bg-white/5 text-white/70 rounded-xs border border-white/5"
                        >
                          {role}
                        </span>
                      ))}
                      {project.roles.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-white/40 font-mono">
                          +{project.roles.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-1.5 font-mono text-[11px] text-[#2BB6A3]">
                      {project.tools.slice(0, 2).join(' • ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-white/10 rounded-sm bg-white/[0.01]">
            <Film className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-sm text-white/60 font-medium">선택한 카테고리의 프로젝트가 없습니다.</p>
            <button
              onClick={() => setSelectedCategory('ALL')}
              className="mt-4 px-4 py-2 bg-white/10 text-xs text-white hover:bg-white/20 rounded-sm transition-colors"
            >
              전체 프로젝트 보기
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
