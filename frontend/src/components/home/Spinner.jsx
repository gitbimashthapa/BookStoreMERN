import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-12 h-12 rounded-full border-4 border-blue-200"></div>
        
        {/* Inner spinning circle */}
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-t-4 border-l-4 border-blue-600 animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;