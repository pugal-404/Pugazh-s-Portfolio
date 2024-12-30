import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import dynamic from 'next/dynamic';

const AvatarExperience = dynamic(() => import('./AvatarExperience'), { ssr: false });

const Home = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {isMounted && <AvatarExperience />}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 bg-gray-900 bg-opacity-70 p-8 rounded-lg mt-16"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Pugazholi R
          </span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Frontend Developer | Blockchain Enthusiast | AI Researcher
        </motion.p>
        <motion.div
          className="flex justify-center space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a
            href="https://github.com/pugal-404"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/pugazholi-r-aa388426a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:Pugazhragu226@gmail.com"
            className="text-white hover:text-blue-400 transition-colors"
          >
            <Mail size={24} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;

