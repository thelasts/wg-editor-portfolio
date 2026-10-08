<template>
  <SectionCard id="tools-developed" :title="t('nav.toolsDeveloped')">
    <HeadingAnchor id="asset-manager">Asset Manager</HeadingAnchor>
    <p>
      <span class="font-bold">Asset Manager</span> is a Python desktop application with Tkinter GUI
      developed to improve the consistency of naming conventions for media assets used in content
      production.
    </p>
    <ul class="swords-list my-2 space-y-2">
      <li>Tool scans selected directory of assets,</li>
      <li>Matches them against user-defined tag sections,</li>
      <li>Generates standardized file names for review,</li>
      <li>Copies approved files while providing a summary file for quicker insert to the CMS.</li>
    </ul>
    <p>
      Addressing inconsistencies in asset naming supports increased productivity, safeguards against
      hectic asset-naming conventions, and a more reliable and efficient content-production
      workflow.
    </p>
    <ContentMedia
      id="assetmanager"
      :assets="[
        {
          type: 'image',
          src: publicAssetUrl('assetmanager.png'),
          width: 1919,
          height: 1032,
          alt: 'Asset Manager GUI screenshot.',
        },
      ]"
      description="Asset Manager desktop application interface."
      :focus="false"
    />
    <HeadingAnchor id="tank-tools">Tank Tools</HeadingAnchor>
    <p>
      <span class="font-bold">Tank Tools</span> is a small project developed to simplify access to
      the internal vehicle encyclopedia and other frequently used reference data. It consists of two
      components:
    </p>
    <ul class="swords-list my-2 space-y-2">
      <li>
        Excel workbook containing an extract from Tankopedia, a list of oftenly used placeholders,
        the in-game glossary, and other resources used in content production.
      </li>
      <li>
        Encapsulated Python project to communicate with Wargaming API and extract Tankopedia data.
      </li>
    </ul>
    <HeadingAnchor id="widgets">Widgets</HeadingAnchor>
    <HeadingAnchor as="h3" id="faq-section">FAQ Section</HeadingAnchor>
    <p>
      FAQ widget was developed as part of the
      <a href="#twitch-drops-guide" class="link">Twitch Drops Community Guide’s refresh</a>. The
      widget was designed as a reusable component for future portal content and has since been
      implemented across
      <a
        href="https://worldoftanks.eu/en/news/general-news/crucible-missions-2026/"
        target="_blank"
        rel="noopener noreferrer"
        class="link"
      >
        different articles
        <UIcon name="i-lucide-external-link" class="size-3.5" aria-hidden="true" /> </a
      >, demonstrating its value beyond the original use-case.
    </p>
    <ContentMedia
      id="custom-faq-media"
      :assets="[
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
      ]"
      :description="t('toolsDeveloped.faqMediaDescription')"
    />
    <HeadingAnchor as="h3" id="interactive-video-tutorial"
      >Interactive Video Tutorial</HeadingAnchor
    >
    <p>
      This widget was developed for the
      <a href="#tiktok-drops-guide" class="link">TikTok Drops guide</a>. It enabled users to access
      step-by-step visual instructions directly within the page, reducing the need to navigate
      between multiple resources.
    </p>
    <ContentMedia
      id="video-tutorial-media"
      :assets="[
        {
          type: 'video',
          src: publicAssetUrl('content/video-tutorial.webm'),
          thumbnailSrc: publicAssetUrl('content/video-tutorial_thumb.jpg'),
          alt: 'Interactive step-by-step video tutorial for the TikTok Drops guide',
          width: 815,
          height: 715,
          revealed: false,
        },
      ]"
      :description="t('toolsDeveloped.videoTutorialMediaDescription')"
    />
  </SectionCard>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import ContentMedia from '@/components/ContentMedia.vue'
import HeadingAnchor from '@/components/HeadingAnchor.vue'
import SectionCard from '@/components/SectionCard.vue'

const { t } = useI18n()
const publicAssetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
</script>
