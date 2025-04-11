'use client';

import { useState } from 'react';
import { BiPlay, BiPause } from 'react-icons/bi';

export default function VideoPlayer({ videoSrc }: { videoSrc: string }) {
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    const video = document.getElementById('project-video') as HTMLVideoElement;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative">
      <video 
        id="project-video"
        className="w-full rounded-xl group-hover:scale-105 transition-transform duration-300 border dark:border-zinc-800 border-zinc-200"
        autoPlay
        playsInline
        src={videoSrc}
        controlsList="nodownload nofullscreen noremoteplayback"
        muted
        loop
      />
      <button 
        className="absolute bottom-4 right-4 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
        onClick={handlePlayPause}
      >
        {isPlaying ? <BiPause size={20} /> : <BiPlay size={20} />}
      </button>
    </div>
  );
}