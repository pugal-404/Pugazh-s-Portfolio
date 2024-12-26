import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  { category: 'Blockchain', skills: ['Ganache', 'Ethereum', 'Smart Contracts', 'Metamask']},
  { category: 'Frontend Development', skills: ['React.js', 'JavaScript','Three.js', 'Tailwind CSS','Bootstrap'] },
  { category: 'Backend Development', skills: ['Node.js', 'Express', 'Python', 'FastAPI'] },
  { category: 'Databases', skills: ['MySQL', 'SQL'] },
  { category: 'DevOps & Tools', skills: ['Git', 'Docker', 'AWS S3', 'CI/CD'] },
  { category: 'AI & Machine Learning', skills: ['Numpy', 'Pandas','TensorFlow', 'Scikit-learn', 'OpenCV'] },
];

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Skills & Technologies
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              className="bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-2xl font-bold mb-4">{category.category}</h3>
              <ul className="list-disc list-inside">
                {category.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    className="mb-2 cursor-pointer"
                    whileHover={{ scale: 1.05, color: "#3B82F6" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

