<template>
  <SectionCard id="content-showcase" :title="t('nav.contentShowcase')">
    <p>
      During the internship, a total of
      <span class="font-bold">76 content items across 14 content types</span> were delivered. The
      associated milestones covered the full publishing workflow, including copywriting, CMS layout,
      asset preparation, localization, feedback implementation, support content placement,
      finalization, and release.
    </p>
    <HeadingAnchor id="portal">{{ t('contentShowcase.portal') }}</HeadingAnchor>
    <p>
      A total of <span class="font-bold">21 articles</span> were delivered under direct ownership,
      alongside production support for other team members’ articles (supporting promoscreens,
      technical support, asset management, etc.).
    </p>
    <ContentCard anchor-id="anniversary-merch-discounts" title="Celebrate 16 Years With Special Merch Discounts!"
      :description="t('controls.viewLiveContent')" :links="contentLinks.anniversary"
      :header-image="publicAssetUrl('content/head/anniversary16_backgroung_shadow_2560x1440.jpg')">
      <p>
        The article was part of the
        <a href="https://worldoftanks.eu/en/news/general-news/wot-16-anniversary-august-2026/" target="_blank"
          rel="noopener noreferrer" class="link">World of Tanks’ Anniversary</a>
        campaign and highlighted the partner promo campaign. Page contained two general landing
        points, along with multiple buttons for inidividual products. The article demonstrated
        notably strong engagement, showing a total click rate of 169.1% and a CTR of 35.5%.
      </p>
    </ContentCard>
    <ContentCard anchor-id="weekly-sales-articles" :title="t('contentShowcase.sse')"
      :description="t('controls.viewLiveContent')" :links="contentLinks.weeklySales"
      :header-image="publicAssetUrl('content/head/type_59_tiger-maus_gsor_1010_fb_2560x1440.jpg')">
      <p>
        Two Weekly Sales articles were produced during the internship. These articles use updated
        templates, providing a more captivating sales flow, better user experience, and potentially
        increasing conversion rates.
      </p>
      <ContentSplitter id="sse-splitter" :before-src="publicAssetUrl('content/compare-sales.webp')"
        :after-src="publicAssetUrl('content/sales-type-59-tiger-maus-gsor-1010-fb.webp')" :before-width="1920"
        :before-height="8553" :after-width="1920" :after-height="8706" />
    </ContentCard>
    <ContentCard id="twitch-drops-guide" anchor-id="twitch-drops-guide-heading" title="Twitch Drops Guide Update"
      :description="t('controls.viewLiveContent')" :links="contentLinks.twitch"
      :header-image="publicAssetUrl('content/head/upd-twitch-guide-2560x1440-new.jpg')">
      <p>
        The Twitch Drops Guide was revised to align its content and visual structure with the
        updated standards for community guides. The refresh focused on improving the user experience
        by reorganizing the guide to make key information easier to find.
      </p>
      <ContentSplitter id="twitch-splitter" :before-src="publicAssetUrl('content/compare-twitch-old.webp')"
        :after-src="publicAssetUrl('content/compare-twitch.webp')" :before-width="1920" :before-height="10226"
        :after-width="1920" :after-height="5110" />
    </ContentCard>
    <ContentCard id="tiktok-drops-guide" anchor-id="tiktok-drops-guide-heading" title="TikTok Drops Guide"
      :description="t('controls.viewLiveContent')" :links="contentLinks.tikTok" :header-image="publicAssetUrl('content/head/tiktok-drops_asia_eu_esrb_pb__thumbnail_1920x1080.png')
        ">
      <p>
        Additionally, the TikTok Drops Guide was created as a new community resource to support
        players participating in social media campaigns on TikTok. Its purpose was to make both
        campaign instructions and participation requirements easy to understand and to direct users
        to the World of Tanks official TikTok account.
      </p>
    </ContentCard>

    <ContentCard anchor-id="wot-salute-reinforcements" :title="t('contentShowcase.salute')"
      :description="t('controls.viewLiveContent')" :links="contentLinks.salute" :header-image="publicAssetUrl('content/head/wot-salute-september-2026_rich_page_2560x1440.jpg')
        ">
      <p>
        The WoT Salute Program is an NA-exclusive campaign of honoring veterans and active military
        personnel in the United States and Canada. From June to September 2026, five iterations of
        the recurring WoT Salute article were produced, maintaining a consistent structure and
        visual identity while incorporating each month’s updated missions, rewards, and promotional
        assets. The work also included producing two supporting token promotions that helped direct
        eligible players to the program and its current benefits.
      </p>
      <p>
        The recurring format required careful content updates, asset management, CMS implementation,
        and coordination with stakeholders to ensure consistency, occasional updates, and timely
        publication across iterations.
      </p>
    </ContentCard>
    <ContentCard anchor-id="steam-articles" :title="t('contentShowcase.steam')"
      :description="t('controls.viewLiveContent')" :links="contentLinks.steam"
      :header-image="publicAssetUrl('content/head/steam-fx.jpg')">
      <p>{{ t('contentShowcase.steamText') }}</p>
    </ContentCard>
    <HeadingAnchor id="other-marketing-channels">
      {{ t('contentShowcase.otherContent') }}
    </HeadingAnchor>
    <ContentCard anchor-id="promo-screens" :title="t('contentShowcase.galleryTitle')"
      description="In-game optional promos for events, sales, special offers, and news">
      <p>{{ t('contentShowcase.galleryText') }}</p>
      <GalleryCard id="promo-screens-gallery" :assets="promoScreens" label="Promo screens" />
    </ContentCard>
    <ContentCard anchor-id="newsletters" title="Newsletters"
      description="Email, game launchers' galleries and notifications">
      <div v-auto-animate class="space-y-4">
        <UPageCard v-for="(newsletter, index) in newsletters" :key="newsletter.title" :title="newsletter.title"
          :description="newsletter.description" icon="i-lucide-mail" orientation="horizontal" :reverse="index === 1"
          variant="subtle"
          class="overflow-hidden border border-black/10 bg-white/50 dark:border-white/10 dark:bg-black/10"
          :ui="newsletterCardUi(index)">
          <template #title>
            <HeadingAnchor as="h4" :id="newsletter.id">{{ newsletter.title }}</HeadingAnchor>
          </template>
          <NewsletterPreview :src="newsletter.src" :alt="newsletter.alt" :width="newsletter.width"
            :height="newsletter.height" :class="index === 1 ? 'order-first' : 'order-last'" />
        </UPageCard>
      </div>
    </ContentCard>
  </SectionCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import ContentCard from '@/components/ContentCard.vue'
import ContentSplitter from '@/components/ContentSplitter.vue'
import GalleryCard from '@/components/GalleryCard.vue'
import HeadingAnchor from '@/components/HeadingAnchor.vue'
import NewsletterPreview from '@/components/NewsletterPreview.vue'
import SectionCard from '@/components/SectionCard.vue'
import { useStore } from '@/stores/store'

const { t } = useI18n()
const { contentLinks, promoScreens, newsletters: newsletterData } = useStore()
const publicAssetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const newsletters = computed(() =>
  newsletterData.map((newsletter) => ({
    ...newsletter,
    description: t(newsletter.descriptionKey),
  })),
)

const newsletterCardUi = (index: number) => ({
  container:
    index === 1
      ? 'p-0 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'
      : 'p-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]',
  wrapper: `p-5 sm:p-6 ${index === 1 ? 'order-last' : 'order-first'}`,
  leading: 'mb-4 rounded-lg bg-highlight/10 p-2.5 text-highlight',
  leadingIcon: 'size-6 text-highlight',
  title: 'text-lg text-highlighted',
  description: 'mt-2 text-base/7 text-toned',
})
</script>
