'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import AnimatedBackground from '../components/AnimatedBackground'
import Home from '../components/Home'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Publications from '../components/Publications'
import Learning from '../components/Learning'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Page() {
  const [currentSection, setCurrentSection] = useState('home')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const publicationsRef = useRef(null)
  const learningRef = useRef(null)
  const contactRef = useRef(null)

  const sectionRefs = useMemo(() => ({
    home: homeRef,
    about: aboutRef,
    skills: skillsRef,
    projects: projectsRef,
    publications: publicationsRef,
    learning: learningRef,
    contact: contactRef,
  }), [homeRef, aboutRef, skillsRef, projectsRef, publicationsRef, learningRef, contactRef])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const [section, ref] of Object.entries(sectionRefs)) {
        if (ref.current && ref.current.offsetTop <= scrollPosition && ref.current.offsetTop + ref.current.offsetHeight > scrollPosition) {
          setCurrentSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionRefs])

  const handleNavigation = (section) => {
    sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden">
      <AnimatedBackground />
      <Header />
      <Navigation currentSection={currentSection} onNavigate={handleNavigation} />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 transform-none z-50"
        style={{ scaleX }}
      />
      <main className="relative z-10 container mx-auto px-4 py-20 space-y-32 sm:space-y-40 md:space-y-48 lg:space-y-56">
        <section ref={homeRef} id="home"><Home /></section>
        <section ref={aboutRef} id="about"><About /></section>
        <section ref={skillsRef} id="skills"><Skills /></section>
        <section ref={projectsRef} id="projects"><Projects /></section>
        <section ref={publicationsRef} id="publications"><Publications /></section>
        <section ref={learningRef} id="learning"><Learning /></section>
        <section ref={contactRef} id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  )
}

