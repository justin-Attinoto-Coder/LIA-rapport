'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSave, FaBuilding, FaBook, FaTasks } from 'react-icons/fa'

const iconMap: any = {
  book: FaBook,
  building: FaBuilding,
  tasks: FaTasks,
}

interface Field {
  label: string
  name: string
  type: 'text' | 'textarea'
  rows?: number
  placeholder?: string
}

interface SectionTemplateProps {
  title: string
  description: string
  icon: string
  storageKey: string
  fields: Field[]
  gradient: string
}

export default function SectionTemplate({
  title,
  description,
  icon,
  storageKey,
  fields,
  gradient
}: SectionTemplateProps) {
  const [data, setData] = useState<Record<string, string>>({})
  const IconComponent = iconMap[icon] || FaBook

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      setData(JSON.parse(saved))
    } else {
      const initial: Record<string, string> = {}
      fields.forEach(field => {
        initial[field.name] = ''
      })
      setData(initial)
    }
  }, [storageKey, fields])

  const handleSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(data))
    alert(`${title} sparad!`)
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
          <div className={`p-4 bg-gradient-to-br ${gradient} rounded-xl`}>
            <IconComponent className="text-4xl text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">{title}</h1>
            <p className="text-gray-600 mt-2">{description}</p>
          </div>
        </div>

        <div className="card-gradient section-card p-8 border border-purple-100 space-y-6">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  value={data[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  rows={field.rows || 4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              ) : (
                <input
                  type="text"
                  value={data[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              )}
            </div>
          ))}

          <button
            onClick={handleSave}
            className={`w-full py-4 bg-gradient-to-br ${gradient} text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3`}
          >
            <FaSave />
            <span>Spara {title}</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
