<template>
  <UApp :locale="uiLocale">
    <Header />
    <main class="main-bg pb-24 md:pb-0">
      <SectionCard id="home" :title="t('intro.title')">
        <p>{{ t('intro.text') }}</p>
      </SectionCard>
      <SectionCard id="overview" :title="t('nav.overview')" />
      <SectionCard id="content-showcase" :title="t('nav.contentShowcase')">
        <h2>{{ t('contentShowcase.portal') }}</h2>
        <ContentCard title="Celebrate 16 Years With Special Merch Discounts!"
          :description="t('controls.viewLiveContent')" :links="anniversaryLinks">
          <p>
            The article was part of the <a href="https://worldoftanks.eu/en/news/general-news/crucible-missions-2026/"
              target="_blank" rel="noopener noreferrer" class="link">World
              of Tanks' Anniversary</a> campaign and highlighted the partner promo
            campaign. Page
            contained two general landing points, along with buttons for inidividual products. The article demonstrated
            notably strong engagement, showing a total
            click rate of 169.1% and a unique-user CTR of 35.5%.
          </p>
        </ContentCard>
        <ContentCard :title="t('contentShowcase.sse')" :description="t('controls.viewLiveContent')" :links="sseLinks">
          <p>
            Two Special Sales Event (SSE) articles were produced during the internship.
            These articles use updated templates, providing a more captivating sales flow, better user
            experience, and potentially increasing conversion rates.
          </p>
          <ContentSplitter id="sse-splitter" before-src="/content/compare-sales.png"
            after-src="/content/sales-type-59-tiger-maus-gsor-1010-fb.png" />
        </ContentCard>
        <ContentCard id="twitch-drops-guide" title="Twitch Drops Guide Update"
          :description="t('controls.viewLiveContent')" :links="twitchLinks">
          <p>The Twitch Drops Guide was revised to align its content and visual structure with the updated standards for
            portal pages. The refresh focused on improving the user experience by reorganizing the guide to make key
            information—such as participation requirements, account linking, campaign availability, and reward
            collection—easier to find.</p>
          <ContentSplitter id="twitch-splitter" before-src="/content/compare-twitch-old.png"
            after-src="/content/compare-twitch.png" />
        </ContentCard>
        <ContentCard id="tiktok-drops-guide" title="TikTok Drops Guide" :description="t('controls.viewLiveContent')"
          :links="tikTokLinks">
          <p>Additionally, the TikTok Drops Guide was created as a new community resource to support players
            participating
            in social media campaigns on TikTok. Its purpose was to make both campaign instructions and participation
            requirements easy to understand and to direct users to the World of Tanks official TikTok account.</p>
        </ContentCard>

        <ContentCard :title="t('contentShowcase.salute')" :description="t('controls.viewLiveContent')"
          :links="saluteLinks">
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
        <ContentCard :title="t('contentShowcase.steam')" :description="t('controls.viewLiveContent')"
          :links="steamLinks">
          <p>{{ t('contentShowcase.steamText') }}</p>
        </ContentCard>
        <h2>{{ t('contentShowcase.otherContent') }}</h2>
        <ContentCard :title="t('contentShowcase.galleryTitle')">
          <p>{{ t('contentShowcase.galleryText') }}</p>
        </ContentCard>
        <ContentCard title="Newsletters" />
      </SectionCard>
      <SectionCard id="tools-developed" :title="t('nav.toolsDeveloped')">
        <h2>Asset Manager</h2>
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
        <h2>Tank Tools</h2>
        <p><span class="font-bold">Tank Tools</span> is a small project developed to simplify access to the
          internal
          vehicle
          encyclopedia and other
          frequently used reference data. It consists of two components:
        </p>
        <ul class="swords-list space-y-2 my-2">
          <li>Excel workbook containing an extract from Tankopedia, a list of placeholders, the in-game glossary, and
            other resources used in content production.</li>
          <li>Encapsulated Python project to communicate with Wargaming API and extract Tankopedia data.</li>
        </ul>
        <h2>Widgets</h2>
        <h3>FAQ Section</h3>
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
          { src: '/content/faq-basic.gif', alt: 'Custom FAQ in its desktop layout' },
          { src: '/content/faq-mobile.gif', alt: 'Custom FAQ in its mobile layout' },
        ]" description="Custom FAQ shown in desktop and mobile layouts." />
        <h3>Interactive Video Tutorial</h3>
        <p>
          This widget was developed for the
          <a href="#tiktok-drops-guide" class="link">TikTok
            Drops guide</a>. It enabled users
          to access step-by-step visual instructions directly within the page, reducing the need to navigate between
          multiple resources.
        </p>
        <ContentMedia id="video-tutorial-media" :assets="[
          {
            src: '/content/video-tutorial.gif',
            alt: 'Interactive step-by-step video tutorial for the TikTok Drops guide',
          },
        ]" description="Interactive step-by-step video tutorial for the TikTok Drops guide." />
      </SectionCard>
      <SectionCard id="skills" :title="t('nav.skills')" />
      <SectionCard id="contacts" :title="t('nav.contacts')" />
    </main>
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

const { locale, t } = useI18n()
const uiLocale = computed(() => (locale.value === 'cs' ? cs : en))

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
