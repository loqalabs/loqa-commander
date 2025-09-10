import { defineStore } from 'pinia'

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [],
    selectedEvent: null,
    activeRelaysCount: 0,
    loading: false,
    error: null,
    refreshInterval: null,
  }),

  actions: {
    async loadEvents() {
      try {
        this.loading = true
        this.error = null

        const response = await fetch('/api/voice-events')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        this.events = data.events || []
      } catch (err) {
        console.error('Failed to fetch voice events:', err)
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchActiveRelays() {
      try {
        const response = await fetch('/api/active-relays')
        if (response.ok) {
          const data = await response.json()
          this.activeRelaysCount = data.count || 0
        }
      } catch (err) {
        console.error('Failed to fetch active relays:', err)
        // Don't update error state for this - it's supplementary data
      }
    },

    selectEvent(event) {
      this.selectedEvent = event
    },

    clearSelectedEvent() {
      this.selectedEvent = null
    },

    startAutoRefresh(intervalMs = 5000) {
      if (this.refreshInterval) {
        this.stopAutoRefresh()
      }

      this.refreshInterval = setInterval(async () => {
        await this.loadEvents()
        await this.fetchActiveRelays()
      }, intervalMs)
    },

    stopAutoRefresh() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval)
        this.refreshInterval = null
      }
    },

    async refreshData() {
      await Promise.all([this.loadEvents(), this.fetchActiveRelays()])
    },
  },
})
