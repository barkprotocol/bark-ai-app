import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';

interface GetStartedButtonProps {
  onClick: () => void;
  className?: string;
  text: string;
}

const GetStartedButton: React.FC<GetStartedButtonProps> = ({ onClick, className = '', text }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative ${className}`}
    >
      <Button 
        onClick={onClick} 
        className="h-12 min-w-[180px] text-base transition-all duration-300 md:min-w-[220px] lg:min-w-[250px]"
        aria-label="Get Started"
      >
        {text}
      </Button>
    </motion.div>
  );
};

export default GetStartedButton;
