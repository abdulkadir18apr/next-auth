import React from 'react';

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="border-8 border-gray-200 border-t-8 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};


