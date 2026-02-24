import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function StatsCard({ icon, label, value, color, bgColor }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 1000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      whileHover={{ 
        scale: 1.05,
        transition: { type: "spring", stiffness: 400 }
      }}
      className={`bg-gradient-to-br ${bgColor} rounded-xl shadow-lg p-4 text-white relative overflow-hidden group`}
    >
      {/* Background Icon */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -right-4 -top-4 text-6xl opacity-20"
      >
        {icon}
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl">{icon}</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-white rounded-full opacity-50"
          />
        </div>
        <p className="text-sm opacity-90 mb-1">{label}</p>
        <motion.p 
          key={count}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold"
        >
          {count}
        </motion.p>
      </div>

      {/* Hover Effect */}
      <motion.div
        whileHover={{ scale: 1.5, opacity: 0.2 }}
        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition"
      />
    </motion.div>
  );
}

export default StatsCard;