export const sectionDefinitions = [
  { id: 'overview', label: 'nav.overview', icon: 'i-lucide-house' },
  { id: 'content-showcase', label: 'nav.contentShowcase', icon: 'i-lucide-gallery-horizontal-end' },
  { id: 'tools-developed', label: 'nav.toolsDeveloped', icon: 'i-lucide-wrench' },
  { id: 'contacts', label: 'nav.contacts', icon: 'i-lucide-book-user' },
] as const

export type SectionId = (typeof sectionDefinitions)[number]['id']
