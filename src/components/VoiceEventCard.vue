<template>
  <div 
    class="voice-event-card cursor-pointer"
    @click="handleClick"
    @keypress="(e) => e.key === 'Enter' && handleClick()"
    role="button"
    tabindex="0"
  >
    <!-- Event Header -->
    <div class="flex items-start justify-between mb-3">
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
        <p class="text-xs text-gray-500 dark:text-gray-400">
          {{ formatTimestamp(event.timestamp) }}
        </p>
      </div>
    </div>
    
    <!-- Transcription -->
    <div class="mb-3">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Transcription</h4>
      <p class="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-md p-2">
        "{{ event.transcription || 'No transcription available' }}"
      </p>
    </div>
    
    <!-- Intent & Confidence -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
      <div>
        <h4 class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Intent</h4>
        <p class="text-sm text-gray-900 dark:text-white font-mono bg-blue-50 dark:bg-blue-900/30 rounded px-2 py-1">
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
                'confidence-low': event.confidence < 0.5
              }"
              :style="`width: ${(event.confidence * 100)}%`"
            ></div>
          </div>
          <span class="text-xs text-gray-600 dark:text-gray-400">
            {{ getConfidenceText(event.confidence) }} ({{ Math.round(event.confidence * 100) }}%)
          </span>
        </div>
      </div>
    </div>

    <!-- Audio Player -->
    <div v-if="event.audio_url" class="mb-3">
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
    <div v-if="event.processing_time_ms" class="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-600 pt-2">
      Processed in {{ event.processing_time_ms }}ms
    </div>
    
    <!-- Click hint -->
    <div class="text-xs text-gray-400 dark:text-gray-500 text-right mt-2">
      Click for details →
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
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