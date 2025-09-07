# CLAUDE.md - Loqa Commander UI

This file provides Claude Code with specific guidance for working with the Loqa Commander service - the web-based administrative dashboard for the Loqa system.

## Service Overview

Loqa Commander is the frontend service that provides:
- **System Dashboard**: Real-time monitoring of all services
- **Voice Event Timeline**: Visual timeline of voice interactions and processing
- **Skills Management**: Web interface for loading, configuring, and managing skills
- **System Configuration**: Settings and configuration management
- **Audio Testing**: Built-in tools for testing voice processing pipeline
- **Analytics**: System performance metrics and usage statistics

## Architecture Role

- **Service Type**: Frontend service (Vue.js 3 + Vite)
- **Dependencies**: loqa-proto (for type definitions)  
- **Communicates With**: loqa-hub (HTTP REST API)
- **Port**: `:5173` (development), `:80` (production)
- **Build Output**: Static files served by nginx in production

## Development Commands

### Local Development
```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Development server with specific port
npm run dev -- --port 3001

# Development with debugging
DEBUG=true npm run dev
```

### Building & Testing
```bash
# Production build
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Testing
npm run test
npm run test:watch
npm run test:coverage
```

### Code Quality
```bash
# Format code with Prettier
npm run format

# Full quality check (matches CI)
npm run quality-check

# Pre-commit hooks
npm run pre-commit
```

## Project Structure

### Key Directories
```bash
src/
├── components/           # Vue components
│   ├── Timeline/        # Voice event timeline components
│   ├── Skills/          # Skills management components
│   ├── Dashboard/       # System dashboard components
│   └── common/          # Shared/reusable components
├── views/               # Route-level components (pages)
├── stores/              # Pinia state management
├── composables/         # Vue composition API utilities
├── api/                 # API client and service calls
├── types/               # TypeScript type definitions
└── assets/              # Static assets (CSS, images)
```

### Configuration Files
```bash
vite.config.ts           # Vite build configuration
vitest.config.ts         # Test configuration
tailwind.config.js       # Tailwind CSS configuration
tsconfig.json            # TypeScript configuration
eslint.config.js         # ESLint configuration
```

## API Integration

### Hub Service API
```bash
# Base URL (development)
VITE_API_BASE_URL=http://localhost:3000

# Main API endpoints used by Commander
GET    /api/events                    # Voice events timeline
GET    /api/events/{id}               # Individual event details
GET    /api/skills                    # List loaded skills
POST   /api/skills                    # Load new skill
GET    /api/skills/{id}               # Skill details  
POST   /api/skills/{id}/enable        # Enable skill
POST   /api/skills/{id}/disable       # Disable skill
POST   /api/skills/{id}/reload        # Reload skill
GET    /health                        # System health check
```

### API Client Usage
```typescript
// Using the API client
import { apiClient } from '@/api/client'

// Fetch voice events
const events = await apiClient.get('/api/events')

// Load a skill
await apiClient.post('/api/skills', { skill_path: '/path/to/skill' })
```

## Component Development

### Timeline Components
```bash
src/components/Timeline/
├── TimelineView.vue      # Main timeline container
├── EventCard.vue         # Individual event display
├── EventDetails.vue      # Detailed event modal
└── TimelineFilters.vue   # Event filtering controls
```

### Skills Management  
```bash
src/components/Skills/
├── SkillsList.vue        # Skills overview grid
├── SkillCard.vue         # Individual skill card
├── SkillDetails.vue      # Detailed skill configuration
├── SkillLoader.vue       # Skill loading interface
└── SkillMetrics.vue      # Skill performance metrics
```

### Dashboard Components
```bash
src/components/Dashboard/
├── SystemOverview.vue    # System status summary
├── MetricsChart.vue      # Performance charts
├── ServiceStatus.vue     # Individual service health
└── QuickActions.vue      # Common action buttons
```

## State Management (Pinia)

### Main Stores
```typescript
// Voice events store
import { useEventsStore } from '@/stores/events'
const events = useEventsStore()

// Skills management store  
import { useSkillsStore } from '@/stores/skills'
const skills = useSkillsStore()

// System status store
import { useSystemStore } from '@/stores/system'
const system = useSystemStore()
```

### Store Usage
```typescript
// Reactive data
const { events, loading, error } = storeToRefs(eventsStore)

// Actions
await eventsStore.fetchEvents()
await skillsStore.loadSkill('/path/to/skill')
```

## Styling & UI

### Tailwind CSS
```bash
# Custom configuration in tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {...},      # Loqa brand colors
      dark: {...}          # Dark mode colors
    }
  }
}
```

### Dark Mode Support
```vue
<template>
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- Component content -->
  </div>
</template>
```

### Component Styling
```vue
<style scoped>
/* Component-specific styles */
.timeline-event {
  @apply bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4;
}
</style>
```

## Testing Strategies

### Unit Tests (Vitest)
```bash
# Test Vue components
src/components/__tests__/
├── Timeline/
│   ├── TimelineView.test.ts
│   └── EventCard.test.ts
├── Skills/
│   └── SkillsList.test.ts
└── stores/
    ├── events.test.ts
    └── skills.test.ts
```

### Component Testing
```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import EventCard from '@/components/Timeline/EventCard.vue'

describe('EventCard', () => {
  it('displays event information correctly', () => {
    const wrapper = mount(EventCard, {
      props: { event: mockEvent }
    })
    expect(wrapper.text()).toContain('Turn on lights')
  })
})
```

### Integration Testing
```bash
# Test API integration
npm run test:integration

# E2E testing with Playwright (optional)
npm run test:e2e
```

## Configuration

### Environment Variables
```bash
# Development (.env.development)
VITE_API_BASE_URL=http://localhost:3000
VITE_WS_BASE_URL=ws://localhost:3000
VITE_APP_NAME=Loqa Commander
VITE_DEBUG=true

# Production (.env.production)
VITE_API_BASE_URL=/api
VITE_WS_BASE_URL=/ws
VITE_APP_NAME=Loqa Commander
VITE_DEBUG=false
```

### Build Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000'  # Proxy API calls to hub
    }
  }
})
```

## Debugging & Troubleshooting

### Development Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check

# Debug build issues
npm run build -- --debug

# Analyze bundle size
npm run build -- --analyze
```

### Runtime Debugging
```javascript
// Vue DevTools (browser extension)
// https://devtools.vuejs.org/

// Debug API calls
console.log('API Response:', await apiClient.get('/api/events'))

// Debug reactive state
import { useEventsStore } from '@/stores/events'
const events = useEventsStore()
console.log('Events state:', toRaw(events))
```

### Performance Monitoring
```bash
# Lighthouse performance audit
npm install -g lighthouse
lighthouse http://localhost:5173

# Bundle analyzer
npm run build:analyze
```

## Docker & Deployment

### Docker Development
```bash
# Build development image
docker build -t loqa-commander:dev .

# Run with volume mounting for development
docker run -p 5173:5173 -v $(pwd):/app loqa-commander:dev
```

### Production Build
```bash
# Multi-stage Docker build
docker build -t loqa-commander:prod --target production .

# Static file output (dist/)
docker run --rm -v $(pwd)/dist:/output loqa-commander:prod
```

## Common Tasks

### Adding New API Endpoint
```typescript
// 1. Add to API client
// src/api/client.ts
export const apiClient = {
  // ... existing methods
  async getSystemMetrics() {
    return this.get('/api/metrics')
  }
}

// 2. Add to store if needed
// src/stores/system.ts
export const useSystemStore = defineStore('system', {
  actions: {
    async fetchMetrics() {
      this.metrics = await apiClient.getSystemMetrics()
    }
  }
})

// 3. Use in component
// src/components/Dashboard/SystemMetrics.vue
const system = useSystemStore()
await system.fetchMetrics()
```

### Adding New Page/Route
```typescript
// 1. Create view component
// src/views/NewPage.vue

// 2. Add route
// src/router/index.ts
{
  path: '/new-page',
  name: 'NewPage',
  component: () => import('@/views/NewPage.vue')
}

// 3. Add navigation link
// src/components/Navigation.vue
```

## Related Documentation

- **Master Documentation**: `../loqa/config/CLAUDE.md` - Full ecosystem overview
- **Hub Service API**: `../loqa-hub/CLAUDE.md` - Backend API reference
- **Protocol Types**: `../loqa-proto/CLAUDE.md` - Data type definitions
- **Skills System**: `../loqa-skills/CLAUDE.md` - Skills management integration