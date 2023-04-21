const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://digital.gov.bc.ca',
    supportFile:false,
    setupNodeEvents(on, config) {
      require("@datashard/snapshot").tasks(on, config)
    }
  },
  
})