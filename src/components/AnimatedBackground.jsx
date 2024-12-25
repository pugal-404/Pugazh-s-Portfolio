import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './AnimatedBackground.module.css';

const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [360, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.8]);

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.layer1}
        style={{ y: y1, rotate: rotate1, scale }}
      />
      <motion.div 
        className={styles.layer2}
        style={{ y: y2, rotate: rotate2, scale }}
      />
      <motion.div 
        className={styles.layer3}
        style={{ opacity }}
      />
    </div>
  );
};

export default AnimatedBackground;

