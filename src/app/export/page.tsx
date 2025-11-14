'use client'

import { motion } from 'framer-motion'
import { FaFilePdf, FaDownload, FaCheckCircle } from 'react-icons/fa'
import jsPDF from 'jspdf'

export default function ExportPage() {
  const generatePDF = () => {
    const doc = new jsPDF()
    let yPosition = 20

    // Helper function to add text with wrapping
    const addText = (text: string, fontSize = 12, isBold = false) => {
      doc.setFontSize(fontSize)
      if (isBold) {
        doc.setFont('helvetica', 'bold')
      } else {
        doc.setFont('helvetica', 'normal')
      }
      
      const lines = doc.splitTextToSize(text, 170)
      doc.text(lines, 20, yPosition)
      yPosition += (lines.length * fontSize * 0.5) + 5
      
      if (yPosition > 270) {
        doc.addPage()
        yPosition = 20
      }
    }

    // Title Page
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('LIA RAPPORT', 105, 40, { align: 'center' })
    
    doc.setFontSize(16)
    doc.setFont('helvetica', 'normal')
    doc.text('Frontend Developer', 105, 55, { align: 'center' })
    
    yPosition = 100

    // Get data from localStorage
    const sammanfattning = JSON.parse(localStorage.getItem('sammanfattning') || '{}')
    const inledning = JSON.parse(localStorage.getItem('inledning') || '{}')
    const liaForetag = JSON.parse(localStorage.getItem('liaForetag') || '{}')
    const arbetsuppgifter = JSON.parse(localStorage.getItem('arbetsuppgifter') || '{}')
    const projekt = JSON.parse(localStorage.getItem('projekt') || '{}')
    const maluppfyllelse = JSON.parse(localStorage.getItem('maluppfyllelse') || '{}')
    const diskussion = JSON.parse(localStorage.getItem('diskussion') || '{}')
    const utveckling = JSON.parse(localStorage.getItem('utveckling') || '{}')
    const dailyLogs = JSON.parse(localStorage.getItem('dailyLogs') || '[]')

    if (sammanfattning.period) {
      addText(`Period: ${sammanfattning.period}`, 12, false)
    }
    if (sammanfattning.company) {
      addText(`Företag: ${sammanfattning.company}`, 12, false)
    }

    doc.addPage()
    yPosition = 20

    // Sammanfattning
    addText('SAMMANFATTNING', 18, true)
    yPosition += 5
    if (sammanfattning.skills) {
      addText('Nyckelkunskaper:', 14, true)
      addText(sammanfattning.skills, 11, false)
    }
    if (sammanfattning.tasks) {
      addText('Uppgifter:', 14, true)
      addText(sammanfattning.tasks, 11, false)
    }
    if (sammanfattning.learnings) {
      addText('Lärdomar:', 14, true)
      addText(sammanfattning.learnings, 11, false)
    }

    // Inledning
    doc.addPage()
    yPosition = 20
    addText('INLEDNING', 18, true)
    yPosition += 5
    if (inledning.expectations) {
      addText('Förväntningar:', 14, true)
      addText(inledning.expectations, 11, false)
    }
    if (inledning.goals) {
      addText('Mål:', 14, true)
      addText(inledning.goals, 11, false)
    }

    // LIA-företaget
    doc.addPage()
    yPosition = 20
    addText('LIA-FÖRETAGET', 18, true)
    yPosition += 5
    if (liaForetag.name) {
      addText(`Företag: ${liaForetag.name}`, 12, false)
    }
    if (liaForetag.description) {
      addText('Beskrivning:', 14, true)
      addText(liaForetag.description, 11, false)
    }

    // Arbetsuppgifter
    doc.addPage()
    yPosition = 20
    addText('ARBETSUPPGIFTER', 18, true)
    yPosition += 5
    if (arbetsuppgifter.tasks) {
      addText(arbetsuppgifter.tasks, 11, false)
    }

    // Projekt
    doc.addPage()
    yPosition = 20
    addText('PROJEKT', 18, true)
    yPosition += 5
    if (projekt.name) {
      addText(`Projektnamn: ${projekt.name}`, 14, true)
    }
    if (projekt.description) {
      addText(projekt.description, 11, false)
    }

    // Daily Logs Summary
    if (dailyLogs.length > 0) {
      doc.addPage()
      yPosition = 20
      addText('DAGLIGA LOGGAR SAMMANFATTNING', 18, true)
      yPosition += 5
      addText(`Totalt antal loggar: ${dailyLogs.length}`, 12, false)
      yPosition += 5

      dailyLogs.slice(0, 10).forEach((log: any) => {
        addText(`${log.date}`, 12, true)
        if (log.tasks) {
          addText(log.tasks.substring(0, 200) + '...', 10, false)
        }
        yPosition += 3
      })
    }

    // Slutsats
    doc.addPage()
    yPosition = 20
    addText('DISKUSSION OCH SLUTSATS', 18, true)
    yPosition += 5
    if (diskussion.discussion) {
      addText(diskussion.discussion, 11, false)
    }

    // Save PDF
    doc.save('LIA-Rapport.pdf')
    alert('PDF genererad!')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-4 bg-gradient-secondary rounded-xl">
            <FaFilePdf className="text-4xl text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">Exportera Rapport</h1>
            <p className="text-gray-600 mt-2">Skapa en professionell PDF-rapport</p>
          </div>
        </div>

        <div className="card-gradient section-card p-8 border border-pink-100 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Din rapport inkluderar:</h2>
            <ul className="space-y-3">
              {[
                'Sammanfattning',
                'Inledning och förväntningar',
                'LIA-företaget',
                'Arbetsuppgifter och ansvar',
                'Projekt och prestationer',
                'Måluppfyllelse',
                'Diskussion och slutsats',
                'Egen utveckling',
                'Dagliga loggar (sammanfattning)'
              ].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-3 text-gray-700"
                >
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-800">
              <strong>Tips:</strong> Se till att du har fyllt i alla sektioner innan du exporterar. 
              Kontrollera särskilt att dina dagliga loggar och reflektioner är uppdaterade.
            </p>
          </div>

          <button
            onClick={generatePDF}
            className="w-full py-4 bg-gradient-secondary text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <FaDownload className="text-2xl" />
            <span>Generera PDF-Rapport</span>
          </button>

          <div className="text-center text-sm text-gray-500">
            <p>Rapporten kommer att laddas ner som LIA-Rapport.pdf</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
