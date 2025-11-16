'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBook,
  FaBuilding,
  FaTasks,
  FaProjectDiagram,
  FaBullseye,
  FaComments,
  FaUserGraduate,
  FaCalendarDay,
  FaCalendarWeek,
  FaFilePdf,
  FaMoon,
  FaSun,
} from 'react-icons/fa'
import { useTheme } from '@/contexts/ThemeContext'

const navItems = [
  { name: 'Hem', href: '/', icon: FaHome },
  { name: 'Sammanfattning', href: '/sammanfattning', icon: FaBook },
  { name: 'Inledning', href: '/inledning', icon: FaBook },
  { name: 'LIA-företaget', href: '/lia-foretag', icon: FaBuilding },
  { name: 'Arbetsuppgifter', href: '/arbetsuppgifter', icon: FaTasks },
  { name: 'Projekt', href: '/projekt', icon: FaProjectDiagram },
  { name: 'Måluppfyllelse', href: '/maluppfyllelse', icon: FaBullseye },
  { name: 'Diskussion & Slutsats', href: '/diskussion-slutsats', icon: FaComments },
  { name: 'Egen utveckling', href: '/egen-utveckling', icon: FaUserGraduate },
  { name: 'Dagliga Loggar', href: '/loggar/daglig', icon: FaCalendarDay },
  { name: 'Veckologgar', href: '/loggar/veckovis', icon: FaCalendarWeek },
  { name: 'Exportera Rapport', href: '/export', icon: FaFilePdf },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <FaBook className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold gradient-text hidden md:inline">LIA Rapport</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  pathname === item.href
                    ? 'bg-gradient-primary text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="relative group">
              <button className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-200">
                Mer ▾
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {navItems.slice(6).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex px-4 py-3 text-sm font-medium hover:bg-purple-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors items-center space-x-2 ${
                      pathname === item.href
                        ? 'bg-purple-100 dark:bg-gray-700 text-purple-700 dark:text-purple-300'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
              aria-label="Toggle dark mode"
            >
              {mounted && theme === 'dark' ? (
                <>
                  <FaSun className="text-lg" />
                  <span className="text-sm font-medium hidden md:inline">Light</span>
                </>
              ) : (
                <>
                  <FaMoon className="text-lg" />
                  <span className="text-sm font-medium hidden md:inline">Dark</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Menu Button & Dark Mode Toggle (Mobile Only) */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
              aria-label="Toggle dark mode"
            >
              {mounted && theme === 'dark' ? (
                <>
                  <FaSun className="text-lg" />
                  <span className="text-sm font-medium">Light</span>
                </>
              ) : (
                <>
                  <FaMoon className="text-lg" />
                  <span className="text-sm font-medium">Dark</span>
                </>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
            >
              {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300"
          >
            <div className="container mx-auto px-4 py-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 items-center space-x-3 ${
                    pathname === item.href
                      ? 'bg-gradient-primary text-white shadow-md'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="text-lg" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
