'use client'

import SectionTemplate from '@/components/SectionTemplate'

export default function LiaForetagPage() {
  const fields = [
    { label: 'Företagsnamn', name: 'name', type: 'text' as const, placeholder: 'Företagets namn' },
    { label: 'Storlek & verksamhet', name: 'description', type: 'textarea' as const, rows: 3, placeholder: 'Beskriv företagets storlek och verksamhet' },
    { label: 'Avdelningar', name: 'departments', type: 'textarea' as const, rows: 3, placeholder: 'Lista avdelningar' },
    { label: 'Din avdelning', name: 'myDepartment', type: 'text' as const, placeholder: 'Vilken avdelning arbetar du i?' },
    { label: 'Företagskultur', name: 'culture', type: 'textarea' as const, rows: 4, placeholder: 'Beskriv företagskulturen' },
    { label: 'Introduktionsprocess', name: 'intro', type: 'textarea' as const, rows: 3, placeholder: 'Hur var din introduktion?' }
  ]

  return (
    <SectionTemplate
      title="LIA-företaget"
      description="About your internship company"
      icon="building"
      storageKey="liaForetag"
      fields={fields}
      gradient="from-green-500 to-teal-500"
    />
  )
}
