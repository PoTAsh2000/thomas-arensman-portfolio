<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import MarqueeStrip from '@/components/MarqueeStrip.vue'
import AboutSection from '@/components/AboutSection.vue'
import CareerTimeline from '@/components/CareerTimeline.vue'
import TechStack from '@/components/TechStack.vue'
import InterestsSlider from '@/components/InterestsSlider.vue'
import MindLab from '@/components/MindLab.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import ContactFab from '@/components/ContactFab.vue'
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <MarqueeStrip />
    <AboutSection />
    <InterestsSlider />
    <CareerTimeline />
    <TechStack />
    <MindLab />
  </main>
  <SiteFooter />
  <ContactFab />
</template>
