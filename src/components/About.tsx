import React from 'react';
import { Shield, Sparkles, MessageSquare, Lightbulb, Check, User } from 'lucide-react';
import { ProfileInfo, KeywordItem } from '../types';

interface AboutProps {
  profile: ProfileInfo;
  keywords: KeywordItem[];
}

export const About: React.FC<AboutProps> = ({ profile, keywords }) => {
  const getIcon = (key: string) => {
    switch (key.toLowerCase()) {
      case 'trust':
        return <Shield className="w-5 h-5 text-[#E06D3B]" />;
      case 'detail':
        return <Sparkles className="w-5 h-5 text-[#E06D3B]" />;
      case 'communication':
        return <MessageSquare className="w-5 h-5 text-[#E06D3B]" />;
      case 'creativity':
        return <Lightbulb className="w-5 h-5 text-[#E06D3B]" />;
      default:
        return <Check className="w-5 h-5 text-[#E06D3B]" />;
    }
  };

  return (
    <section id="about" className="py-24 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Subtle Background Accent Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#2BB6A3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-6">
          <div>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#2BB6A3] block mb-2">
              ABOUT DESIGNER
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              {profile.name} <span className="text-white/40 font-light text-2xl sm:text-3xl">/ {profile.title}</span>
            </h2>
          </div>
          <p className="text-xs font-mono uppercase text-white/40 tracking-widest mt-4 md:mt-0">
            Craftsmanship & Integrity
          </p>
        </div>

        {/* About Bio Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Profile Visual Badge / Accent Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-white/10 bg-white/[0.02] p-6 sm:p-8 rounded-sm overflow-hidden group shadow-2xl">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#2BB6A3]" />
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                {/* Left Profile Info Details */}
                <div className="space-y-6 flex-1 w-full">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1.5">{profile.name}</h3>
                    <div className="text-xs uppercase tracking-widest text-[#2BB6A3] font-mono leading-relaxed">
                      <p>{profile.englishName}</p>
                      <p>({profile.title})</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 space-y-3 text-xs text-white/70 font-mono">
                    <div className="flex justify-between">
                      <span className="text-white/40">SPECIALTY</span>
                      <span className="text-white">Motion & Commercial Video</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">LOCATION</span>
                      <span className="text-white">Yongin, South Korea</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">EMAIL</span>
                      <span className="text-[#2BB6A3] hover:underline">{profile.email}</span>
                    </div>
                  </div>
                </div>

                {/* Right Profile Photo Frame (증명사진 영역) */}
                <div className="w-32 h-44 sm:w-36 sm:h-48 rounded-sm overflow-hidden border border-white/20 bg-black/60 relative shadow-xl flex-shrink-0 group/photo">
                  {profile.profileImageUrl ? (
                    <img
                      src={profile.profileImageUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center border border-dashed border-white/20 bg-white/[0.01]">
                      <User className="w-8 h-8 text-[#2BB6A3]/70 mb-2" />
                      <span className="text-[11px] font-mono text-white/70 font-semibold">증명사진</span>
                      <span className="text-[9px] font-mono text-white/40 mt-1">사진 등록 영역</span>
                    </div>
                  )}
                  <div className="absolute top-1.5 left-1.5 bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-mono text-[#2BB6A3] border border-[#2BB6A3]/30">
                    PHOTO
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Text Content */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-white/80 leading-relaxed font-light">
            {profile.bioParagraphs && profile.bioParagraphs.length > 0 ? (
              profile.bioParagraphs.map((para, i) => {
                const targets = ['기획 의도를 정확하게 이해', '디테일까지 세심하게 완성'];
                const regex = new RegExp(`(${targets.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
                const parts = para.split(regex);

                return (
                  <p key={i} className={i === 0 ? 'text-xl font-medium text-white mb-4' : ''}>
                    {parts.map((part, idx) =>
                      targets.includes(part) ? (
                        <strong key={idx} className="font-medium text-white">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              })
            ) : (
              <>
                <p className="text-xl font-medium text-white mb-4">
                  안녕하세요. 영상디자이너 전민영입니다.
                </p>
                <p>
                  저는 단순히 보기 좋은 영상을 만드는 것이 아니라,{' '}
                  <strong className="font-medium text-white">기획 의도를 정확하게 이해</strong>하고{' '}
                  <strong className="font-medium text-white">디테일까지 세심하게 완성</strong>하는 것을 가장 중요하게 생각합니다.
                </p>
                <p>
                  작은 요소 하나도 결과물의 완성도를 결정한다고 믿으며, 신뢰를 바탕으로 꾸준히 소통하며 프로젝트를 진행합니다.
                </p>
                <p>
                  브랜드가 전달하고 싶은 메시지를 가장 효과적인 영상으로 표현하기 위해 항상 고민하고 발전하는 디자이너가 되고자 합니다.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Core Keywords Section */}
        <div className="pt-12 border-t border-white/10">
          <h3 className="text-xs font-mono tracking-[0.3em] uppercase text-[#2BB6A3] mb-8 font-semibold">
            CORE VALUES & KEYWORDS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keywords.map((kw, idx) => (
              <div
                key={kw.key || idx}
                className="p-6 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#2BB6A3]/50 transition-all duration-300 group rounded-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-sm bg-[#2BB6A3]/10 border border-[#2BB6A3]/20 group-hover:bg-[#2BB6A3] group-hover:text-white transition-colors">
                    {getIcon(kw.key)}
                  </div>
                  <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
                    KEYWORD 0{idx + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#E06D3B] font-bold">✓</span>
                    <h4 className="text-lg font-bold text-white group-hover:text-[#2BB6A3] transition-colors">
                      {kw.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#2BB6A3] font-medium tracking-wide">
                    {kw.subtitle}
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed font-light pt-2">
                    {kw.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
