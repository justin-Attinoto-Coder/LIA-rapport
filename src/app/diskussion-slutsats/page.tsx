'use client'

import SectionTemplate from '@/components/SectionTemplate'

export default function DiskussionSlutsatsPage() {
  const fields = [
    { label: 'Diskussion', name: 'discussion', type: 'textarea' as const, rows: 6, placeholder: 'Hur uppfyllde LIA sitt syfte? Diskutera dina erfarenheter...' },
    { label: 'Lärdomar', name: 'learnings', type: 'textarea' as const, rows: 4, placeholder: 'Lista dina viktigaste lärdomar' },
    { label: 'Måluppfyllelse', name: 'goals', type: 'textarea' as const, rows: 4, placeholder: 'Hur nådde du dina mål?' },
    { label: 'Slutsats', name: 'conclusion', type: 'textarea' as const, rows: 5, placeholder: 'Skriv din slutsats' }
  ]

  return (
    <SectionTemplate
      title="Diskussion & Slutsats"
      description="Discussion and conclusions"
      icon="book"
      storageKey="diskussion"
      fields={fields}
      gradient="from-red-500 to-pink-500"
    />
  )
}
