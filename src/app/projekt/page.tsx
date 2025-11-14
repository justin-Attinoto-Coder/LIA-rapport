'use client'

import SectionTemplate from '@/components/SectionTemplate'

export default function ProjektPage() {
  const fields = [
    { label: 'Projektnamn', name: 'name', type: 'text' as const, placeholder: 'Namnet på projektet' },
    { label: 'Beskrivning', name: 'description', type: 'textarea' as const, rows: 4, placeholder: 'Beskriv projektet i detalj' },
    { label: 'Metodik', name: 'methodology', type: 'textarea' as const, rows: 3, placeholder: 'SCRUM, Agile, etc.' },
    { label: 'Din roll', name: 'role', type: 'text' as const, placeholder: 'Din roll i projektet' },
    { label: 'Teknologier', name: 'technologies', type: 'textarea' as const, rows: 3, placeholder: 'Vilka teknologier användes?' },
    { label: 'Resultat', name: 'results', type: 'textarea' as const, rows: 4, placeholder: 'Vad blev resultatet?' },
    { label: 'Lärdomar', name: 'learnings', type: 'textarea' as const, rows: 4, placeholder: 'Vad lärde du dig från projektet?' }
  ]

  return (
    <SectionTemplate
      title="Projekt"
      description="Projects and achievements"
      icon="tasks"
      storageKey="projekt"
      fields={fields}
      gradient="from-pink-500 to-rose-500"
    />
  )
}
