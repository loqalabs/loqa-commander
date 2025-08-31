<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h2>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Voice interaction insights and performance metrics
      </p>
    </div>

    <!-- Coming Soon -->
    <div class="text-center py-12">
      <ChartBarIcon class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">Analytics Coming Soon</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Advanced analytics and insights will be available in a future update
      </p>
    </div>
  </div>
</template>

<script setup>
import { ChartBarIcon } from '@heroicons/vue/24/outline'
</script>