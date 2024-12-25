import React from 'react';
import { motion } from 'framer-motion';

const Publications = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6">Publications</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gray-800 p-6 rounded-lg"
      >
        <h3 className="text-2xl font-bold mb-2">A Systematic Literature Review on Blockchain-Based Systems for Academic Certificate Verification</h3>
        <p className="mb-4">Published in the International Journal of Novel Research and Development (IJNRD). This paper explores various blockchain-based solutions for academic certificate verification, highlighting their advantages and challenges.</p>
        <p className="mb-2">Paper ID: IJNRD2405306</p>
        <a href="https://www.ijnrd.org/papers/IJNRD2405306.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Read Paper</a>
      </motion.div>
    </motion.div>
  );
};

export default Publications;

