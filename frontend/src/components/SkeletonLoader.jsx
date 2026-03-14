import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SkeletonLoader = ({ className }) => {
  return (
    <div 
      className={cn(
        "animate-pulse bg-slate-100 dark:bg-slate-800 rounded",
        className
      )}
    />
  );
};

export default SkeletonLoader;
