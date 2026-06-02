<script setup lang="ts">
defineProps<{
  title: string
  icon?: string
  sectionId?: string
}>()
</script>

<template>
  <section :id="sectionId" class="mx-auto w-[1200px] max-w-full px-8 py-6">
    <div class="flex items-center gap-4 mb-3">
      <img v-if="icon" :src="icon" class="h-10 w-10 object-contain" alt="" />
      <h2 class="text-3xl font-bold text-gray-800">{{ title }}</h2>
    </div>
    <div class="bg-gray-100 rounded-lg p-8 shadow-sm">
      <slot />
    </div>
  </section>
</template>
