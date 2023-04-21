module.exports = (on, config) => {
    require('cypress-email-results')(on, config, {
      email: ['strukalex@gmail.com','alex.struk@gov.bc.ca'],
    })
  }