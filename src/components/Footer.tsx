import React from 'react';
import { ArrowUp } from 'lucide-react';
import { ProfileInfo } from '../types';

interface FooterProps {
  profile: ProfileInfo;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-12 bg-black/40 backdrop-blur-md border-t border-white/10 text-white/50 text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info */}
        <div className="space-y-1 text-center md:text-left">
          <p className="font-bold text-white tracking-wider">
            © 2026 {profile.englishName || 'MINYOUNG CHEON'}
          </p>
          <p className="font-light text-white/40">
            Detail creates trust. {profile.tagline || '섬세한 디테일로 신뢰를 만드는 영상디자이너'}
          </p>
        </div>

        {/* Center Thank you message */}
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#2BB6A3] font-semibold text-center">
          Thank you for visiting.
        </div>

        {/* Right Back to Top */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/10 hover:border-[#2BB6A3] hover:text-white transition-all group flex items-center gap-2"
          aria-label="Back to Top"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest hidden sm:inline">TOP</span>
          <ArrowUp className="w-4 h-4 text-[#2BB6A3] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
