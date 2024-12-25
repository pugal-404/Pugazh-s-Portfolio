import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/pugazholi-r',
      label: 'GitHub Profile',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/pugazholi-r-aa388426a',
      label: 'LinkedIn Profile',
      color: 'hover:text-blue-400'
    },
    {
      icon: Mail,
      href: 'mailto:Pugazhragu226@gmail.com',
      label: 'Send Email',
      color: 'hover:text-green-400'
    }
  ];

  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm py-6 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Pugazholi R. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`text-gray-300 transition-colors ${social.color}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-6 h-6 sm:w-5 sm:h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

