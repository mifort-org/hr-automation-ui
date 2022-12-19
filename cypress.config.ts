import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '4ttswi',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:4200',
    excludeSpecPattern: '*.cy-example.js'
  },
  viewportWidth: 1920,
  viewportHeight: 1080
});
