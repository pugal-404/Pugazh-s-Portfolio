import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  { category: 'Blockchain', skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3.js', 'Truffle', 'Hardhat']},
  { category: 'Frontend Development', skills: ['React', 'Next.js', 'JavaScript', 'Tailwind CSS', 'Three.js'] },
  { category: 'Backend Development', skills: ['Node.js', 'Express', 'Python', 'Django', 'FastAPI'] },
  { category: 'Databases', skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'] },
  { category: 'DevOps & Tools', skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Agile Methodologies'] },
  { category: 'AI & Machine Learning', skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Natural Language Processing'] },
];

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-5xl mx-auto">
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
            >
              <h3 className="text-2xl font-bold mb-4">{category.category}</h3>
              <ul className="list-disc list-inside">
                {category.skills.map((skill) => (
                  <li key={skill} className="mb-2">{skill}</li>
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

