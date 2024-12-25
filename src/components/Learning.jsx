import React from 'react';
import { motion } from 'framer-motion';

const Learning = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6">Skills Enhancement & Learning</h2>
      <ul className="list-disc list-inside space-y-4">
        <motion.li
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Undertook a one-month in-office training at Bala Aatral Solutions Pvt. Ltd., VR|AR|MR|XR software solutions.
        </motion.li>
        <motion.li
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Gained foundational Unity Engine skills and ventured into game development and the metaverse domain.
        </motion.li>
        <motion.li
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Cultivated practical skills in creating immersive virtual reality experiences, enhancing learning engagement and XR performance.
        </motion.li>
      </ul>
    </motion.div>
  );
};

export default Learning;

