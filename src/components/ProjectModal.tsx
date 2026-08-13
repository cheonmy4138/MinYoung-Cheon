import React, { useState, useEffect } from 'react';
import { X, Play, Clock, Layers, Wrench, FileText, CheckCircle, ExternalLink, ShieldAlert } from 'lucide-react';
import { Project } from '../types';
import { parseVideoUrl } from '../utils/videoUtils';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [videoError, setVideoError] = useState(false);

  // Reset video error state whenever project changes
  useEffect(() => {
    setVideoError(false);
  }, [project]);

  if (!project) return null;

  const parsedVideo = parseVideoUrl(project.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#161616] border border-white/10 rounded-md shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#111111]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-[10px] uppercase font-mono font-bold tracking-widest text-[#2BB6A3] bg-[#2BB6A3]/10 border border-[#2BB6A3]/30 rounded-sm">
              {project.category}
            </span>
            <h3 className="text-sm font-bold text-white/80 truncate max-w-md hidden sm:block">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors flex items-center gap-1.5 text-xs"
            aria-label="닫기"
          >
            <span className="text-xs uppercase tracking-wider hidden sm:inline">Close</span>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 md:p-10 space-y-10 overflow-y-auto">
          {/* Main Video Section */}
          <div className="relative w-full aspect-video bg-black border border-white/10 rounded-sm overflow-hidden shadow-2xl group">
            {parsedVideo.isYouTube ? (
              <iframe
                src={`${parsedVideo.embedUrl}?autoplay=1&rel=0`}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : !videoError ? (
              <video
                src={project.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain bg-black"
                onError={() => setVideoError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-900">
                <ShieldAlert className="w-12 h-12 text-[#2BB6A3] mb-3" />
                <p className="text-sm text-white font-medium mb-1">동영상 미리보기 준비 중입니다.</p>
                <p className="text-xs text-white/50 mb-4 max-w-md">
                  상세 가이드 및 비디오 파일을 확인하려면 아래 버튼을 클릭하세요.
                </p>
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#E06D3B] text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-2 hover:bg-[#d45c2a] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> 외부 링크로 보기
                </a>
              </div>
            )}
          </div>

          {/* Project Header Info */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-[#2BB6A3] font-medium leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Project Specs Grid (Period, Role, Tools) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 border border-white/10 bg-white/[0.02] rounded-sm">
            {/* Period */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40">
                <Clock className="w-3.5 h-3.5 text-[#2BB6A3]" />
                <span>제작 기간 (Period)</span>
              </div>
              <p className="text-sm font-semibold text-white">{project.period}</p>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40">
                <Layers className="w-3.5 h-3.5 text-[#2BB6A3]" />
                <span>담당 역할 (Role)</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.roles.map((role, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs text-white/90 bg-white/10 rounded-xs font-medium"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40">
                <Wrench className="w-3.5 h-3.5 text-[#2BB6A3]" />
                <span>사용 툴 (Tool)</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs text-[#2BB6A3] bg-[#2BB6A3]/10 border border-[#2BB6A3]/20 rounded-xs font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Overview / Planning Intent (기획 의도) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#2BB6A3] font-bold">
              <FileText className="w-4 h-4 text-[#E06D3B]" />
              <span>OVERVIEW / 기획 의도</span>
            </div>
            <div className="p-6 border border-white/10 bg-white/[0.01] rounded-sm text-sm sm:text-base text-white/80 leading-relaxed font-light">
              {project.overview}
            </div>
          </div>

          {/* Process Breakdown (제작 과정) */}
          {project.process && project.process.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#2BB6A3] font-bold">
                <CheckCircle className="w-4 h-4 text-[#E06D3B]" />
                <span>PRODUCTION PROCESS / 제작 과정</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.process.map((stepItem, idx) => (
                  <div
                    key={idx}
                    className="p-5 border border-white/10 bg-white/[0.02] rounded-sm space-y-2"
                  >
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="text-[#2BB6A3] font-mono">0{idx + 1}.</span>
                      {stepItem.title}
                    </h4>
                    <p className="text-xs text-white/60 leading-relaxed font-light">
                      {stepItem.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#111111] flex justify-between items-center text-xs text-white/40 font-mono">
          <span>MINYOUNG CHEON PORTFOLIO</span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-sm transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
