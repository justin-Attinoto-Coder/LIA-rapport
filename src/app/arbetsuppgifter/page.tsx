'use client'

import SectionTemplate from '@/components/SectionTemplate'

export default function ArbetsuppgifterPage() {
  const fields = [
    { label: 'Huvuduppgifter', name: 'tasks', type: 'textarea' as const, rows: 5, placeholder: 'Beskriv dina huvudsakliga arbetsuppgifter...' },
    { label: 'Tekniker & verktyg', name: 'tools', type: 'textarea' as const, rows: 4, placeholder: 'Vilka tekniker och verktyg använde du?' },
    { label: 'Reflektion', name: 'reflection', type: 'textarea' as const, rows: 4, placeholder: 'Hur tillämpade du teori i praktiken?' },
    { label: 'Förbättringsförslag', name: 'improvements', type: 'textarea' as const, rows: 3, placeholder: 'Idéer för förbättringar' }
  ]

  return (
    <SectionTemplate
      title="Arbetsuppgifter"
      description="Your work tasks and responsibilities"
      icon="tasks"
      storageKey="arbetsuppgifter"
      fields={fields}
      gradient="from-yellow-500 to-orange-500"
    />
  )
}
