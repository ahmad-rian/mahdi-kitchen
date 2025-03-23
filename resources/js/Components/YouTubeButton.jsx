import React from 'react';

export default function YouTubeButton() {
  return (
    <a 
      href="http://www.youtube.com/@mahdybinggo1980" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed left-4 bottom-4 z-50 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white p-3 pr-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 sm:left-6 sm:bottom-6 md:left-8 md:bottom-8 md:pr-5"
      aria-label="Kunjungi kanal YouTube kami"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="white" 
        className="w-5 h-5 md:w-6 md:h-6"
      >
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
      </svg>
      <span className="hidden md:inline font-medium">Channel YouTube</span>
    </a>
  );
}