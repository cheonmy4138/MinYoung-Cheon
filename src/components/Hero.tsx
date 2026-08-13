import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProfileInfo, KeywordItem } from '../types';
import { parseVideoUrl } from '../utils/videoUtils';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface HeroProps {
  profile: ProfileInfo;
  keywords: KeywordItem[];
  onExploreClick: () => void;
  onAboutClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  keywords,
  onExploreClick,
  onAboutClick
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const parsedVideo = parseVideoUrl(profile.showreelVideoUrl);

  // Initialize YouTube IFrame Player API for 4K Max Quality (2160p / highres)
  useEffect(() => {
    if (!parsedVideo.isYouTube) return;

    const enforceMaxQuality = (playerInstance: any) => {
      try {
        if (playerInstance && typeof playerInstance.setPlaybackQuality === 'function') {
          playerInstance.setPlaybackQuality('hd2160');
          playerInstance.setPlaybackQuality('highres');
        }
      } catch (err) {
        // Safe fallback if quality setting is ignored by YouTube
      }
    };

    const initPlayer = () => {
      if (window.YT && window.YT.Player && iframeRef.current) {
        try {
          ytPlayerRef.current = new window.YT.Player(iframeRef.current, {
            events: {
              onReady: (event: any) => {
                enforceMaxQuality(event.target);
                try {
                  event.target.mute();
                  event.target.playVideo();
                } catch (e) {}
              },
              onStateChange: (event: any) => {
                // When video starts playing (state 1), reinforce 4K quality
                if (event.data === 1 || (window.YT.PlayerState && event.data === window.YT.PlayerState.PLAYING)) {
                  enforceMaxQuality(event.target);
                }
              }
            }
          });
        } catch (e) {
          // Fallback handled via postMessage & src parameters
        }
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      if (!document.getElementById('youtube-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevReady) prevReady();
        initPlayer();
      };
    }
  }, [parsedVideo.isYouTube, parsedVideo.videoId, profile.showreelVideoUrl]);

  useEffect(() => {
    if (!parsedVideo.isYouTube && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by browser until user interacts
        setIsPlaying(false);
      });
    }
  }, [profile.showreelVideoUrl, parsedVideo.isYouTube]);

  const togglePlay = () => {
    if (parsedVideo.isYouTube) {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        if (isPlaying) {
          ytPlayerRef.current.pauseVideo();
        } else {
          ytPlayerRef.current.playVideo();
        }
      } else if (iframeRef.current?.contentWindow) {
        const command = isPlaying ? 'pauseVideo' : 'playVideo';
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: command, args: [] }),
          '*'
        );
      }
      setIsPlaying(!isPlaying);
    } else if (!parsedVideo.isYouTube && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-transparent">
      {/* Background Video Showcase Container */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none">
        {/* Soft Dark Overlay for vivid video visibility */}
        <div className="absolute inset-0 bg-[#111111]/30 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/50 z-10 pointer-events-none" />

        {parsedVideo.isYouTube ? (
          <div className="w-full h-full relative pointer-events-none overflow-hidden opacity-75 filter brightness-95 contrast-105">
            <iframe
              id="hero-youtube-bg"
              ref={iframeRef}
              src={`${parsedVideo.embedUrl}?autoplay=1&mute=1&loop=1&playlist=${parsedVideo.videoId}&controls=0&showinfo=0&autohide=1&modestbranding=1&enablejsapi=1&vq=hd2160&suggestedQuality=hd2160`}
              title="Showreel Background"
              className="absolute top-1/2 left-1/2 w-[250vw] h-[250vh] min-w-[120%] min-h-[120%] -translate-x-1/2 -translate-y-1/2 object-cover border-0 pointer-events-none scale-105"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : !videoError ? (
          <video
            ref={videoRef}
            src={profile.showreelVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover object-center scale-105 opacity-75 transition-opacity duration-1000 filter brightness-95 contrast-105"
          />
        ) : (
          /* High-end fallback ambient visual canvas if video source fails or loading */
          <div className="w-full h-full bg-gradient-to-br from-[#0c0c0c] via-[#18181b] to-[#0a0a0a] flex items-center justify-center opacity-40">
            <div className="w-96 h-96 rounded-full bg-[#3B82F6]/20 filter blur-3xl animate-pulse" />
          </div>
        )}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 my-auto py-16 flex flex-col justify-center">
        <div className="max-w-3xl space-y-8">
          {/* Tag / Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2BB6A3]/40 bg-[#111111]/70 backdrop-blur-md drop-shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#E06D3B]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#2BB6A3] uppercase">
              Showreel & Portfolio
            </span>
          </div>

          {/* Main Title & Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              {profile.englishName || 'MINYOUNG CHEON'}
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-[#2BB6A3] tracking-wider uppercase font-mono drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {profile.title || 'Video Designer'}
            </p>
          </div>

          {/* Subtitle Message */}
          <p className="text-lg sm:text-xl md:text-2xl font-light text-white/95 leading-relaxed max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            {profile.tagline || '신뢰를 바탕으로 디테일까지 완성하는 영상디자이너'}
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <button
              onClick={onExploreClick}
              className="px-8 py-4 bg-[#E06D3B] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-[#d45c2a] transition-all duration-300 shadow-lg shadow-[#E06D3B]/25 hover:shadow-[#E06D3B]/40 hover:-translate-y-0.5 flex items-center gap-3 group"
            >
              <span>Portfolio 보기</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>

            <button
              onClick={onAboutClick}
              className="px-8 py-4 border border-[#2BB6A3]/50 bg-[#2BB6A3]/10 text-white text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-[#2BB6A3] hover:text-black transition-all duration-300 hover:-translate-y-0.5"
            >
              About 디자이너
            </button>
          </div>
        </div>

        {/* Video Play / Pause Control Button */}
        <div className="absolute right-6 sm:right-12 bottom-0 z-30">
          <button
            onClick={togglePlay}
            className="p-3.5 rounded-full bg-black/75 border border-white/20 text-white hover:border-[#2BB6A3] hover:bg-black/90 backdrop-blur-md transition-all shadow-xl cursor-pointer"
            title={isPlaying ? '배경 영상 끄기' : '배경 영상 재생'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-[#E06D3B]" />
            ) : (
              <Play className="w-4 h-4 text-[#2BB6A3] ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom Core Keywords Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-8">
        <div className="border-t border-white/10 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {keywords.map((kw, idx) => (
            <div
              key={kw.key || idx}
              className="p-4 rounded-sm border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#2BB6A3]/40 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2BB6A3] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#2BB6A3] font-bold">
                  ✓ {kw.title}
                </span>
              </div>
              <p className="text-xs text-white/90 font-medium truncate">{kw.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

