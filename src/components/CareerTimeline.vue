<script setup lang="ts">
import { ref } from 'vue'
import SectionShell from '@/components/SectionShell.vue'

type EntryType = 'work' | 'education' | 'internship' | 'origin'

interface Entry {
  id: string
  period: string
  title: string
  type: EntryType
  summary: string
  details: string[]
  tech?: string[]
}

const entries: Entry[] = [
  {
    id: 'integration',
    period: 'Present',
    title: 'Data Integration Specialist',
    type: 'work',
    summary:
      'Designing and building scalable, failure-proof integrations for logistics, e-commerce and healthcare.',
    details: [
      'Connecting companies over a diverse set of protocols',
      'Technical & functional designs, direct customer alignment',
      'Migrating legacy codebases to modern stacks',
    ],
    tech: [],
  },
  {
    id: 'hbo',
    period: 'In progress',
    title: 'HBO · Software Architecture',
    type: 'education',
    summary: 'Deepening the foundation: designing, understanding and optimizing systems at scale.',
    details: [
      'Exploring core business concepts like application integration',
      'Focus on architecture, system design and process optimization',
      'Combined with a full-time development job',
    ],
  },
  {
    id: 'rpa',
    period: 'Earlier',
    title: 'Robotic Process Automation Engineer',
    type: 'work',
    summary: 'Built RPA solutions and contributed to a self-developed no-code RPA-platform.',
    details: [
      'Standalone automations in .NET C# with Selenium & UI-Automation',
      'User acceptance tests, demos and on-site installations',
      'PowerShell scripts to automate platform deployment',
      'Contribution to a Laravel-based no-code RPA-platform'
    ],
    tech: [],
  },
  {
    id: 'second-internship',
    period: 'During MBO',
    title: 'Robotic Process Automation Internship',
    type: 'internship',
    summary: 'Getting experience of development cycles at a large company',
    details: [
      'Automated business processes on a platform that was completely new to me',
      'Worked in an agile team with sprints, stand-ups and code reviews',
    ],
  },
  {
    id: 'first-internship',
    period: 'During MBO',
    title: 'Software Development Internship',
    type: 'internship',
    summary: 'First professional experience: real codebases, real deadlines',
    details: [
      'Put school theory into practice in a real production environment',
      'Picked up my first frameworks after only knowing plain programming languages',
    ],
  },
  {
    id: 'mbo',
    period: 'Completed',
    title: 'MBO · Software and Media Development',
    type: 'education',
    summary: 'Where the foundation was laid, from hobby curiosity to professional craft.',
    details: ['Full-stack fundamentals'],
  }
]

const typeLabels: Record<EntryType, string> = {
  work: 'Work',
  education: 'Education',
  internship: 'Internship',
  origin: 'Origin',
}

const openId = ref<string | null>('integration')

function toggle(entry: Entry) {
  if (!entry.details.length) return
  openId.value = openId.value === entry.id ? null : entry.id
}
</script>

<template>
  <SectionShell
    section-id="career"
    index="03"
    title="Career & education"
    subtitle="Where professional experience was developed."
  >
    <div class="relative md:ml-6 md:border-l md:border-line md:pl-12">
      <article
        v-for="(entry, i) in entries"
        :key="entry.id"
        v-reveal="Math.min(i * 80, 240)"
        class="relative pb-10 last:pb-0"
      >
        <!-- Node dot (desktop only) -->
        <span
          class="absolute top-1.5 -left-12 hidden -translate-x-1/2 items-center justify-center md:flex"
          aria-hidden="true"
        >
          <span class="h-2.5 w-2.5 rounded-full bg-accent" />
          <span
            v-if="entry.period === 'Present'"
            class="absolute h-2.5 w-2.5 animate-pulse-dot rounded-full"
          />
        </span>

        <button
          class="w-full rounded-xl border border-line bg-card p-5 text-left transition-all duration-300 md:p-6"
          :class="[
            entry.details.length ? 'cursor-pointer hover:border-accent/40 hover:-translate-y-0.5' : 'cursor-default',
            openId === entry.id ? 'border-accent/40' : '',
          ]"
          :aria-expanded="openId === entry.id"
          @click="toggle(entry)"
        >
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span class="font-mono text-xs text-muted">
              {{ entry.period }}
              <span class="text-accent">. </span>
              <span class="tracking-wider uppercase">{{ typeLabels[entry.type] }}</span>
            </span>
            <svg
              v-if="entry.details.length"
              class="ml-auto h-4 w-4 text-muted transition-transform duration-300"
              :class="{ 'rotate-180 text-accent': openId === entry.id }"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          <h3 class="mt-2 font-display text-xl font-semibold md:text-2xl">{{ entry.title }}</h3>
          <p class="mt-2 max-w-2xl text-base leading-relaxed text-muted">{{ entry.summary }}</p>

          <!-- Expandable details (animated via grid-rows trick, no layout locks) -->
          <div
            class="grid transition-[grid-template-rows] duration-400 ease-out"
            :class="openId === entry.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
          >
            <div class="overflow-hidden">
              <ul class="mt-4 space-y-2 border-t border-line pt-4">
                <li
                  v-for="detail in entry.details"
                  :key="detail"
                  class="flex gap-3 text-base leading-relaxed text-muted"
                >
                  <span class="mt-0.5 text-accent">›</span>
                  {{ detail }}
                </li>
              </ul>
              <div v-if="entry.tech" class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="t in entry.tech"
                  :key="t"
                  class="rounded-full bg-elev px-3 py-1 font-mono text-[11px] text-muted"
                >
                  {{ t }}
                </span>
              </div>
            </div>
          </div>
        </button>
      </article>
    </div>
  </SectionShell>
</template>
