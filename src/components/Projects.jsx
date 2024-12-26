import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projectsData = [
  {
    title: 'Penmind AI',
    date: 'Dec 2024 - Present',
    description: 'This project implements an advanced handwriting recognition system using machine learning techniques. It provides a web interface for users to upload images of handwritten text and receive digitized versions of the content.',
    features: [
      'Image upload for handwritten text recognition',
      'Real-time text recognition using a CNN-LSTM model and ensemble learning approach',
      'Export options for recognized text (TXT, DOCX, PDF)',
      'Responsive web interface built with React',
      'FastAPI backend for efficient processing',
      'Dockerized deployment for easy setup',
    ],
    skills: ['React.js', 'TensorFlow', 'FastAPI', 'Keras', 'Tailwind CSS'],
    links: {
      github: 'https://github.com/pugal-404/Penmind-AI',
      demo: '#' // Add demo link when available
    }
  },
  {
    title: 'Blockcertify',
    date: 'Jan 2024 - Jun 2024',
    description: 'Blockchain-based academic certificate verification system associated with SRM University.',
    features: [
      'Proficiency in decentralized blockchain platform such as Ethereum',
      'Knowledge of cryptographic techniques such as secure hashing algorithm',
      'Expertise in leveraging token standards for tokenizing and securing academic credentials',
      'Skilled in designing and deploying blockchain-based systems that ensure transparent, tamper-proof verification processes',
      'Enhancing trust and efficiency in academic credential management',
    ],
    skills: ['Blockchain', 'Tailwind CSS', 'CSS', 'Python', 'Flask', 'HTML5'],
    links: {
      github: '#', // Add GitHub link when available
      demo: '#' // Add demo link when available
    }
  },
];

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4"
      >
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 p-6 rounded-lg mb-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="text-gray-400">{project.date}</p>
              </div>
              <div className="flex gap-3">
                {project.links.github !== '#' && (
                  <motion.a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                )}
                {project.links.demo !== '#' && (
                  <motion.a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`View ${project.title} live demo`}
                  >
                    <ExternalLink className="w-6 h-6" />
                  </motion.a>
                )}
              </div>
            </div>
            <p className="mb-4">{project.description}</p>
            <h4 className="text-xl font-bold mb-2">Features:</h4>
            <ul className="list-disc list-inside mb-4 space-y-2">
              {project.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="text-gray-300">{feature}</li>
              ))}
            </ul>
            <h4 className="text-xl font-bold mb-2">Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="bg-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-600 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;

