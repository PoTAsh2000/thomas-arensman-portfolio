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
      'In my current role as data integration specialist I am focused on designing and building scalable, failure-proof integrations for logistics, e-commerce and healthcare sectors. Most of the work is done independently. However, our team is always working actively together to improve the overall quality of our services',
    details: [
      'Developing fast and scalable data integration applications.',
      'Connecting companies over a diverse set of protocols.',
      'Providing customer support when ad hoc changes to integrations are needed.',
      'Translating customer requirements into technical & functional designs.',
      'Migrating legacy codebases to modern stacks.',
      'Improving application test setups with unit and integration tests to improve code coverage.'
    ],
    tech: [],
  },
  {
    id: 'hbo',
    period: 'In progress',
    title: 'HBO Software Architecture',
    type: 'education',
    summary: 'Alongside my current role as EDI Specialist I am also diving deeper into the foundations of designing, understanding and optimizing systems at scale. My perspective is, that with the growing amount of AI usage in software development, it is becoming even more important to know the fundamentals of software architecture and translating business goals to working applications',
    details: [
      'Exploring core business concepts like application integration',
      'Focus on architecture, system design and process optimization',
    ],
  },
  {
    id: 'rpa',
    period: 'Earlier',
    title: 'Robotic Process Automation Engineer',
    type: 'work',
    summary: 'During my time at Bluepond B.V. I contributed to the development and maintenance of RPA solutions and a self-developed no-code RPA-platform. Work often required me to visit customers at their location which gave a great perspective on how users actually use the products.',
    details: [
      'Developing standalone automations in .NET C# with Selenium & UI-Automation',
      'Contribution to a Laravel-based no-code RPA-platform',
      'Bringing on site support for user acceptance tests and demos',
      'Doing on site installations for our no-code RPA-platform',
      'Writing PowerShell scripts to automate platform deployment and updates'
      
    ],
    tech: [],
  },
  {
    id: 'second-internship',
    period: 'During MBO',
    title: 'Robotic Process Automation Internship',
    type: 'internship',
    summary: 'At my internship at the RAI Amsterdam I was given a great experience of development cycles at a large company',
    details: [
      'Working on automating business processes on a platform that was completely new to me',
      'Worked in an agile team with sprints, stand-ups and code reviews',
      'Translating workflow recordings to technical design and functional documentation',
    ],
  },
  {
    id: 'first-internship',
    period: 'During MBO',
    title: 'Software Development Internship',
    type: 'internship',
    summary: 'This internship gave me my first professional experience with real codebases, real deadlines and working on systems for actual users',
    details: [
      'Put school theory into practice in a real production environment',
      'Picked up my first frameworks after only knowing plain programming languages',
      'Being directly in contact with customers'
    ],
  },
  {
    id: 'mbo',
    period: 'Completed',
    title: 'MBO - Software and Media Development',
    type: 'education',
    summary: 'Where the foundation was laid, from hobby curiosity to professional craft.',
    details: [
      'Learning the full-stack fundamentals like programming languages, database normalisation, networking and more.',
      'Traveling to Spain for a three week exchange program where I followed courses in Java and Javascript'
    ],
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
    index="04"
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
              <span class="text-accent">· </span>
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
          <p
            class="mt-2 max-w-2xl overflow-hidden text-base leading-relaxed text-ellipsis text-muted transition-[max-height] duration-300 ease-out"
            :class="openId === entry.id ? 'max-h-40' : 'line-clamp-1 max-h-[1.625rem]'"
          >
            {{ entry.summary }}
          </p>

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
