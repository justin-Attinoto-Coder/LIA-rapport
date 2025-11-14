'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSave, FaBook } from 'react-icons/fa'

export default function SammanfattningPage() {
  const [data, setData] = useState({
    period: '',
    company: '',
    skills: '',
    tasks: '',
    challenges: '',
    solutions: '',
    achievements: '',
    learnings: ''
  })

  useEffect(() => {
    // Load saved data from localStorage
    const saved = localStorage.getItem('sammanfattning')
    if (saved) {
      setData(JSON.parse(saved))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('sammanfattning', JSON.stringify(data))
    alert('Sammanfattning sparad!')
  }

  const handleChange = (field: string, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-4 bg-gradient-primary rounded-xl">
            <FaBook className="text-4xl text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">Sammanfattning</h1>
            <p className="text-gray-600 mt-2">Summary of your LIA experience</p>
          </div>
        </div>

        <div className="card-gradient section-card p-8 border border-purple-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              LIA Period
            </label>
            <input
              type="text"
              value={data.period}
              onChange={(e) => handleChange('period', e.target.value)}
              placeholder="t.ex. 2024-01-15 till 2024-07-15"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Företag
            </label>
            <input
              type="text"
              value={data.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Företagsnamn"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nyckelkunskaper som stärktes
            </label>
            <textarea
              value={data.skills}
              onChange={(e) => handleChange('skills', e.target.value)}
              placeholder="Beskriv de viktigaste färdigheterna du utvecklade..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Huvudsakliga uppgifter och projekt
            </label>
            <textarea
              value={data.tasks}
              onChange={(e) => handleChange('tasks', e.target.value)}
              placeholder="Sammanfatta dina huvuduppgifter..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Utmaningar
            </label>
            <textarea
              value={data.challenges}
              onChange={(e) => handleChange('challenges', e.target.value)}
              placeholder="Vilka utmaningar mötte du?"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lösningar och metoder
            </label>
            <textarea
              value={data.solutions}
              onChange={(e) => handleChange('solutions', e.target.value)}
              placeholder="Hur löste du utmaningarna?"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Uppfyllda kursmål
            </label>
            <textarea
              value={data.achievements}
              onChange={(e) => handleChange('achievements', e.target.value)}
              placeholder="Vilka kursmål uppfyllde du?"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lärdomar (2-3 punkter)
            </label>
            <textarea
              value={data.learnings}
              onChange={(e) => handleChange('learnings', e.target.value)}
              placeholder="• Lärdom 1&#10;• Lärdom 2&#10;• Lärdom 3"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-4 bg-gradient-primary text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <FaSave />
            <span>Spara Sammanfattning</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
