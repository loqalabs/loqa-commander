<template>
  <div class="voice-event-card" :class="{ 'compact': !expanded }">
    <!-- Event Header (always visible) -->
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <div class="flex items-center space-x-2 mb-1">
          <span class="text-sm font-medium text-gray-900 dark:text-white">
            Puck {{ event.puck_id }}
          </span>
          <span
            v-if="event.success"
            class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
          >
            ✓ Success
          </span>
          <span
            v-else
            class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
          >
            ✗ Failed
          </span>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ formatTimestamp(event.timestamp) }}
          </p>
          <!-- Compact view: show transcription snippet -->
          <p v-if="!expanded" class="text-xs text-gray-600 dark:text-gray-300 italic truncate ml-2 flex-1">
            "{{ (event.transcription || 'No transcription available').substring(0, 50) }}{{ (event.transcription || '').length > 50 ? '...' : '' }}"
          </p>
        </div>
      </div>
      <!-- Expand/Collapse button -->
      <button
        @click.stop="toggleExpanded"
        class="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
        :aria-label="expanded ? 'Collapse' : 'Expand'"
      >
        <svg 
          class="w-4 h-4 transition-transform duration-200" 
          :class="{ 'rotate-180': expanded }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
    </div>

    <!-- Expanded content (hidden by default) -->
    <div v-if="expanded" class="mt-3 space-y-3">
      <!-- Transcription -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Transcription</h4>
        <p class="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-md p-2">
          "{{ event.transcription || 'No transcription available' }}"
        </p>
      </div>

      <!-- Intent & Confidence -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h4 class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Intent</h4>
          <p
            class="text-sm text-gray-900 dark:text-white font-mono bg-blue-50 dark:bg-blue-900/30 rounded px-2 py-1"
          >
            {{ event.intent || 'Unknown' }}
          </p>
        </div>
        <div>
          <h4 class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Confidence</h4>
          <div class="flex items-center space-x-2">
            <div class="confidence-bar flex-1">
              <div
                class="confidence-fill"
                :class="{
                  'confidence-high': event.confidence >= 0.8,
                  'confidence-medium': event.confidence >= 0.5 && event.confidence < 0.8,
                  'confidence-low': event.confidence < 0.5,
                }"
                :style="`width: ${event.confidence * 100}%`"
              ></div>
            </div>
            <span class="text-xs text-gray-600 dark:text-gray-400">
              {{ getConfidenceText(event.confidence) }} ({{ Math.round(event.confidence * 100) }}%)
            </span>
          </div>
        </div>
      </div>

      <!-- Audio Player -->
      <div v-if="event.audio_url">
        <h4 class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Audio</h4>
        <audio
          :src="event.audio_url"
          controls
          preload="none"
          class="w-full h-8 bg-gray-100 dark:bg-gray-700 rounded"
        >
          Your browser does not support the audio element.
        </audio>
      </div>

      <!-- Processing Time -->
      <div
        v-if="event.processing_time_ms"
        class="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-600 pt-2"
      >
        Processed in {{ event.processing_time_ms }}ms
      </div>
    </div>

    <!-- Click hint for modal (only when collapsed) -->
    <div v-if="!expanded" class="text-xs text-gray-400 dark:text-gray-500 text-right mt-2">
      <button @click="handleClick" class="hover:text-gray-600 dark:hover:text-gray-300">
        Click for full details →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['click'])

// Collapsed by default for compact view
const expanded = ref(false)

const toggleExpanded = () => {
  expanded.value = !expanded.value
}

const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

const getConfidenceText = (confidence) => {
  if (confidence >= 0.8) return 'High'
  if (confidence >= 0.5) return 'Medium'
  return 'Low'
}

const handleClick = () => {
  emit('click', props.event)
}
</script>
