import React, { useState } from 'react';
import { Mail, Phone, Copy, Check } from 'lucide-react';
import { ProfileInfo } from '../types';

interface ContactProps {
  profile: ProfileInfo;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = profile.email || 'wjsgpsfl0@gmail.com';
  const phone = profile.phone || '010-4138-7246';
  const name = profile.name || '전민영';
  const title = profile.title || 'Video Designer';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-transparent border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header - Left-aligned matching Process section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6">
          <div>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#2BB6A3] block mb-2">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              CONTACT
            </h2>
          </div>
          <p className="text-xs font-mono uppercase text-white/40 tracking-wider mt-4 md:mt-0">
            Let's Work Together
          </p>
        </div>

        {/* Content Layout - Left Aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Profile & Description Text */}
          <div className="lg:col-span-6 space-y-3 text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              {name} <span className="text-base sm:text-lg font-normal text-white/50">/ {title}</span>
            </h3>
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xl break-keep">
              새로운 영상 프로젝트 협업이나 외주 문의는 언제든지<br />
              아래 연락처로 편하게 연락주세요.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="lg:col-span-6 space-y-4 text-left">
            {/* Email Card */}
            <div className="p-5 border border-white/10 bg-white/[0.02] hover:border-[#2BB6A3] transition-all rounded-sm flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#2BB6A3]/10 border border-[#2BB6A3]/30 text-[#2BB6A3] rounded-sm shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider block">Email</span>
                  <span className="text-sm font-bold text-white group-hover:text-[#2BB6A3] transition-colors break-all">
                    {email}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="ml-3 px-3 py-1.5 border border-white/10 hover:border-[#2BB6A3] text-xs font-mono text-white/70 hover:text-white rounded-xs transition-colors flex items-center gap-1.5 shrink-0"
                title="이메일 복사"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-5 border border-white/10 bg-white/[0.02] hover:border-[#2BB6A3] transition-all rounded-sm flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#2BB6A3]/10 border border-[#2BB6A3]/30 text-[#2BB6A3] rounded-sm shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider block">Phone Number</span>
                  <a
                    href={`tel:${phone}`}
                    className="text-sm font-bold text-white group-hover:text-[#2BB6A3] transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyPhone}
                className="ml-3 px-3 py-1.5 border border-white/10 hover:border-[#2BB6A3] text-xs font-mono text-white/70 hover:text-white rounded-xs transition-colors flex items-center gap-1.5 shrink-0"
                title="전화번호 복사"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
