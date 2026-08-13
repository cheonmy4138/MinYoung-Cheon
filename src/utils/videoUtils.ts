/**
 * Video URL helper utility to parse and detect YouTube URLs versus standard video files.
 */

export interface ParsedVideo {
  isYouTube: boolean;
  embedUrl: string | null;
  videoId: string | null;
  originalUrl: string;
}

/**
 * Extracts YouTube video ID and generates an embed URL.
 * Supports format variations:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 */
export function parseVideoUrl(url: string | undefined | null): ParsedVideo {
  if (!url) {
    return { isYouTube: false, embedUrl: null, videoId: null, originalUrl: '' };
  }

  const cleanUrl = url.trim();

  // Regex matching 11-character YouTube video IDs across different URL formats
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;
  const match = cleanUrl.match(youtubeRegex);

  if (match && match[1]) {
    const videoId = match[1];
    return {
      isYouTube: true,
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      originalUrl: cleanUrl,
    };
  }

  return {
    isYouTube: false,
    embedUrl: null,
    videoId: null,
    originalUrl: cleanUrl,
  };
}
