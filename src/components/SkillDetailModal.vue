<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="$emit('close')"
      ></div>

      <!-- Modal panel -->
      <div
        class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6"
      >
        <div>
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-3">
              <div
                class="w-4 h-4 rounded-full"
                :class="{
                  'bg-green-400': skill.status.healthy && skill.config.enabled,
                  'bg-yellow-400': !skill.config.enabled,
                  'bg-red-400': skill.status.healthy === false,
                }"
              ></div>
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ skill.manifest.name }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ skill.manifest.id }} • v{{ skill.manifest.version }}
                </p>
              </div>
            </div>
            <button
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Tabs -->
          <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav class="-mb-px flex space-x-8">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                ]"
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="space-y-6">
            <!-- Overview Tab -->
            <div v-if="activeTab === 'overview'" class="space-y-6">
              <!-- Basic Info -->
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Basic Information
                </h4>
                <dl class="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                  <div>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Author</dt>
                    <dd class="text-sm text-gray-900 dark:text-white">
                      {{ skill.manifest.author }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">License</dt>
                    <dd class="text-sm text-gray-900 dark:text-white">
                      {{ skill.manifest.license }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Trust Level
                    </dt>
                    <dd class="text-sm text-gray-900 dark:text-white">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="{
                          'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300':
                            skill.manifest.trust_level === 'system',
                          'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300':
                            skill.manifest.trust_level === 'verified',
                          'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300':
                            skill.manifest.trust_level === 'community',
                          'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300':
                            skill.manifest.trust_level === 'unknown',
                        }"
                      >
                        {{ skill.manifest.trust_level }}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Sandbox Mode
                    </dt>
                    <dd class="text-sm text-gray-900 dark:text-white">
                      {{ skill.manifest.sandbox_mode || 'none' }}
                    </dd>
                  </div>
                </dl>
              </div>

              <!-- Status -->
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Status</h4>
                <dl class="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                  <div>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">State</dt>
                    <dd class="text-sm text-gray-900 dark:text-white">{{ skill.status.state }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Healthy</dt>
                    <dd class="text-sm text-gray-900 dark:text-white">
                      {{ skill.status.healthy ? 'Yes' : 'No' }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Loaded At</dt>
                    <dd class="text-sm text-gray-900 dark:text-white">
                      {{ formatDate(skill.loaded_at) }}
                    </dd>
                  </div>
                  <div v-if="skill.last_used">
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Last Used</dt>
                    <dd class="text-sm text-gray-900 dark:text-white">
                      {{ formatDate(skill.last_used) }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Usage Count
                    </dt>
                    <dd class="text-sm text-gray-900 dark:text-white">
                      {{ skill.status.usage_count || 0 }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Error Count
                    </dt>
                    <dd class="text-sm text-gray-900 dark:text-white">
                      {{ skill.error_count || 0 }}
                    </dd>
                  </div>
                </dl>
              </div>

              <!-- Description -->
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Description</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ skill.manifest.description }}
                </p>
              </div>

              <!-- Intent Patterns -->
              <div v-if="skill.manifest.intent_patterns && skill.manifest.intent_patterns.length">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Intent Patterns
                </h4>
                <div class="space-y-2">
                  <div
                    v-for="pattern in skill.manifest.intent_patterns"
                    :key="pattern.name"
                    class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div>
                      <p class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ pattern.name }}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        Examples: {{ pattern.examples.slice(0, 3).join(', ') }}
                        <span v-if="pattern.examples.length > 3">...</span>
                      </p>
                    </div>
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="
                        pattern.enabled
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                      "
                    >
                      {{ pattern.enabled ? 'Enabled' : 'Disabled' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Configuration Tab -->
            <div v-if="activeTab === 'config'" class="space-y-6">
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Skill Configuration
                </h4>
                <form @submit.prevent="saveConfig" class="space-y-4">
                  <!-- Enabled toggle -->
                  <div class="flex items-center justify-between">
                    <div>
                      <label class="text-sm font-medium text-gray-900 dark:text-white"
                        >Enabled</label
                      >
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        Whether this skill is active and can handle intents
                      </p>
                    </div>
                    <button
                      type="button"
                      @click="configData.enabled = !configData.enabled"
                      :class="[
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
                        configData.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600',
                      ]"
                    >
                      <span
                        :class="[
                          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                          configData.enabled ? 'translate-x-5' : 'translate-x-0',
                        ]"
                      ></span>
                    </button>
                  </div>

                  <!-- Timeout -->
                  <div>
                    <label
                      for="timeout"
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Timeout</label
                    >
                    <input
                      id="timeout"
                      v-model="configData.timeout"
                      type="text"
                      class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="30s"
                    />
                  </div>

                  <!-- Max Retries -->
                  <div>
                    <label
                      for="maxRetries"
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Max Retries</label
                    >
                    <input
                      id="maxRetries"
                      v-model.number="configData.max_retries"
                      type="number"
                      min="0"
                      max="10"
                      class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <!-- Custom Configuration -->
                  <div v-if="Object.keys(configData.config || {}).length">
                    <h5 class="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Custom Settings
                    </h5>
                    <div class="space-y-3">
                      <div
                        v-for="(value, key) in configData.config"
                        :key="key"
                        class="grid grid-cols-3 gap-4 items-center"
                      >
                        <label class="text-sm text-gray-700 dark:text-gray-300">{{ key }}</label>
                        <input
                          v-if="typeof value === 'string' || typeof value === 'number'"
                          v-model="configData.config[key]"
                          :type="typeof value === 'number' ? 'number' : 'text'"
                          class="col-span-2 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                        <input
                          v-else-if="typeof value === 'boolean'"
                          v-model="configData.config[key]"
                          type="checkbox"
                          class="col-span-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span v-else class="col-span-2 text-sm text-gray-500 dark:text-gray-400">
                          {{ JSON.stringify(value) }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      @click="resetConfig"
                      class="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      :disabled="saving"
                      class="bg-blue-600 hover:bg-blue-700 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      {{ saving ? 'Saving...' : 'Save Changes' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Permissions Tab -->
            <div v-if="activeTab === 'permissions'" class="space-y-6">
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Required Permissions
                </h4>
                <div
                  v-if="skill.manifest.permissions && skill.manifest.permissions.length"
                  class="space-y-3"
                >
                  <div
                    v-for="permission in skill.manifest.permissions"
                    :key="permission.type"
                    class="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ permission.type }}
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        {{ permission.description }}
                      </p>
                      <div v-if="permission.actions && permission.actions.length" class="mt-2">
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          Actions: {{ permission.actions.join(', ') }}
                        </p>
                      </div>
                    </div>
                    <span
                      class="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                    >
                      Granted
                    </span>
                  </div>
                </div>
                <p v-else class="text-sm text-gray-500 dark:text-gray-400">
                  This skill doesn't require any special permissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  skill: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'updated'])

const activeTab = ref('overview')
const saving = ref(false)

const tabs = [
  { id: 'overview', name: 'Overview' },
  { id: 'config', name: 'Configuration' },
  { id: 'permissions', name: 'Permissions' },
]

const configData = reactive({
  enabled: false,
  timeout: '',
  max_retries: 0,
  config: {},
})

// Watch for skill changes to update config data
watch(
  () => props.skill,
  (newSkill) => {
    if (newSkill) {
      configData.enabled = newSkill.config.enabled
      configData.timeout = newSkill.config.timeout
      configData.max_retries = newSkill.config.max_retries || 0
      configData.config = { ...(newSkill.config.config || {}) }
    }
  },
  { immediate: true }
)

const formatDate = (dateString) => {
  if (!dateString) return 'Never'
  return new Date(dateString).toLocaleString()
}

const saveConfig = async () => {
  try {
    saving.value = true

    const response = await fetch(`/api/skills/${props.skill.manifest.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        config: configData,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to save configuration: ${response.status}`)
    }

    emit('updated')
  } catch (err) {
    console.error('Failed to save skill configuration:', err)
    // You might want to show a toast notification here
  } finally {
    saving.value = false
  }
}

const resetConfig = () => {
  configData.enabled = props.skill.config.enabled
  configData.timeout = props.skill.config.timeout
  configData.max_retries = props.skill.config.max_retries || 0
  configData.config = { ...(props.skill.config.config || {}) }
}
</script>
