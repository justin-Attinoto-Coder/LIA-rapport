'use client'

import SectionTemplate from '@/components/SectionTemplate'

export default function InledningPage() {
  const fields = [
    {
      label: 'Förväntningar',
      name: 'expectations',
      type: 'textarea' as const,
      rows: 4,
      placeholder: 'Vad förväntade du dig att lära dig?',
    },
    {
      label: 'Planerade mål',
      name: 'goals',
      type: 'textarea' as const,
      rows: 4,
      placeholder: 'Vilka mål satte du tillsammans med din handledare?',
    },
    {
      label: 'Koppling till kursplan',
      name: 'courseplan',
      type: 'textarea' as const,
      rows: 4,
      placeholder: 'Hur kopplar detta till dina lärandemål?',
    },
  ]

  return (
    <SectionTemplate
      title="Inledning"
      description="Introduction and your expectations"
      icon="book"
      storageKey="inledning"
      fields={fields}
      gradient="from-blue-500 to-cyan-500"
    />
  )
}
