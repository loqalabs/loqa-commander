<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0"
    >
      <div>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Voice Command Timeline</h2>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Real-time view of voice interactions processed by your Loqa system
        </p>
      </div>

      <button @click="refreshData" :disabled="loading" class="btn-primary">
        <svg
          v-if="loading"
          class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <ArrowPathIcon v-else class="-ml-1 mr-2 h-4 w-4" />
        {{ loading ? 'Refreshing...' : 'Refresh' }}
      </button>
    </div>

    <!-- Content -->
    <div v-if="error" class="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
      <div class="flex">
        <div class="shrink-0">
          <ExclamationTriangleIcon class="h-5 w-5 text-red-400 dark:text-red-300" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800 dark:text-red-200">Connection Error</h3>
          <div class="mt-2 text-sm text-red-700 dark:text-red-300">
            <p>Unable to connect to the Loqa Hub API: {{ error }}</p>
            <p class="mt-1 text-xs">Make sure the Hub is running on http://localhost:3000</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="loading && events.length === 0" class="flex justify-center py-12">
      <div class="text-center">
        <svg
          class="animate-spin h-8 w-8 text-gray-400 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading voice events...</p>
      </div>
    </div>

    <div v-else-if="events.length === 0" class="text-center py-12">
      <MicrophoneIcon class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No voice events yet</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Voice commands will appear here as they're processed by your Loqa system
      </p>
    </div>

    <VoiceEventTimeline
      v-else
      :events="events"
      :active-relay-count="activeRelaysCount"
      @event-click="handleEventClick"
    />

    <!-- Event Detail Modal -->
    <EventDetailModal
      :open="selectedEvent !== null"
      :event="selectedEvent"
      @close="eventsStore.clearSelectedEvent"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted } from 'vue'
import { ArrowPathIcon, ExclamationTriangleIcon, MicrophoneIcon } from '@heroicons/vue/24/outline'
import { useEventsStore } from '../stores/events'
import VoiceEventTimeline from '@/components/VoiceEventTimeline.vue'
import EventDetailModal from '@/components/EventDetailModal.vue'

const eventsStore = useEventsStore()

// Extract reactive state from store
const { events, selectedEvent, activeRelaysCount, loading, error } = storeToRefs(eventsStore)

// Extract actions from store
const { refreshData, selectEvent, startAutoRefresh, stopAutoRefresh } = eventsStore

const handleEventClick = (event) => {
  selectEvent(event)
}

onMounted(() => {
  refreshData()
  startAutoRefresh(5000) // Auto-refresh every 5 seconds
})

onUnmounted(() => {
  stopAutoRefresh()
})
</script>
