import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Code2, FolderGit2, BookOpen, GraduationCap, Mail } from 'lucide-react';

const Navigation = ({ currentSection, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'skills', icon: Code2, label: 'Skills' },
    { id: 'projects', icon: FolderGit2, label: 'Projects' },
    { id: 'publications', icon: BookOpen, label: 'Publications' },
    { id: 'learning', icon: GraduationCap, label: 'Learning' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
      <ul className="space-y-4">
        {navItems.map(({ id, icon: Icon, label }) => (
          <motion.li
            key={id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => onNavigate(id)}
              className={`icon-button group relative ${
                currentSection === id ? 'text-blue-400' : 'text-white'
              }`}
              aria-label={label}
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-black bg-opacity-80 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm">
                {label}
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;

