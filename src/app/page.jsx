'use client'

import React, { useState, useEffect, useRef } from 'react'
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

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    publications: useRef(null),
    learning: useRef(null),
    contact: useRef(null),
  }

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
  }, [])

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
        <section ref={sectionRefs.home} id="home"><Home /></section>
        <section ref={sectionRefs.about} id="about"><About /></section>
        <section ref={sectionRefs.skills} id="skills"><Skills /></section>
        <section ref={sectionRefs.projects} id="projects"><Projects /></section>
        <section ref={sectionRefs.publications} id="publications"><Publications /></section>
        <section ref={sectionRefs.learning} id="learning"><Learning /></section>
        <section ref={sectionRefs.contact} id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  )
}

