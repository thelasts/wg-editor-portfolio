import { reactive, readonly } from 'vue'

import portfolio from '@/data/portfolio.json'

function publicAssetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

const state = reactive({
  contentLinks: portfolio.contentLinks,
  contacts: portfolio.contacts,
  promoScreens: portfolio.promoScreens.map((asset) => ({
    ...asset,
    src: publicAssetUrl(asset.src),
  })),
  newsletters: portfolio.newsletters.map((newsletter) => ({
    ...newsletter,
    src: publicAssetUrl(newsletter.src),
  })),
  skills: portfolio.skills.map((skill) => ({
    ...skill,
    image: skill.image
      ? {
          ...skill.image,
          src: publicAssetUrl(skill.image.src),
        }
      : undefined,
  })),
})

export const store = readonly(state)

export function useStore() {
  return store
}
