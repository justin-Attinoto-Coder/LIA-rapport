'use client'

import SectionTemplate from '@/components/SectionTemplate'

export default function EgenUtvecklingPage() {
  const fields = [
    { label: 'Nya färdigheter', name: 'newSkills', type: 'textarea' as const, rows: 4, placeholder: 'Lista nya färdigheter du utvecklat' },
    { label: 'Syn på yrkesrollen', name: 'roleView', type: 'textarea' as const, rows: 4, placeholder: 'Hur har din syn på yrkesrollen förändrats?' },
    { label: 'Dina styrkor', name: 'strengths', type: 'textarea' as const, rows: 3, placeholder: 'Vilka är dina styrkor?' },
    { label: 'Utvecklingsområden', name: 'development', type: 'textarea' as const, rows: 3, placeholder: 'Vad vill du utveckla vidare?' },
    { label: 'Framtida mål', name: 'future', type: 'textarea' as const, rows: 4, placeholder: 'Dina framtida karriärmål' }
  ]

  return (
    <SectionTemplate
      title="Egen utveckling"
      description="Your personal development"
      icon="book"
      storageKey="utveckling"
      fields={fields}
      gradient="from-indigo-500 to-blue-500"
    />
  )
}
