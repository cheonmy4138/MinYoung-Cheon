import React, { useState, useEffect } from 'react';
import { Lock, Menu, X, ShieldCheck } from 'lucide-react';
import { ProfileInfo } from '../types';

interface NavbarProps {
  profile: ProfileInfo;
  activeSection: string;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeSection,
  onOpenAdmin,
  isAdminLoggedIn,
  onLogoutAdmin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'portfolio', label: 'PORTFOLIO' },
    { id: 'playground', label: 'PLAYGROUND' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'process', label: 'PROCESS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0b0c10]/90 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl'
          : 'bg-gradient-to-b from-[#0b0c10]/90 via-[#0b0c10]/50 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Name & Title */}
        <button
          onClick={() => scrollToSection('home')}
          className="group text-left focus:outline-none flex flex-col"
        >
          <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-[#2BB6A3] transition-colors">
            {profile.englishName || 'MINYOUNG CHEON'}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#2BB6A3] font-semibold">
            {profile.title || 'Video Designer'}
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative py-1 text-xs font-semibold tracking-widest uppercase transition-colors duration-200 hover:text-white ${
                  isActive ? 'text-white font-bold' : 'text-white/60'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2BB6A3] rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin Access Button */}
        <div className="hidden md:flex items-center space-x-3">
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-2 bg-[#E06D3B]/10 border border-[#E06D3B]/30 hover:border-[#E06D3B]/60 px-3 py-1.5 rounded-full transition-all">
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 text-[11px] font-bold text-[#E06D3B] hover:text-white transition-colors cursor-pointer"
                title="관리자 대시보드 열기"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#E06D3B]" />
                <span>ADMIN Active</span>
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLogoutAdmin();
                }}
                className="text-[10px] text-white/50 hover:text-white transition-colors underline cursor-pointer"
                title="로그아웃"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdmin}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#2BB6A3]/50 transition-all text-white/60 hover:text-white cursor-pointer"
              title="관리자 설정 (비밀번호: 0225)"
            >
              <Lock className="w-3 h-3 group-hover:text-[#E06D3B] transition-colors" />
              <span className="text-[11px] font-mono tracking-wider">ADMIN (0225)</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white/80 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#111111] border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left py-2 text-sm tracking-wider uppercase font-medium transition-colors ${
                  activeSection === item.id ? 'text-[#2BB6A3] font-bold' : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            {isAdminLoggedIn ? (
              <div className="flex items-center justify-between w-full">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="text-xs text-[#E06D3B] font-bold flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#E06D3B]" />
                  <span>ADMIN Active (대시보드 열기)</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogoutAdmin();
                  }}
                  className="text-xs text-white/60 hover:text-white underline cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 rounded border border-white/10 bg-white/[0.04] text-xs font-mono text-white/70 flex items-center justify-center gap-2 hover:border-[#2BB6A3]"
              >
                <Lock className="w-3.5 h-3.5 text-[#E06D3B]" /> Admin Dashboard (0225)
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
