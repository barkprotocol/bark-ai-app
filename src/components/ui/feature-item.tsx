'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { JSX } from 'react/jsx-runtime';

interface FeatureItemProps {
  title: string;
  description: string;
  icon: JSX.Element;
  buttonText: string;
}

const FeatureItem: FC<FeatureItemProps> = ({ title, description, icon, buttonText }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="group relative flex flex-col items-center justify-center p-6 rounded-lg bg-card shadow-xl"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-muted-foreground">{title}</h3>
      <p className="mt-2 text-base text-muted-foreground">{description}</p>

      <button className="mt-4 px-4 py-2 text-white bg-primary rounded-lg transition-all duration-300 hover:bg-primary/80 focus:outline-none">
        {buttonText}
      </button>
    </motion.div>
  );
};

export default FeatureItem;
