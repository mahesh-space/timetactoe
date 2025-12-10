import React from 'react';

interface TimerRingProps {
  percentage: number;
  color: string;
}

const TimerRing: React.FC<TimerRingProps> = ({ percentage, color }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - percentage / 100);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
      <svg className="w-full h-full p-2" viewBox="0 0 50 50">
        {/* Track */}
        <circle
          className="text-white/5"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="25"
          cy="25"
        />
        {/* Progress */}
        <circle
          className={`transition-all duration-100 ease-linear ${color}`}
          strokeWidth="1.5"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="25"
          cy="25"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
    </div>
  );
};

export default React.memo(TimerRing);