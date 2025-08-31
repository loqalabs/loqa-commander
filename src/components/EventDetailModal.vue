<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="$emit('close')" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex items-center justify-between mb-4">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Voice Event Details
                </DialogTitle>
                <button
                  @click="$emit('close')"
                  class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <XMarkIcon class="h-6 w-6" />
                </button>
              </div>

              <div v-if="event" class="space-y-6">
                <!-- Event Overview -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Information</h4>
                    <dl class="space-y-1">
                      <div class="flex justify-between">
                        <dt class="text-sm text-gray-500 dark:text-gray-400">Puck ID:</dt>
                        <dd class="text-sm font-medium text-gray-900 dark:text-white">{{ event.puck_id }}</dd>
                      </div>
                      <div class="flex justify-between">
                        <dt class="text-sm text-gray-500 dark:text-gray-400">Timestamp:</dt>
                        <dd class="text-sm font-medium text-gray-900 dark:text-white">{{ formatTimestamp(event.timestamp) }}</dd>
                      </div>
                      <div class="flex justify-between">
                        <dt class="text-sm text-gray-500 dark:text-gray-400">Status:</dt>
                        <dd>
                          <span 
                            v-if="event.success"
                            class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                          >
                            ✓ Success
                          </span>
                          <span 
                            v-else
                            class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                          >
                            ✗ Failed
                          </span>
                        </dd>
                      </div>
                      <div v-if="event.processing_time_ms" class="flex justify-between">
                        <dt class="text-sm text-gray-500 dark:text-gray-400">Processing Time:</dt>
                        <dd class="text-sm font-medium text-gray-900 dark:text-white">{{ event.processing_time_ms }}ms</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Processing Results</h4>
                    <dl class="space-y-1">
                      <div class="flex justify-between">
                        <dt class="text-sm text-gray-500 dark:text-gray-400">Intent:</dt>
                        <dd class="text-sm font-mono font-medium text-gray-900 dark:text-white">{{ event.intent || 'Unknown' }}</dd>
                      </div>
                      <div class="flex justify-between">
                        <dt class="text-sm text-gray-500 dark:text-gray-400">Confidence:</dt>
                        <dd class="text-sm font-medium text-gray-900 dark:text-white">{{ Math.round(event.confidence * 100) }}%</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <!-- Transcription -->
                <div>
                  <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transcription</h4>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p class="text-gray-900 dark:text-white">
                      "{{ event.transcription || 'No transcription available' }}"
                    </p>
                  </div>
                </div>

                <!-- Audio Player -->
                <div v-if="event.audio_url">
                  <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Audio Recording</h4>
                  <audio 
                    :src="event.audio_url" 
                    controls 
                    preload="none"
                    class="w-full bg-gray-100 dark:bg-gray-700 rounded-lg"
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>

                <!-- Raw JSON -->
                <div>
                  <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Raw Event Data</h4>
                  <pre class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-sm text-gray-900 dark:text-white overflow-x-auto">{{ JSON.stringify(event, null, 2) }}</pre>
                </div>
              </div>

              <div class="mt-6 flex justify-end">
                <button
                  @click="$emit('close')"
                  class="btn-primary"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

defineProps({
  open: {
    type: Boolean,
    required: true
  },
  event: {
    type: Object,
    default: null
  }
})

defineEmits(['close'])

const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  })
}
</script>