import React from 'react';
import { Sparkles, Film, Image as ImageIcon } from 'lucide-react';
import { PlaygroundItem } from '../types';

interface PlaygroundProps {
  items: PlaygroundItem[];
  subtitle?: string;
}

export const Playground: React.FC<PlaygroundProps> = ({
  items,
  subtitle = "Experimental designs and side projects crafted to push boundaries."
}) => {
  if (!items || items.length === 0) return null;

  return (
    <section id="playground" className="py-24 bg-transparent border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#2BB6A3]" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#2BB6A3]">
                EXPERIMENTAL & SIDE PROJECTS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Playground
            </h2>
          </div>
          <p className="text-xs font-mono text-white/60 max-w-md tracking-wider mt-4 md:mt-0 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Masonry / Tile Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item) => {
            // Aspect ratio helper class
            let aspectClass = 'aspect-video';
            if (item.aspectRatio === 'tall') aspectClass = 'aspect-[3/4]';
            if (item.aspectRatio === 'vertical') aspectClass = 'aspect-[9/16]';
            if (item.aspectRatio === 'square') aspectClass = 'aspect-square';
            if (item.aspectRatio === 'wide') aspectClass = 'aspect-[16/9]';
            if (item.aspectRatio === 'normal') aspectClass = 'aspect-[4/3]';

            return (
              <div
                key={item.id}
                className="break-inside-avoid mb-6 rounded-sm border border-white/10 bg-[#181818] overflow-hidden group shadow-lg hover:border-[#2BB6A3]/40 transition-all duration-300 relative select-none pointer-events-none"
              >
                {/* Media Container (Video or Image) */}
                <div className={`w-full ${aspectClass} relative bg-[#0b0c10] overflow-hidden`}>
                  {item.type === 'video' || /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(item.url.trim()) ? (
                    <video
                      src={item.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      controls={false}
                      disablePictureInPicture
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                    />
                  )}

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-transparent to-black/20 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Tag Badge */}
                  {item.tag && (
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-xs">
                      {item.type === 'video' ? (
                        <Film className="w-3 h-3 text-[#E06D3B]" />
                      ) : (
                        <ImageIcon className="w-3 h-3 text-[#2BB6A3]" />
                      )}
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/90">
                        {item.tag}
                      </span>
                    </div>
                  )}

                  {/* Caption Info Box */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10 space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-sm font-bold text-white tracking-wide truncate">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-[11px] font-mono text-white/70 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
