'use client'

import SectionTemplate from '@/components/SectionTemplate'

export default function MaluppfyllelsePage() {
  const fields = [
    { label: 'Kursmål 1', name: 'goal1', type: 'textarea' as const, rows: 3, placeholder: 'Kursmål och hur du uppfyllde det' },
    { label: 'Kursmål 2', name: 'goal2', type: 'textarea' as const, rows: 3, placeholder: 'Kursmål och hur du uppfyllde det' },
    { label: 'Kursmål 3', name: 'goal3', type: 'textarea' as const, rows: 3, placeholder: 'Kursmål och hur du uppfyllde det' },
    { label: 'Kursmål 4', name: 'goal4', type: 'textarea' as const, rows: 3, placeholder: 'Kursmål och hur du uppfyllde det' },
    { label: 'Övergripande reflektion', name: 'overall', type: 'textarea' as const, rows: 4, placeholder: 'Övergripande reflektion kring måluppfyllelse' }
  ]

  return (
    <SectionTemplate
      title="Måluppfyllelse"
      description="Goal achievement tracking"
      icon="tasks"
      storageKey="maluppfyllelse"
      fields={fields}
      gradient="from-violet-500 to-purple-500"
    />
  )
}
