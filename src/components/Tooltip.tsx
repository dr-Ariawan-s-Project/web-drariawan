import React, { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, position = 'top', children }) => {
  return (
    <div className={`relative inline-block group ${position}`}>
      {children}
      <span className={`absolute transition-all rounded bg-red-800 p-2 text-xs text-white ${position === 'top' ? 'bottom-10' : ''} ${position === 'bottom' ? 'top-10' : ''} ${position === 'left' ? 'right-10' : ''} ${position === 'right' ? 'left-10' : ''} opacity-0 group-hover:opacity-100`}>
        {content}
      </span>
    </div>
  );
};

export default Tooltip;
