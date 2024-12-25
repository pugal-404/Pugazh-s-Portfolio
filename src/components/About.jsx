import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-8">About Me</h2>
        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
         I am a dedicated software developer with a robust foundation in Python programming, data analysis, and blockchain technology. I hold a Bachelor of Technology in Computer Science and Engineering from SRM Institute of Science and Technology, Chennai. My academic journey has equipped me with a solid understanding of software engineering principles, database management systems, and object-oriented programming. I am eager to apply my technical skills and continuously learn from experienced professionals in a dynamic environment.
        </motion.p>
        <motion.div
          className="bg-gray-800 p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-4">Education</h3>
          <p className="text-lg">
            Bachelor of Technology (B.Tech.) in Computer Science and Engineering<br />
            SRM Institute of Science and Technology, Chennai<br />
            September 2020 - October 2024
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;

