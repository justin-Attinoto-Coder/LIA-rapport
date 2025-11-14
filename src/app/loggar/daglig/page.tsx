'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSave, FaCalendarDay, FaPlus, FaTrash, FaImage } from 'react-icons/fa'
import { format } from 'date-fns'

interface DailyLog {
  id: string
  date: string
  tasks: string
  reflections: string
  learnings: string
  challenges: string
  images: string[]
}

export default function DagligLoggarPage() {
  const [logs, setLogs] = useState<DailyLog[]>([])
  const [currentLog, setCurrentLog] = useState<DailyLog>({
    id: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    tasks: '',
    reflections: '',
    learnings: '',
    challenges: '',
    images: []
  })

  useEffect(() => {
    const saved = localStorage.getItem('dailyLogs')
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
    localStorage.setItem('dailyLogs', JSON.stringify(updatedLogs))

    setCurrentLog({
      id: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      tasks: '',
      reflections: '',
      learnings: '',
      challenges: '',
      images: []
    })

    alert('Daglig logg sparad!')
  }

  const handleDelete = (id: string) => {
    if (confirm('Är du säker på att du vill ta bort denna logg?')) {
      const updatedLogs = logs.filter(log => log.id !== id)
      setLogs(updatedLogs)
      localStorage.setItem('dailyLogs', JSON.stringify(updatedLogs))
    }
  }

  const handleEdit = (log: DailyLog) => {
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
          <div className="p-4 bg-gradient-success rounded-xl">
            <FaCalendarDay className="text-4xl text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">Dagliga Loggar</h1>
            <p className="text-gray-600 mt-2">Dokumentera dina dagliga aktiviteter och lärdomar</p>
          </div>
        </div>

        {/* Input Form */}
        <div className="card-gradient section-card p-8 border border-blue-100 space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <FaPlus />
            <span>{currentLog.id ? 'Redigera Logg' : 'Ny Daglig Logg'}</span>
          </h2>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Datum
            </label>
            <input
              type="date"
              value={currentLog.date}
              onChange={(e) => setCurrentLog({ ...currentLog, date: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dagens uppgifter
            </label>
            <textarea
              value={currentLog.tasks}
              onChange={(e) => setCurrentLog({ ...currentLog, tasks: e.target.value })}
              placeholder="Beskriv vad du arbetade med idag..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Reflektioner
            </label>
            <textarea
              value={currentLog.reflections}
              onChange={(e) => setCurrentLog({ ...currentLog, reflections: e.target.value })}
              placeholder="Vad tyckte du om dagens arbete?"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lärdomar
            </label>
            <textarea
              value={currentLog.learnings}
              onChange={(e) => setCurrentLog({ ...currentLog, learnings: e.target.value })}
              placeholder="Vad lärde du dig idag?"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Utmaningar
            </label>
            <textarea
              value={currentLog.challenges}
              onChange={(e) => setCurrentLog({ ...currentLog, challenges: e.target.value })}
              placeholder="Vilka utmaningar mötte du?"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-4 bg-gradient-success text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <FaSave />
            <span>{currentLog.id ? 'Uppdatera Logg' : 'Spara Logg'}</span>
          </button>
        </div>

        {/* Logs List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Tidigare Loggar ({logs.length})</h2>
          {logs.length === 0 ? (
            <div className="card-gradient section-card p-8 border border-gray-100 text-center">
              <p className="text-gray-500">Inga loggar än. Skapa din första logg ovan!</p>
            </div>
          ) : (
            logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-gradient section-card p-6 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{log.date}</h3>
                    <p className="text-sm text-gray-500">{format(new Date(log.date), 'EEEE, d MMMM yyyy')}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(log)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
                  {log.tasks && (
                    <div>
                      <h4 className="font-semibold text-gray-700">Uppgifter:</h4>
                      <p className="text-gray-600 whitespace-pre-wrap">{log.tasks}</p>
                    </div>
                  )}
                  {log.learnings && (
                    <div>
                      <h4 className="font-semibold text-gray-700">Lärdomar:</h4>
                      <p className="text-gray-600 whitespace-pre-wrap">{log.learnings}</p>
                    </div>
                  )}
                  {log.challenges && (
                    <div>
                      <h4 className="font-semibold text-gray-700">Utmaningar:</h4>
                      <p className="text-gray-600 whitespace-pre-wrap">{log.challenges}</p>
                    </div>
                  )}
                  {log.reflections && (
                    <div>
                      <h4 className="font-semibold text-gray-700">Reflektioner:</h4>
                      <p className="text-gray-600 whitespace-pre-wrap">{log.reflections}</p>
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
