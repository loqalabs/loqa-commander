<template>
  <div class="relative">
    <div v-if="sortedEvents.length > 0">
      <!-- Timeline line -->
      <div class="timeline-line h-full"></div>

      <!-- Event list -->
      <div class="space-y-6">
        <div v-for="(event, index) in sortedEvents" :key="event.id || index" class="relative pl-16">
          <!-- Timeline dot -->
          <div
            class="timeline-dot"
            :class="{
              'bg-green-500': event.success && event.confidence >= 0.8,
              'bg-yellow-500': event.success && event.confidence >= 0.5 && event.confidence < 0.8,
              'bg-red-500': !event.success || event.confidence < 0.5,
            }"
          ></div>

          <!-- Event card -->
          <VoiceEventCard :event="event" @click="handleEventClick(event)" />
        </div>
      </div>

      <!-- Timeline stats -->
      <div
        class="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
      >
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ sortedEvents.length }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Total Events</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-green-600 dark:text-green-400">
              {{ sortedEvents.filter((e) => e.success).length }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Successful</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {{ sortedEvents.filter((e) => e.confidence >= 0.8).length }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">High Confidence</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {{ activeRelaysCount }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Active Relays</div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
      <MicrophoneIcon class="mx-auto h-12 w-12 mb-4" />
      <p>No events to display</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { MicrophoneIcon } from '@heroicons/vue/24/outline'
import VoiceEventCard from './VoiceEventCard.vue'

const props = defineProps({
  events: {
    type: Array,
    default: () => [],
  },
  activeRelaysCount: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['event-click'])

// Sort events by timestamp (newest first)
const sortedEvents = computed(() =>
  props.events.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
)

const handleEventClick = (event) => {
  emit('event-click', event)
}
</script>
