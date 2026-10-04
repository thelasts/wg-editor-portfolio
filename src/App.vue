<template>
  <UApp :locale="uiLocale">
    <Header />
    <UPageCard as="main" variant="naked" spotlight spotlight-color="primary"
      class="main-bg [--spotlight-size:120px] pb-24 md:pb-0" :ui="mainCardUi">
      <SectionCard id="overview" :title="t('nav.overview')">
        <p>{{ t('intro.text') }}</p>
        <p class="font-bold pt-2">{{ t('intro.connect') }}</p>
        <HeadingAnchor id="contacts">{{ t('nav.contacts') }}</HeadingAnchor>
        <ContactMarquee />
      </SectionCard>
      <SectionCard id="content-showcase" :title="t('nav.contentShowcase')">
        <p>During the internship, a total of <span class="font-bold">76 content items across 14 content types</span>
          were
          delivered. The associated
          milestones covered the full publishing workflow, including copywriting, CMS layout, asset preparation,
          localization, feedback implementation, support content placement, finalization, and release.</p>
        <HeadingAnchor id="portal">{{ t('contentShowcase.portal') }}</HeadingAnchor>
        <p>A total of <span class="font-bold">21</span> articles were delivered under direct ownership, alongside
          production support for other team
          members’ articles (supporting promoscreens, technical support, asset management, etc.).</p>
        <ContentCard anchor-id="anniversary-merch-discounts" title="Celebrate 16 Years With Special Merch Discounts!"
          :description="t('controls.viewLiveContent')" :links="anniversaryLinks">
          <p>
            The article was part of the <a
              href="https://worldoftanks.eu/en/news/general-news/wot-16-anniversary-august-2026/" target="_blank"
              rel="noopener noreferrer" class="link">World
              of Tanks' Anniversary</a> campaign and highlighted the partner promo
            campaign. Page
            contained two general landing points, along with multiple buttons for inidividual products. The article
            demonstrated
            notably strong engagement, showing a total
            click rate of 169.1% and a unique-user CTR of 35.5%.
          </p>
        </ContentCard>
        <ContentCard anchor-id="weekly-sales-articles" :title="t('contentShowcase.sse')"
          :description="t('controls.viewLiveContent')" :links="sseLinks">
          <p>
            Two Special Sales Event (SSE) articles were produced during the internship.
            These articles use updated templates, providing a more captivating sales flow, better user
            experience, and potentially increasing conversion rates.
          </p>
          <ContentSplitter id="sse-splitter" :before-src="publicAssetUrl('content/compare-sales.webp')"
            :after-src="publicAssetUrl('content/sales-type-59-tiger-maus-gsor-1010-fb.webp')" :before-width="1920"
            :before-height="8553" :after-width="1920" :after-height="8706" />
        </ContentCard>
        <ContentCard id="twitch-drops-guide" anchor-id="twitch-drops-guide-heading" title="Twitch Drops Guide Update"
          :description="t('controls.viewLiveContent')" :links="twitchLinks">
          <p>The Twitch Drops Guide was revised to align its content and visual structure with the updated standards for
            portal pages. The refresh focused on improving the user experience by reorganizing the guide to <span
              class="font-bold">make key
              information</span>—such as participation requirements, account linking, campaign availability, and reward
            collection—<span class="font-bold">easier to find</span>.</p>
          <ContentSplitter id="twitch-splitter" :before-src="publicAssetUrl('content/compare-twitch-old.webp')"
            :after-src="publicAssetUrl('content/compare-twitch.webp')" :before-width="1920" :before-height="10226"
            :after-width="1920" :after-height="5110" />
        </ContentCard>
        <ContentCard id="tiktok-drops-guide" anchor-id="tiktok-drops-guide-heading" title="TikTok Drops Guide"
          :description="t('controls.viewLiveContent')" :links="tikTokLinks">
          <p>Additionally, the TikTok Drops Guide was created as a new community resource to support players
            participating
            in social media campaigns on TikTok. Its purpose was to make both campaign instructions and participation
            requirements easy to understand and to direct users to the World of Tanks official TikTok account.</p>
        </ContentCard>

        <ContentCard anchor-id="wot-salute-reinforcements" :title="t('contentShowcase.salute')"
          :description="t('controls.viewLiveContent')" :links="saluteLinks">
          <p>
            The WoT Salute Program is an NA-exclusive campaign of honoring veterans and active
            military personnel in the United States and Canada. From June to September 2026, five
            iterations of the recurring WoT Salute article were produced, maintaining a consistent
            structure and visual identity while incorporating each month's updated missions,
            rewards, and promotional assets. The work also included producing two supporting token
            promotions that helped direct eligible players to the program and its current benefits.
          </p>
          <p>
            The recurring format required careful content updates, asset management, CMS
            implementation, and coordination with stakeholders to ensure consistency, occasional
            updates, and timely publication across iterations.
          </p>
        </ContentCard>
        <ContentCard anchor-id="steam-articles" :title="t('contentShowcase.steam')"
          :description="t('controls.viewLiveContent')" :links="steamLinks">
          <p>{{ t('contentShowcase.steamText') }}</p>
        </ContentCard>
        <HeadingAnchor id="other-marketing-channels">{{ t('contentShowcase.otherContent') }}</HeadingAnchor>
        <ContentCard anchor-id="promo-screens" :title="t('contentShowcase.galleryTitle')">
          <p>{{ t('contentShowcase.galleryText') }}</p>
          <GalleryCard id="promo-screens-gallery" :assets="promoScreens" label="Promo screens" />
        </ContentCard>
        <ContentCard anchor-id="newsletters" title="Newsletters">
          <div class="space-y-4">
            <UPageCard v-for="(newsletter, index) in newsletterProjects" :key="newsletter.title"
              :title="newsletter.title" :description="newsletter.description" icon="i-lucide-mail"
              orientation="horizontal" :reverse="index === 1" variant="subtle"
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
      <SectionCard id="tools-developed" :title="t('nav.toolsDeveloped')">
        <HeadingAnchor id="asset-manager">Asset Manager</HeadingAnchor>
        <p><span class="font-bold">Asset Manager</span> is a Python desktop application with Tkinter GUI developed to
          improve the consistency of naming
          conventions for media assets used in content production.
        </p>
        <ul class="swords-list space-y-2 my-2">
          <li>Tool scans selected directory of assets,</li>
          <li>Matches them against user-defined tag sections,</li>
          <li>Generates standardized file names for review,</li>
          <li>Copies approved files while providing a summary file for quicker insert to the CMS.</li>
        </ul>
        <p>Addressing inconsistencies in asset naming supports increased
          productivity, safeguards against hectic asset-naming conventions, and a more reliable and efficient
          content-production workflow.</p>
        <ContentMedia id="assetmanager" :assets="[
          {
            type: 'image',
            src: publicAssetUrl('assetmanager.png'),
            width: 1919,
            height: 1032,
            alt: 'Asset Manager GUI screenshot.',
          }
        ]" description="Asset Manager desktop application interface." :focus="false" />
        <HeadingAnchor id="tank-tools">Tank Tools</HeadingAnchor>
        <p><span class="font-bold">Tank Tools</span> is a small project developed to simplify access to the
          internal
          vehicle
          encyclopedia and other
          frequently used reference data. It consists of two components:
        </p>
        <ul class="swords-list space-y-2 my-2">
          <li>Excel workbook containing an extract from Tankopedia, a list of oftenly used placeholders, the in-game
            glossary, and
            other resources used in content production.</li>
          <li>Encapsulated Python project to communicate with Wargaming API and extract Tankopedia data.</li>
        </ul>
        <HeadingAnchor id="widgets">Widgets</HeadingAnchor>
        <HeadingAnchor as="h3" id="faq-section">FAQ Section</HeadingAnchor>
        <p>
          FAQ widget was developed as part of the
          <a href="#twitch-drops-guide" class="link">Twitch
            Drops Community Guide's refresh</a>. The widget was designed as a reusable component for future portal
          content and has since been implemented across
          <a href="https://worldoftanks.eu/en/news/general-news/crucible-missions-2026/" target="_blank"
            rel="noopener noreferrer" class="link">
            different articles
            <UIcon name="i-lucide-external-link" class="size-3.5" aria-hidden="true" />
          </a>,
          demonstrating its value beyond the original use-case.
        </p>
        <ContentMedia id="custom-faq-media" :assets="[
          {
            type: 'video',
            src: publicAssetUrl('content/faq-basic.webm'),
            thumbnailSrc: publicAssetUrl('content/faq-basic_thumb.jpg'),
            alt: 'Custom FAQ in its desktop layout',
            width: 815,
            height: 715,
            revealed: true,
          },
          {
            type: 'video',
            src: publicAssetUrl('content/faq-mobile.webm'),
            thumbnailSrc: publicAssetUrl('content/faq-mobile_thumb.jpg'),
            alt: 'Custom FAQ in its mobile layout',
            width: 815,
            height: 715,
            revealed: false,
          },
        ]" :description="t('toolsDeveloped.faqMediaDescription')" />
        <HeadingAnchor as="h3" id="interactive-video-tutorial">Interactive Video Tutorial</HeadingAnchor>
        <p>
          This widget was developed for the
          <a href="#tiktok-drops-guide" class="link">TikTok
            Drops guide</a>. It enabled users
          to access step-by-step visual instructions directly within the page, reducing the need to navigate between
          multiple resources.
        </p>
        <ContentMedia id="video-tutorial-media" :assets="[
          {
            type: 'video',
            src: publicAssetUrl('content/video-tutorial.webm'),
            thumbnailSrc: publicAssetUrl('content/video-tutorial_thumb.jpg'),
            alt: 'Interactive step-by-step video tutorial for the TikTok Drops guide',
            width: 815,
            height: 715,
            revealed: false,
          },
        ]" :description="t('toolsDeveloped.videoTutorialMediaDescription')" />
      </SectionCard>
      <SectionCard id="skills" :title="t('nav.skills')">
        <SkillsColumns />
      </SectionCard>
    </UPageCard>
    <Footer />
  </UApp>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cs, en } from '@nuxt/ui/locale'
import { useI18n } from 'vue-i18n'

import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import ContentCard from '@/components/ContentCard.vue'
import SectionCard from '@/components/SectionCard.vue'
import ContentMedia from './components/ContentMedia.vue'
import GalleryCard from '@/components/GalleryCard.vue'
import NewsletterPreview from '@/components/NewsletterPreview.vue'
import SkillsColumns from '@/components/SkillsColumns.vue'
import ContactMarquee from '@/components/ContactMarquee.vue'

const { locale, t } = useI18n()
const uiLocale = computed(() => (locale.value === 'cs' ? cs : en))
const publicAssetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const mainCardUi = {
  root: 'block rounded-none',
  spotlight: 'bg-transparent',
  container: 'block gap-0 p-0 sm:p-0 lg:block',
}

const newsletterCardUi = (index: number) => ({
  container: index === 1
    ? 'p-0 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'
    : 'p-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]',
  wrapper: `p-5 sm:p-6 ${index === 1 ? 'order-last' : 'order-first'}`,
  leading: 'mb-4 rounded-lg bg-highlight/10 p-2.5 text-highlight',
  leadingIcon: 'size-6 text-highlight',
  title: 'text-lg text-highlighted',
  description: 'mt-2 text-base/7 text-toned',
})

const newsletterProjects = computed(() => [
  {
    id: 'battle-pass-reloaded-duke-nukem',
    title: 'Battle Pass Reloaded: Duke Nukem',
    description: t('contentShowcase.newsletters.dukeNukemDescription'),
    src: publicAssetUrl('email/mail-dukenukem.webp'),
    alt: 'Battle Pass Reloaded: Duke Nukem newsletter.',
    width: 588,
    height: 2170,
  },
  {
    id: 'battle-pass-special-far-cry',
    title: 'Battle Pass Special: Far Cry',
    description: t('contentShowcase.newsletters.farCryDescription'),
    src: publicAssetUrl('email/mail-farcry.webp'),
    alt: 'Battle Pass Special: Far Cry newsletter.',
    width: 582,
    height: 2250,
  },
])

const promoScreens = [
  {
    src: publicAssetUrl('promo/promo-BoosteroidStart-1jul2026-2026-09-22-14_08_10.webp'),
    alt: 'Boosteroid promo',
  },
  {
    src: publicAssetUrl('promo/promo-BP20-Push-30jul2026-2026-09-22-14_07_20.webp'),
    alt: 'Battle Pass promo, progress push',
  },
  {
    src: publicAssetUrl('promo/promo-BPSpecial-Bundles-27jul2026-2026-09-22-14_07_05.webp'),
    alt: 'Battle Pass special promo',
  },
  {
    src: publicAssetUrl('promo/promo-equalize-june-2026-ep1-2026-09-22-14_06_52.webp'),
    alt: 'Arcade Cabinet\'s Equalize promo',
  },
  {
    src: publicAssetUrl('promo/promo-Frontline261-3may2026-2026-09-22-14_07_29.webp'),
    alt: 'Frontline promo, intro (1/2)',
  },
  {
    src: publicAssetUrl('promo/promo-Frontline261-3may2026-2026-09-22-14_07_47.webp'),
    alt: 'Frontline promo, bundles (2/2)',
  },
  {
    src: publicAssetUrl('promo/promo-steel-hunter-june-2026-2026-09-22-14_03_43.webp'),
    alt: 'Steel Hunter promo',
  },
  // TODO 
  // {
  //   src: publicAssetUrl(
  //     'promo/promoscreens-draft-preview-PRMP-Halloween2026-14oct2026-150792-2026-09-23-09_58_23.webp',
  //   ),
  //   alt: 'Halloween promo, intro (1/2)',
  // },
  // {
  //   src: publicAssetUrl(
  //     'promo/promoscreens-draft-preview-PRMP-Halloween2026-14oct2026-150792-2026-09-23-09_58_36.webp',
  //   ),
  //   alt: 'Halloween promo, bundles (2/2)',
  // },
  {
    src: publicAssetUrl(
      'promo/promoscreens-internal-PRMP-BP20-LastCall-25aug2026-2026-09-23-02_53_08.webp',
    ),
    alt: 'Battle Pass promo, last call',
  },
]

const anniversaryLinks = [
  {
    label: 'Anniversary Merch Discounts',
    to: 'https://worldoftanks.eu/en/news/merchandise/fragstore-august-2026/',
  },
]

const sseLinks = [
  {
    label: 'Strv K, Kirovets-1 & Panther 8,8',
    to: 'https://worldoftanks.eu/en/news/specials/strv-k-kirovets-1-panther-mit-8-8-cm-may-2026/',
  },
  {
    label: 'Type 59, Tiger-Maus & GSOR 1010 FB',
    to: 'https://worldoftanks.eu/en/news/specials/type-59-tiger-maus-gsor-1010-fb-may-2026/',
  },
]

const twitchLinks = [
  {
    label: 'Twitch Drops Guide',
    to: 'https://worldoftanks.com/en/news/guides-reviews/twitch-drops-guide/',
  },
]

const tikTokLinks = [
  {
    label: 'TikTok Drops Guide',
    to: 'https://worldoftanks.com/en/news/guides-reviews/tiktok-drops-guide/',
  },
]

const saluteLinks = [
  {
    label: 'May',
    to: 'https://worldoftanks.com/en/news/specials/wot-salute-may-2026/',
  },
  {
    label: 'June',
    to: 'https://worldoftanks.com/en/news/specials/wot-salute-june-2026/',
  },
  {
    label: 'July',
    to: 'https://worldoftanks.com/en/news/specials/wot-salute-july-2026/',
  },
  {
    label: 'August',
    to: 'https://worldoftanks.com/en/news/specials/wot-salute-august-2026/',
  },
  {
    label: 'September',
    to: 'https://worldoftanks.com/en/news/specials/wot-salute-september-2026/',
  },
]

const steamLinks = [
  {
    label: 'Steel Hunter Relaunch',
    to: 'https://store.steampowered.com/news/app/1407200/view/685254577766793307?l=english',
  },
  {
    label: 'Upgraded Visuals/Sound v2.4',
    to: 'https://store.steampowered.com/news/app/1407200/view/692016318956699797?l=english',
  },
]
</script>
