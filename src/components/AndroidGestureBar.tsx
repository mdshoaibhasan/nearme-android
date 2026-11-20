import React from 'react';

export const AndroidGestureBar: React.FC = () => {
  return (
    <div className="w-full bg-[#FFFFFF] py-2 flex items-center justify-center select-none">
      <div className="w-32 h-1 rounded-full bg-neutral-300 transition-colors hover:bg-neutral-400" />
    </div>
  );
};
