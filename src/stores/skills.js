import { defineStore } from 'pinia'

export const useSkillsStore = defineStore('skills', {
  state: () => ({
    skills: [],
    selectedSkill: null,
    loading: false,
    error: null,
  }),

  getters: {
    enabledSkills: (state) => state.skills.filter((s) => s.config.enabled).length,
    skillsWithErrors: (state) => state.skills.filter((s) => s.error_count > 0).length,
    totalUsage: (state) => state.skills.reduce((sum, s) => sum + (s.status.usage_count || 0), 0),
  },

  actions: {
    async loadSkills() {
      try {
        this.loading = true
        this.error = null

        const response = await fetch('/api/skills')
        if (!response.ok) {
          throw new Error(`Failed to load skills: ${response.status}`)
        }

        const data = await response.json()
        this.skills = data.skills || []
      } catch (err) {
        console.error('Failed to load skills:', err)
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    selectSkill(skill) {
      this.selectedSkill = skill
    },

    clearSelectedSkill() {
      this.selectedSkill = null
    },

    async enableSkill(skillId) {
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
        await this.loadSkills()
      } catch (err) {
        console.error('Failed to enable skill:', err)
        this.error = err.message
      }
    },

    async disableSkill(skillId) {
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
        await this.loadSkills()
      } catch (err) {
        console.error('Failed to disable skill:', err)
        this.error = err.message
      }
    },

    async refreshSkills() {
      await this.loadSkills()
    },
  },
})
