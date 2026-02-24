import React from 'react';

function AbstractBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="abstract-shape shape1"></div>
      <div className="abstract-shape shape2"></div>
      <div className="abstract-shape shape3"></div>
      
      {/* Additional floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-[#097c7f] to-[#326784] opacity-10"
          style={{
            width: Math.random() * 10 + 5 + 'px',
            height: Math.random() * 10 + 5 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: Math.random() * 5 + 's'
          }}
        />
      ))}
    </div>
  );
}

export default AbstractBackground;