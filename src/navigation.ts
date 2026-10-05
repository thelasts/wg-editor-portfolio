export const sectionDefinitions = [
  { id: 'overview', label: 'nav.overview', icon: 'i-lucide-house' },
  {
    id: 'content-showcase-title',
    label: 'nav.contentShowcase',
    icon: 'i-lucide-gallery-horizontal-end',
    children: [
      {
        id: 'anniversary-merch-discounts',
        label: 'Celebrate 16 Years With Special Merch Discounts!',
        icon: 'i-lucide-file-text',
      },
      {
        id: 'weekly-sales-articles',
        label: 'contentShowcase.sse',
        translated: true,
        icon: 'i-lucide-file-text',
      },
      {
        id: 'twitch-drops-guide-heading',
        label: 'Twitch Drops Guide Update',
        icon: 'i-lucide-file-text',
      },
      {
        id: 'tiktok-drops-guide-heading',
        label: 'TikTok Drops Guide',
        icon: 'i-lucide-file-text',
      },
      {
        id: 'wot-salute-reinforcements',
        label: 'contentShowcase.salute',
        translated: true,
        icon: 'i-lucide-file-text',
      },
      {
        id: 'steam-articles',
        label: 'contentShowcase.steam',
        translated: true,
        icon: 'i-lucide-file-text',
      },
      {
        id: 'other-marketing-channels',
        label: 'contentShowcase.otherContent',
        translated: true,
        icon: 'i-lucide-rss',
      },
    ],
  },
  {
    id: 'tools-developed',
    label: 'nav.toolsDeveloped',
    icon: 'i-lucide-wrench',
    children: [
      { id: 'asset-manager', label: 'Asset Manager', icon: 'i-lucide-brush-cleaning' },
      { id: 'tank-tools', label: 'Tank Tools', icon: 'i-lucide-toolbox' },
      {
        id: 'widgets',
        label: 'Widgets',
        icon: 'i-lucide-layout-panel-left',
      },
    ],
  },
  { id: 'skills', label: 'nav.skills', icon: 'i-lucide-biceps-flexed' },
] as const

export type SectionId = (typeof sectionDefinitions)[number]['id']
