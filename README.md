# Loqa Observer

Voice Command Timeline UI for the Loqa voice assistant system.

## Overview

Loqa Observer is a Vue.js web application that provides real-time visualization and inspection of voice interactions processed by the Loqa system. It offers a timeline view of voice events with detailed transcription, intent parsing, and confidence metrics.

## Features

- **Real-time Timeline**: Chronological view of voice interactions
- **Dark Mode Support**: Automatic system preference detection with manual toggle
- **Mobile Responsive**: Optimized for desktop and mobile devices
- **Event Details**: Drill-down modals with complete JSON payload
- **Analytics Dashboard**: Performance metrics and insights (coming soon)
- **Auto-refresh**: Polling-based updates every 5 seconds

## Tech Stack

- Vue 3 with Composition API
- Vite for development and building
- Tailwind CSS for styling
- Vue Router for navigation
- Pinia for state management
- Headless UI for accessible components
- Heroicons for icons

## Development

### Prerequisites

- Node.js 18+
- Running Loqa Hub on `http://localhost:3000`

### Setup

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

### API Integration

The app connects to the Loqa Hub API via proxy configuration in `vite.config.js`. All `/api/*` requests are forwarded to `http://localhost:3000`.

## Project Structure

```
src/
├── components/        # Reusable Vue components
├── views/            # Page-level components
├── stores/           # Pinia stores for state management
├── composables/      # Vue composables for shared logic
├── App.vue           # Root component
├── main.js           # Application entry point
└── style.css         # Global styles and Tailwind imports
```

## License

This project is part of the Loqa voice assistant system and follows the same AGPL 3.0 licensing.