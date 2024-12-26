import React from 'react';
import { motion } from 'framer-motion';

const Learning = () => {
  const learningItems = [
    {
      title: "VR/AR/MR/XR Training",
      description: "One-month in-office training at Bala Aatral Solutions Pvt. Ltd.",
    },
    {
      title: "Unity Engine Skills",
      description: "Gained foundational Unity Engine skills for game development and metaverse applications.",
    },
    {
      title: "Immersive Experiences",
      description: "Cultivated practical skills in creating immersive virtual reality experiences.",
    },
  ];

  return (
    <section id="learning" className="min-h-screen flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Skills Enhancement & Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-sm md:text-base">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Learning;

