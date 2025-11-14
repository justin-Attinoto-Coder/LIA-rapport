'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSave, FaCalendarWeek, FaPlus, FaTrash } from 'react-icons/fa'

interface WeeklyLog {
  id: string
  week: string
  summary: string
  achievements: string
  challenges: string
  nextWeek: string
}

export default function VeckovisLoggarPage() {
  const [logs, setLogs] = useState<WeeklyLog[]>([])
  const [currentLog, setCurrentLog] = useState<WeeklyLog>({
    id: '',
    week: '',
    summary: '',
    achievements: '',
    challenges: '',
    nextWeek: ''
  })

  useEffect(() => {
    const saved = localStorage.getItem('weeklyLogs')
    if (saved) {
      setLogs(JSON.parse(saved))
    }
  }, [])

  const handleSave = () => {
    const newLog = {
      ...currentLog,
      id: currentLog.id || Date.now().toString()
    }

    const updatedLogs = currentLog.id
      ? logs.map(log => log.id === currentLog.id ? newLog : log)
      : [...logs, newLog]

    setLogs(updatedLogs)
    localStorage.setItem('weeklyLogs', JSON.stringify(updatedLogs))

    setCurrentLog({
      id: '',
      week: '',
      summary: '',
      achievements: '',
      challenges: '',
      nextWeek: ''
    })

    alert('Veckologg sparad!')
  }

  const handleDelete = (id: string) => {
    if (confirm('Är du säker på att du vill ta bort denna veckologg?')) {
      const updatedLogs = logs.filter(log => log.id !== id)
      setLogs(updatedLogs)
      localStorage.setItem('weeklyLogs', JSON.stringify(updatedLogs))
    }
  }

  const handleEdit = (log: WeeklyLog) => {
    setCurrentLog(log)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-4 bg-gradient-warm rounded-xl">
            <FaCalendarWeek className="text-4xl text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">Veckologgar</h1>
            <p className="text-gray-600 mt-2">Veckovisa sammanfattningar av din LIA</p>
          </div>
        </div>

        <div className="card-gradient section-card p-8 border border-orange-100 space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <FaPlus />
            <span>{currentLog.id ? 'Redigera Veckologg' : 'Ny Veckologg'}</span>
          </h2>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Vecka
            </label>
            <input
              type="text"
              value={currentLog.week}
              onChange={(e) => setCurrentLog({ ...currentLog, week: e.target.value })}
              placeholder="t.ex. Vecka 1 (2024-01-15 - 2024-01-21)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sammanfattning av veckan
            </label>
            <textarea
              value={currentLog.summary}
              onChange={(e) => setCurrentLog({ ...currentLog, summary: e.target.value })}
              placeholder="Sammanfatta veckans händelser och aktiviteter..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Prestationer
            </label>
            <textarea
              value={currentLog.achievements}
              onChange={(e) => setCurrentLog({ ...currentLog, achievements: e.target.value })}
              placeholder="Vad åstadkom du denna vecka?"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Utmaningar
            </label>
            <textarea
              value={currentLog.challenges}
              onChange={(e) => setCurrentLog({ ...currentLog, challenges: e.target.value })}
              placeholder="Vilka utmaningar mötte du denna vecka?"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Planering för nästa vecka
            </label>
            <textarea
              value={currentLog.nextWeek}
              onChange={(e) => setCurrentLog({ ...currentLog, nextWeek: e.target.value })}
              placeholder="Vad ska du fokusera på nästa vecka?"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-4 bg-gradient-warm text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <FaSave />
            <span>{currentLog.id ? 'Uppdatera Veckologg' : 'Spara Veckologg'}</span>
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Tidigare Veckologgar ({logs.length})</h2>
          {logs.length === 0 ? (
            <div className="card-gradient section-card p-8 border border-gray-100 text-center">
              <p className="text-gray-500">Inga veckologgar än. Skapa din första veckologg ovan!</p>
            </div>
          ) : (
            logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-gradient section-card p-6 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{log.week}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(log)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Redigera
                    </button>
                    <button
                      onClick={() => handleDelete(log.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {log.summary && (
                    <div>
                      <h4 className="font-semibold text-gray-700">Sammanfattning:</h4>
                      <p className="text-gray-600 whitespace-pre-wrap">{log.summary}</p>
                    </div>
                  )}
                  {log.achievements && (
                    <div>
                      <h4 className="font-semibold text-gray-700">Prestationer:</h4>
                      <p className="text-gray-600 whitespace-pre-wrap">{log.achievements}</p>
                    </div>
                  )}
                  {log.challenges && (
                    <div>
                      <h4 className="font-semibold text-gray-700">Utmaningar:</h4>
                      <p className="text-gray-600 whitespace-pre-wrap">{log.challenges}</p>
                    </div>
                  )}
                  {log.nextWeek && (
                    <div>
                      <h4 className="font-semibold text-gray-700">Nästa vecka:</h4>
                      <p className="text-gray-600 whitespace-pre-wrap">{log.nextWeek}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  )
}
