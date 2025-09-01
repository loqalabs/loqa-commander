<template>
  <div class="skills-page">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Skills Management</h1>
      <p class="text-gray-600 dark:text-gray-400">Manage and configure voice assistant skills</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6"
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800 dark:text-red-300">Error loading skills</h3>
          <p class="mt-1 text-sm text-red-700 dark:text-red-400">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Skills Grid -->
    <div v-else class="space-y-6">
      <!-- Skills Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ skills.length }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Total Skills</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ enabledSkills }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Enabled</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ skillsWithErrors }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">With Errors</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ totalUsage }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Total Usage</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills List -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Installed Skills</h3>
        </div>
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div
            v-for="skill in skills"
            :key="skill.manifest.id"
            class="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
            @click="selectSkill(skill)"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <!-- Status Indicator -->
                <div class="flex-shrink-0">
                  <div
                    class="w-3 h-3 rounded-full"
                    :class="{
                      'bg-green-400': skill.status.healthy && skill.config.enabled,
                      'bg-yellow-400': !skill.config.enabled,
                      'bg-red-400': skill.status.healthy === false,
                      'bg-gray-400': skill.status.state === 'loading',
                    }"
                  ></div>
                </div>

                <!-- Skill Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-2">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {{ skill.manifest.name }}
                    </p>
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    >
                      v{{ skill.manifest.version }}
                    </span>
                    <span
                      v-if="skill.manifest.trust_level === 'system'"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                    >
                      System
                    </span>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {{ skill.manifest.description }}
                  </p>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center space-x-2">
                <span
                  v-if="skill.error_count > 0"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                >
                  {{ skill.error_count }} errors
                </span>

                <button
                  v-if="skill.config.enabled"
                  @click.stop="disableSkill(skill.manifest.id)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                >
                  Disable
                </button>
                <button
                  v-else
                  @click.stop="enableSkill(skill.manifest.id)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                >
                  Enable
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skill Detail Modal -->
    <SkillDetailModal
      v-if="selectedSkill"
      :skill="selectedSkill"
      :is-open="!!selectedSkill"
      @close="selectedSkill = null"
      @updated="handleSkillUpdated"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SkillDetailModal from '../components/SkillDetailModal.vue'

const skills = ref([])
const selectedSkill = ref(null)
const loading = ref(true)
const error = ref(null)

const enabledSkills = computed(() => skills.value.filter((s) => s.config.enabled).length)
const skillsWithErrors = computed(() => skills.value.filter((s) => s.error_count > 0).length)
const totalUsage = computed(() =>
  skills.value.reduce((sum, s) => sum + (s.status.usage_count || 0), 0)
)

const loadSkills = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await fetch('/api/skills')
    if (!response.ok) {
      throw new Error(`Failed to load skills: ${response.status}`)
    }

    const data = await response.json()
    skills.value = data.skills || []
  } catch (err) {
    console.error('Failed to load skills:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const selectSkill = (skill) => {
  selectedSkill.value = skill
}

const enableSkill = async (skillId) => {
  try {
    const response = await fetch(`/api/skills/${skillId}/enable`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '{}',
    })

    if (!response.ok) {
      throw new Error(`Failed to enable skill: ${response.status}`)
    }

    // Refresh the skills list
    await loadSkills()
  } catch (err) {
    console.error('Failed to enable skill:', err)
    // You might want to show a toast notification here
  }
}

const disableSkill = async (skillId) => {
  try {
    const response = await fetch(`/api/skills/${skillId}/disable`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '{}',
    })

    if (!response.ok) {
      throw new Error(`Failed to disable skill: ${response.status}`)
    }

    // Refresh the skills list
    await loadSkills()
  } catch (err) {
    console.error('Failed to disable skill:', err)
    // You might want to show a toast notification here
  }
}

const handleSkillUpdated = () => {
  loadSkills()
}

onMounted(() => {
  loadSkills()
})
</script>

<style scoped>
.skills-page {
  @apply p-6;
}
</style>
