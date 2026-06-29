<script setup lang="ts">
import { ref, computed } from 'vue'
import SectionShell from '@/components/SectionShell.vue'

const logoModules = import.meta.glob<{ default: string }>(
  '@/assets/images/tech_stack/*.png',
  { eager: true },
)

const logos: Record<string, string> = {}
for (const [path, mod] of Object.entries(logoModules)) {
  logos[path.split('/').pop()!.replace('.png', '')] = mod.default
}

type Category = 'Languages' | 'Frameworks' | 'Data' | 'Tools' | 'AI'

interface Tech {
  file: string
  name: string
  category: Category
  level: 1 | 2 | 3 | 4 | 5
}

const techs: Tech[] = [
  { file: 'java', name: 'Java', category: 'Languages', level: 5 },
  { file: 'spring', name: 'Spring Boot', category: 'Frameworks', level: 4 },
  { file: 'apache_camel', name: 'Apache Camel', category: 'Frameworks', level: 4 },
  { file: 'csharp', name: 'C#', category: 'Languages', level: 4 },
  { file: 'dot_net', name: '.NET', category: 'Frameworks', level: 4 },
  { file: 'python', name: 'Python', category: 'Languages', level: 4 },
  { file: 'rust', name: 'Rust', category: 'Languages', level: 2 },
  { file: 'go lang', name: 'Go', category: 'Languages', level: 3 },
  { file: 'javascript', name: 'JavaScript', category: 'Languages', level: 3 },
  { file: 'html', name: 'HTML', category: 'Languages', level: 3 },
  { file: 'css', name: 'CSS', category: 'Languages', level: 3 },
  { file: 'powershell', name: 'PowerShell', category: 'Languages', level: 3 },
  { file: 'vue', name: 'Vue', category: 'Frameworks', level: 3 },
  { file: 'mysql', name: 'MySQL', category: 'Data', level: 4 },
  { file: 'mongo', name: 'MongoDB', category: 'Data', level: 3 },
  { file: 'mariadb', name: 'MariaDB', category: 'Data', level: 3 },
  { file: 'redis', name: 'Redis', category: 'Data', level: 3 },
  { file: 'git', name: 'Git', category: 'Tools', level:   4 },
  { file: 'docker', name: 'Docker', category: 'Tools', level: 2 },
  { file: 'linux', name: 'Linux', category: 'Tools', level: 4 },
  { file: 'windows', name: 'Windows', category: 'Tools', level: 4 },
  { file: 'atlassian', name: 'Atlassian', category: 'Tools', level: 4 },
  { file: 'bruno', name: 'Bruno', category: 'Tools', level: 4 },
  { file: 'postman', name: 'Postman', category: 'Tools', level: 4 },
  { file: 'claude', name: 'Claude', category: 'AI', level: 5 },
  { file: 'cursor', name: 'Cursor', category: 'AI', level: 3 },
]

const levelLabels: Record<number, string> = {
  1: 'Curious',
  2: 'Exploring',
  3: 'Comfortable',
  4: 'Production-ready',
  5: 'Daily driver',
}

const filters = ['All', 'Languages', 'Frameworks', 'Data', 'Tools', 'AI'] as const
const activeFilter = ref<(typeof filters)[number]>('All')

const visibleTechs = computed(() =>
  activeFilter.value === 'All'
    ? techs
    : techs.filter((t) => t.category === activeFilter.value),
)
</script>

<template>
  <SectionShell
    section-id="stack"
    index="04"
    title="Tech stack"
    subtitle="What I work with, and how deep it goes."
  >
    <div v-reveal class="mb-8 flex flex-wrap gap-2">
      <button
        v-for="filter in filters"
        :key="filter"
        class="rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-300"
        :class="
          activeFilter === filter
            ? 'border-accent bg-accent text-carbon'
            : 'border-line text-muted hover:border-accent/40 hover:text-fg'
        "
        @click="activeFilter = activeFilter === filter && filter !== 'All' ? 'All' : filter"
      >
        {{ filter }}
      </button>
    </div>

    <TransitionGroup
      tag="div"
      name="grid"
      class="relative grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
    >
      <article
        v-for="tech in visibleTechs"
        :key="tech.file"
        v-reveal
        class="group rounded-xl border border-line bg-card p-5 transition-[border-color,transform,box-shadow] duration-300 hover:scale-[1.08] hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
      >
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center">
            <img
              :src="logos[tech.file]"
              :alt="tech.name"
              class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </div>
          <div class="min-w-0">
            <h3 class="truncate text-sm font-semibold">{{ tech.name }}</h3>
            <p class="font-mono text-[10px] tracking-wide text-muted uppercase">{{ tech.category }}</p>
          </div>
        </div>
        <div class="mt-4 flex gap-1" :aria-label="`Skill level ${tech.level} of 5: ${levelLabels[tech.level]}`">
          <span
            v-for="seg in 5"
            :key="seg"
            class="h-1 flex-1 rounded-full transition-colors duration-500"
            :class="seg <= tech.level ? 'bg-accent' : 'bg-line'"
            :style="seg <= tech.level ? { transitionDelay: `${seg * 60}ms` } : undefined"
          />
        </div>
        <p class="mt-2 font-mono text-[10px] tracking-wide text-muted uppercase">
          {{ levelLabels[tech.level] }}
        </p>
      </article>
    </TransitionGroup>
  </SectionShell>
</template>

<style scoped>
.grid-move,
.grid-enter-active,
.grid-leave-active {
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
.grid-leave-active {
  position: absolute;
  visibility: hidden;
}
</style>
