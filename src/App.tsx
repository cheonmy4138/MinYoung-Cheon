import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Playground } from './components/Playground';
import { ProjectModal } from './components/ProjectModal';
import { Skills } from './components/Skills';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';

import {
  initialProfile,
  initialKeywords,
  initialSkills,
  processSteps as initialProcessSteps,
  initialProjects,
  initialCategories,
  initialPlayground
} from './data/initialData';
import { Project, ProfileInfo, SkillItem, CategoryItem, PlaygroundItem } from './types';

export default function App() {
  // State initialization with LocalStorage fallbacks
  const [profile, setProfile] = useState<ProfileInfo>(() => {
    const saved = localStorage.getItem('my_portfolio_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.englishName === 'MINYOUNG JEON') {
          parsed.englishName = 'MINYOUNG CHEON';
        }
        if (!parsed.phone) {
          parsed.phone = initialProfile.phone;
        }
        return parsed;
      } catch (e) {
        // Fallback if parse fails
      }
    }
    return initialProfile;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('my_portfolio_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    const saved = localStorage.getItem('my_portfolio_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [playgroundItems, setPlaygroundItems] = useState<PlaygroundItem[]>(() => {
    const saved = localStorage.getItem('my_portfolio_playground');
    return saved ? JSON.parse(saved) : initialPlayground;
  });

  const [playgroundSubtitle, setPlaygroundSubtitle] = useState<string>(() => {
    const saved = localStorage.getItem('my_portfolio_playground_sub');
    return saved || "Experimental designs and side projects crafted to push boundaries.";
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const saved = localStorage.getItem('my_portfolio_skills');
    return saved ? JSON.parse(saved) : initialSkills;
  });

  const [keywords] = useState(initialKeywords);
  const [processSteps] = useState(initialProcessSteps);

  // Active modal states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Active navigation section observer
  const [activeSection, setActiveSection] = useState('home');

  // Save changes to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('my_portfolio_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('my_portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('my_portfolio_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('my_portfolio_playground', JSON.stringify(playgroundItems));
  }, [playgroundItems]);

  useEffect(() => {
    localStorage.setItem('my_portfolio_playground_sub', playgroundSubtitle);
  }, [playgroundSubtitle]);

  useEffect(() => {
    localStorage.setItem('my_portfolio_skills', JSON.stringify(skills));
  }, [skills]);

  // Scroll Spy for active navigation highlight
  useEffect(() => {
    const sectionIds = ['home', 'about', 'portfolio', 'playground', 'skills', 'process', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResetData = () => {
    setProfile(initialProfile);
    setProjects(initialProjects);
    setCategories(initialCategories);
    setPlaygroundItems(initialPlayground);
    setPlaygroundSubtitle("Experimental designs and side projects crafted to push boundaries.");
    setSkills(initialSkills);
    localStorage.removeItem('my_portfolio_profile');
    localStorage.removeItem('my_portfolio_projects');
    localStorage.removeItem('my_portfolio_categories');
    localStorage.removeItem('my_portfolio_playground');
    localStorage.removeItem('my_portfolio_playground_sub');
    localStorage.removeItem('my_portfolio_skills');
  };

  const scrollToSection = (id: string) => {
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
    <div className="min-h-screen bg-transparent text-white selection:bg-[#2BB6A3] selection:text-white font-sans relative">
      {/* Ambient Floating Dark Color Gradient Backdrop */}
      <div className="ambient-bg-glow" />

      {/* Navigation Bar */}
      <Navbar
        profile={profile}
        activeSection={activeSection}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={() => setIsAdminLoggedIn(false)}
      />

      {/* Main Page Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          profile={profile}
          keywords={keywords}
          onExploreClick={() => scrollToSection('portfolio')}
          onAboutClick={() => scrollToSection('about')}
        />

        {/* About Section */}
        <About profile={profile} keywords={keywords} />

        {/* Portfolio Section */}
        <Portfolio
          projects={projects}
          categories={categories}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Playground Section */}
        <Playground
          items={playgroundItems}
          subtitle={playgroundSubtitle}
        />

        {/* Skills Section */}
        <Skills skills={skills} />

        {/* Process Section */}
        <Process steps={processSteps} />

        {/* Contact Section */}
        <Contact profile={profile} />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Admin Dashboard Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isLoggedIn={isAdminLoggedIn}
        onLoginSuccess={() => setIsAdminLoggedIn(true)}
        projects={projects}
        setProjects={setProjects}
        categories={categories}
        setCategories={setCategories}
        playgroundItems={playgroundItems}
        setPlaygroundItems={setPlaygroundItems}
        playgroundSubtitle={playgroundSubtitle}
        setPlaygroundSubtitle={setPlaygroundSubtitle}
        profile={profile}
        setProfile={setProfile}
        skills={skills}
        setSkills={setSkills}
        onResetData={handleResetData}
      />
    </div>
  );
}
