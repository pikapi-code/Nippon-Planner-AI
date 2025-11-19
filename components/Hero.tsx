import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-indigo-900 h-[500px] overflow-hidden">
      <img 
        src="https://picsum.photos/seed/japan_mount_fuji/1600/900" 
        alt="Mount Fuji" 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-pink-400">Japan</span>
        </h1>
        <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mb-8">
          Experience the perfect blend of tradition and future. 
          Let AI craft your personalized 14-day adventure in the Land of the Rising Sun.
        </p>
      </div>
    </div>
  );
};