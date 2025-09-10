import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', {
  state: () => ({
    systemInfo: {},
    healthStatus: {},
    loading: false,
    error: null,
  }),

  getters: {
    isSystemHealthy: (state) => {
      return Object.values(state.healthStatus).every((status) => status === 'healthy')
    },
    systemVersion: (state) => state.systemInfo.version || 'Unknown',
  },

  actions: {
    async loadSystemInfo() {
      try {
        this.loading = true
        this.error = null

        const response = await fetch('/api/system/info')
        if (response.ok) {
          const data = await response.json()
          this.systemInfo = data
        }
      } catch (err) {
        console.error('Failed to load system info:', err)
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async checkHealth() {
      try {
        const response = await fetch('/health')
        if (response.ok) {
          const data = await response.json()
          this.healthStatus = data
        }
      } catch (err) {
        console.error('Failed to check system health:', err)
        this.error = err.message
      }
    },

    async refreshSystemData() {
      await Promise.all([this.loadSystemInfo(), this.checkHealth()])
    },
  },
})
