const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://digital.gov.bc.ca',
    supportFile:false
  },
})