<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  text: string
  sectionId?: string
}>()

function scrollToSection(id?: string) {
  if (!id) return
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div
    class="info-card relative rounded-lg p-10 shadow-sm w-110 h-75 bg-gray-100"
    :class="{ 'cursor-pointer': sectionId }"
    @click="scrollToSection(sectionId)"
  >
    <div class="flex items-center gap-6">
      <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full overflow-hidden">
        <img :src="icon" class="h-16 w-16 object-contain" alt="" />
      </div>
      <h2 class="text-2xl font-semibold text-gray-800">{{ title }}</h2>
    </div>
    <p class="mt-4 text-sm text-gray-600 leading-relaxed">{{ text }}</p>
  </div>
</template>

<style scoped>
.info-card {
  transition: transform 0.4s ease;
  overflow: hidden;
}

.info-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 3px;
  background: conic-gradient(
    from var(--border-angle, 0deg),
    transparent 30%,
    #585f69 50%,
    transparent 90%
  );
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.info-card:hover {
  transform: rotate(5deg) scale(1.125);
}

.info-card:hover::before {
  opacity: 1;
  animation: spin-border 3s linear infinite;
}

@keyframes spin-border {
  to {
    --border-angle: 360deg;
  }
}

@property --border-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
</style>
