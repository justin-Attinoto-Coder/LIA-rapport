'use client'

import { motion } from 'framer-motion'
import { FaFilePdf, FaDownload, FaCheckCircle } from 'react-icons/fa'
import jsPDF from 'jspdf'

export default function ExportPage() {
  const generatePDF = () => {
    const doc = new jsPDF()
    let yPosition = 20

    // Professional color palette (RGB)
    const colors = {
      primary: [147, 51, 234] as [number, number, number],
      secondary: [236, 72, 153] as [number, number, number],
      accent: [59, 130, 246] as [number, number, number],
      success: [34, 197, 94] as [number, number, number],
      dark: [31, 41, 55] as [number, number, number],
      light: [249, 250, 251] as [number, number, number],
      text: [55, 65, 81] as [number, number, number],
    }

    // Helper: Add gradient rectangle (simplified)
    const addGradientRect = (x: number, y: number, w: number, h: number) => {
      doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
      doc.rect(x, y, w, h, 'F')
    }

    // Helper: Add decorative line
    const addDecorativeLine = (y: number) => {
      doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2])
      doc.setLineWidth(0.5)
      doc.line(20, y, 190, y)
    }

    // Helper: Add text with wrapping and auto-pagination
    const addText = (text: string, fontSize = 11, isBold = false, color = colors.text) => {
      doc.setFontSize(fontSize)
      doc.setFont('helvetica', isBold ? 'bold' : 'normal')
      doc.setTextColor(color[0], color[1], color[2])

      const lines = doc.splitTextToSize(text, 170)

      lines.forEach((line: string) => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 25
        }
        doc.text(line, 20, yPosition)
        yPosition += fontSize * 0.5 + 2
      })

      yPosition += 3
    }

    // Helper: Add section header with styling
    const addSectionHeader = (title: string) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 25
      }

      // Gradient background for header
      doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
      doc.roundedRect(15, yPosition - 8, 180, 12, 2, 2, 'F')

      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.text(title, 20, yPosition)

      yPosition += 15
      doc.setTextColor(colors.text[0], colors.text[1], colors.text[2])
    }

    // Helper: Add subsection
    const addSubsection = (title: string, content: string) => {
      if (!content || content.trim() === '') return

      if (yPosition > 260) {
        doc.addPage()
        yPosition = 25
      }

      // Subsection title with colored bullet
      doc.setFillColor(colors.accent[0], colors.accent[1], colors.accent[2])
      doc.circle(18, yPosition - 1.5, 1.5, 'F')

      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
      doc.text(title, 23, yPosition)
      yPosition += 8

      addText(content, 10)
      yPosition += 2
    }

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
    const weeklyLogs = JSON.parse(localStorage.getItem('weeklyLogs') || '[]')

    // ═══════════════════════════════════════════════════
    // TITLE PAGE - Modern & Professional
    // ═══════════════════════════════════════════════════

    // Gradient header banner
    addGradientRect(0, 0, 210, 80)

    // Main title
    doc.setFontSize(32)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(255, 255, 255)
    doc.text('LIA RAPPORT', 105, 35, { align: 'center' })

    // Subtitle
    doc.setFontSize(18)
    doc.setFont('helvetica', 'normal')
    doc.text('Frontend Developer', 105, 50, { align: 'center' })

    // Decorative line
    doc.setDrawColor(255, 255, 255)
    doc.setLineWidth(1)
    doc.line(40, 60, 170, 60)

    // Period and company info
    yPosition = 100
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2])

    if (sammanfattning.period) {
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('Period:', 105, yPosition, { align: 'center' })
      yPosition += 8
      doc.setFont('helvetica', 'normal')
      doc.text(sammanfattning.period, 105, yPosition, { align: 'center' })
      yPosition += 15
    }

    if (sammanfattning.company || liaForetag.name) {
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('Företag:', 105, yPosition, { align: 'center' })
      yPosition += 8
      doc.setFont('helvetica', 'normal')
      doc.text(sammanfattning.company || liaForetag.name || '', 105, yPosition, { align: 'center' })
      yPosition += 15
    }

    // Student info box
    doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2])
    doc.setLineWidth(1.5)
    doc.roundedRect(30, yPosition, 150, 30, 5, 5, 'S')

    doc.setFontSize(11)
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
    doc.text('Utbildning: Frontend Developer (YH)', 105, yPosition + 12, { align: 'center' })
    doc.text('LIA-period: 6 månader', 105, yPosition + 20, { align: 'center' })

    // Footer with page number
    doc.setFontSize(9)
    doc.setTextColor(150, 150, 150)
    doc.text('Sida 1', 105, 285, { align: 'center' })

    // ═══════════════════════════════════════════════════
    // SAMMANFATTNING
    // ═══════════════════════════════════════════════════

    doc.addPage()
    yPosition = 25

    addSectionHeader('SAMMANFATTNING')

    addSubsection('Nyckelkunskaper', sammanfattning.skills)
    addSubsection('Huvudsakliga uppgifter', sammanfattning.tasks)
    addSubsection('Viktigaste lärdomar', sammanfattning.learnings)

    // ═══════════════════════════════════════════════════
    // INLEDNING
    // ═══════════════════════════════════════════════════

    if (inledning.expectations || inledning.goals) {
      doc.addPage()
      yPosition = 25

      addSectionHeader('INLEDNING')

      addSubsection('Förväntningar', inledning.expectations)
      addSubsection('Mål', inledning.goals)
    }

    // ═══════════════════════════════════════════════════
    // LIA-FÖRETAGET
    // ═══════════════════════════════════════════════════

    if (Object.keys(liaForetag).length > 0) {
      doc.addPage()
      yPosition = 25

      addSectionHeader('LIA-FÖRETAGET')

      if (liaForetag.name) {
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2])
        doc.text(liaForetag.name, 20, yPosition)
        yPosition += 10
      }

      addSubsection('Beskrivning', liaForetag.description)
      addSubsection('Storlek & verksamhet', liaForetag.size)
      addSubsection('Min avdelning', liaForetag.department)
      addSubsection('Företagskultur', liaForetag.culture)
      addSubsection('Introduktionsprocess', liaForetag.introduction)
    }

    // ═══════════════════════════════════════════════════
    // ARBETSUPPGIFTER
    // ═══════════════════════════════════════════════════

    if (arbetsuppgifter.tasks) {
      doc.addPage()
      yPosition = 25

      addSectionHeader('ARBETSUPPGIFTER')

      addText(arbetsuppgifter.tasks, 10)
    }

    // ═══════════════════════════════════════════════════
    // PROJEKT
    // ═══════════════════════════════════════════════════

    if (projekt.name || projekt.description) {
      doc.addPage()
      yPosition = 25

      addSectionHeader('PROJEKT')

      if (projekt.name) {
        doc.setFontSize(13)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2])
        doc.text(projekt.name, 20, yPosition)
        yPosition += 10
      }

      addSubsection('Projektbeskrivning', projekt.description)
      addSubsection('Teknologier', projekt.technologies)
      addSubsection('Min roll', projekt.role)
      addSubsection('Resultat', projekt.results)
    }

    // ═══════════════════════════════════════════════════
    // VECKOLOGGAR (Summary)
    // ═══════════════════════════════════════════════════

    if (weeklyLogs.length > 0) {
      doc.addPage()
      yPosition = 25

      addSectionHeader('VECKOLOGGAR')

      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(colors.text[0], colors.text[1], colors.text[2])
      doc.text(`Totalt antal veckologgar: ${weeklyLogs.length}`, 20, yPosition)
      yPosition += 10

      weeklyLogs.slice(0, 8).forEach((log: any) => {
        if (yPosition > 250) {
          doc.addPage()
          yPosition = 25
        }

        // Week header
        doc.setFillColor(colors.light[0], colors.light[1], colors.light[2])
        doc.roundedRect(18, yPosition - 6, 174, 8, 1, 1, 'F')

        doc.setFontSize(11)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2])
        doc.text(log.week, 20, yPosition)
        yPosition += 10

        if (log.summary) {
          addText(log.summary.substring(0, 200) + (log.summary.length > 200 ? '...' : ''), 9)
        }

        yPosition += 5
      })
    }

    // ═══════════════════════════════════════════════════
    // MÅLUPPFYLLELSE
    // ═══════════════════════════════════════════════════

    if (maluppfyllelse.goals) {
      doc.addPage()
      yPosition = 25

      addSectionHeader('MÅLUPPFYLLELSE')

      addText(maluppfyllelse.goals, 10)
    }

    // ═══════════════════════════════════════════════════
    // DISKUSSION & SLUTSATS
    // ═══════════════════════════════════════════════════

    if (diskussion.discussion) {
      doc.addPage()
      yPosition = 25

      addSectionHeader('DISKUSSION & SLUTSATS')

      addText(diskussion.discussion, 10)
    }

    // ═══════════════════════════════════════════════════
    // EGEN UTVECKLING
    // ═══════════════════════════════════════════════════

    if (utveckling.development) {
      doc.addPage()
      yPosition = 25

      addSectionHeader('EGEN UTVECKLING')

      addText(utveckling.development, 10)
    }

    // Add page numbers to all pages (except first)
    const pageCount = doc.getNumberOfPages()
    for (let i = 2; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(9)
      doc.setTextColor(150, 150, 150)
      doc.text(`Sida ${i} av ${pageCount}`, 105, 285, { align: 'center' })
    }

    // Save PDF
    doc.save('LIA-Rapport-Professional.pdf')
    alert('✨ Professionell PDF-rapport genererad!')
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
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Skapa en professionell PDF med modern design och färggradients
            </p>
          </div>
        </div>

        <div className="card-gradient section-card p-8 border border-pink-100 dark:border-pink-900 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Din professionella rapport inkluderar:
            </h2>
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
                'Dagliga loggar (sammanfattning)',
              ].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300"
                >
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-500 p-4 rounded">
            <p className="text-sm text-purple-900 dark:text-purple-200">
              <strong>✨ Nytt!</strong> Din rapport har nu professionell design med färggradients,
              modern typografi och snygg layout. Perfekt för att visa upp dina framsteg!
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Tips:</strong> Se till att du har fyllt i alla sektioner innan du exporterar.
              Kontrollera särskilt att dina veckologgar och reflektioner är uppdaterade.
            </p>
          </div>{' '}
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
