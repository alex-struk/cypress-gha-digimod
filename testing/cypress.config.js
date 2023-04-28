const { defineConfig } = require('cypress')
const { initPlugin } = require("@frsource/cypress-plugin-visual-regression-diff/plugins")

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://digital.gov.bc.ca',
    // supportFile:false,
    setupNodeEvents(on, config) {
      require("@datashard/snapshot").tasks(on, config);
      initPlugin(on, config);
    }
  },
  component: {
    setupNodeEvents(on, config) {
      initPlugin(on, config);
    },
  }
})