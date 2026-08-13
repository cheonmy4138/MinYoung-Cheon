import React from 'react';
import {
  FileText,
  Layout,
  Video,
  Scissors,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  ArrowDown
} from 'lucide-react';
import { ProcessStep } from '../types';

interface ProcessProps {
  steps: ProcessStep[];
}

export const Process: React.FC<ProcessProps> = ({ steps }) => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <FileText className="w-5 h-5 text-[#E06D3B]" />;
      case 1:
        return <Layout className="w-5 h-5 text-[#E06D3B]" />;
      case 2:
        return <Video className="w-5 h-5 text-[#E06D3B]" />;
      case 3:
        return <Scissors className="w-5 h-5 text-[#E06D3B]" />;
      case 4:
        return <MessageSquare className="w-5 h-5 text-[#E06D3B]" />;
      case 5:
        return <CheckCircle2 className="w-5 h-5 text-[#E06D3B]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#E06D3B]" />;
    }
  };

  return (
    <section id="process" className="py-24 bg-transparent border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-6">
          <div>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#2BB6A3] block mb-2">
              WORKFLOW & METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              PROCESS
            </h2>
          </div>
          <p className="text-xs font-mono uppercase text-white/40 tracking-wider mt-4 md:mt-0">
            6-Step Production Pipeline
          </p>
        </div>

        {/* Process Flow Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;
            return (
              <div
                key={step.stepNumber || idx}
                className="relative p-6 sm:p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#2BB6A3] transition-all duration-300 rounded-sm group space-y-4"
              >
                {/* Step Top Bar: Icon + Step Number */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-sm bg-[#2BB6A3]/10 border border-[#2BB6A3]/20 group-hover:bg-[#2BB6A3] group-hover:text-white transition-colors">
                    {getStepIcon(idx)}
                  </div>
                  <span className="text-3xl font-extrabold font-mono text-white/20 group-hover:text-[#2BB6A3] transition-colors">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Step Titles */}
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#2BB6A3] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#2BB6A3]">
                    {step.koreanTitle}
                  </p>
                </div>

                {/* Step Description */}
                <p className="text-xs text-white/60 leading-relaxed font-light pt-2">
                  {step.description}
                </p>

                {/* Directional Connector Indicator */}
                {!isLast && (
                  <div className="pt-4 flex items-center gap-1.5 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    <span>NEXT STEP</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E06D3B] group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
