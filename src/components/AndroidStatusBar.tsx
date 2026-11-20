import React, { useState, useEffect } from 'react';
import { Wifi, Signal, BatteryCharging } from 'lucide-react';

export const AndroidStatusBar: React.FC<{ isDarkContent?: boolean }> = ({ isDarkContent = true }) => {
  const [time, setTime] = useState('10:42');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const textColor = isDarkContent ? 'text-neutral-800' : 'text-white';

  return (
    <div className={`w-full px-6 pt-3 pb-2 flex items-center justify-between text-xs font-medium tracking-tight select-none z-30 transition-colors ${textColor}`}>
      {/* Clock on Left */}
      <div className="flex items-center gap-1.5 font-semibold text-[13px] tracking-normal">
        <span>{time}</span>
      </div>

      {/* Center Camera Punch-hole */}
      <div className="w-4 h-4 rounded-full bg-black/85 border border-neutral-700/50 shadow-inner flex items-center justify-center pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-900/90" />
      </div>

      {/* Status Icons on Right */}
      <div className="flex items-center gap-2 text-xs">
        <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
        <span className="text-[10px] font-bold tracking-tight">5G</span>
        <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-semibold">89%</span>
          <BatteryCharging className="w-4 h-4 stroke-[2.2] text-[#16834A]" />
        </div>
      </div>
    </div>
  );
};
