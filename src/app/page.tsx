'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaGraduationCap, FaChartLine, FaCalendarAlt, FaFilePdf } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold gradient-text">
          LIA Rapport
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
          Frontend Developer Internship Tracker
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Professional system for documenting and showcasing your 6-month LIA journey
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card-gradient section-card p-6 border border-purple-100"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-primary rounded-lg">
              <FaCalendarAlt className="text-3xl text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">6 Months</h3>
              <p className="text-gray-600">Internship Duration</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card-gradient section-card p-6 border border-blue-100"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-success rounded-lg">
              <FaChartLine className="text-3xl text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Track Progress</h3>
              <p className="text-gray-600">Daily & Weekly Logs</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card-gradient section-card p-6 border border-pink-100"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-secondary rounded-lg">
              <FaGraduationCap className="text-3xl text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Professional</h3>
              <p className="text-gray-600">Export to PDF</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <Link href={section.href}>
              <div className={`card-gradient section-card p-6 h-full border ${section.borderColor} cursor-pointer`}>
                <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${section.gradient} mb-4`}>
                  <section.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
                <p className="text-gray-600">{section.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Export Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center"
      >
        <Link href="/export">
          <button className="px-8 py-4 bg-gradient-primary text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3 mx-auto">
            <FaFilePdf className="text-2xl" />
            <span>Export Final Report</span>
          </button>
        </Link>
      </motion.div>
    </div>
  )
}

const sections = [
  {
    title: 'Sammanfattning',
    description: 'Summary of your LIA experience',
    href: '/sammanfattning',
    icon: FaGraduationCap,
    gradient: 'from-purple-500 to-indigo-500',
    borderColor: 'border-purple-100'
  },
  {
    title: 'Inledning',
    description: 'Introduction and expectations',
    href: '/inledning',
    icon: FaChartLine,
    gradient: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-100'
  },
  {
    title: 'LIA-företaget',
    description: 'About the company',
    href: '/lia-foretag',
    icon: FaCalendarAlt,
    gradient: 'from-green-500 to-teal-500',
    borderColor: 'border-green-100'
  },
  {
    title: 'Arbetsuppgifter',
    description: 'Work tasks and responsibilities',
    href: '/arbetsuppgifter',
    icon: FaChartLine,
    gradient: 'from-yellow-500 to-orange-500',
    borderColor: 'border-yellow-100'
  },
  {
    title: 'Projekt',
    description: 'Projects and achievements',
    href: '/projekt',
    icon: FaGraduationCap,
    gradient: 'from-pink-500 to-rose-500',
    borderColor: 'border-pink-100'
  },
  {
    title: 'Måluppfyllelse',
    description: 'Goal achievement tracking',
    href: '/maluppfyllelse',
    icon: FaChartLine,
    gradient: 'from-violet-500 to-purple-500',
    borderColor: 'border-violet-100'
  },
  {
    title: 'Diskussion & Slutsats',
    description: 'Discussion and conclusions',
    href: '/diskussion-slutsats',
    icon: FaCalendarAlt,
    gradient: 'from-red-500 to-pink-500',
    borderColor: 'border-red-100'
  },
  {
    title: 'Egen utveckling',
    description: 'Personal development',
    href: '/egen-utveckling',
    icon: FaGraduationCap,
    gradient: 'from-indigo-500 to-blue-500',
    borderColor: 'border-indigo-100'
  },
  {
    title: 'Dagliga Loggar',
    description: 'Daily logs and reflections',
    href: '/loggar/daglig',
    icon: FaCalendarAlt,
    gradient: 'from-teal-500 to-green-500',
    borderColor: 'border-teal-100'
  },
]
