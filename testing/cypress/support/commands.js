require("@datashard/snapshot").register();
require("@frsource/cypress-plugin-visual-regression-diff");
const axios = require('axios').default;
const xml2js = require('xml2js');

const wordpressSiteUrl = Cypress.config('baseUrl');

// Function to fetch sitemap and parse XML to JSON
async function getSitemapUrls() {
    try {
      // cy.log('getSitemapUrls', wordpressSiteUrl);
      const response = await axios.get(`${wordpressSiteUrl}/sitemap.xml`);
      // cy.log('response: ', response);
      const parsedSitemap = await xml2js.parseStringPromise(response.data);
  
      // cy.log('parsedSitemap: ', parsedSitemap);
      const urls = parsedSitemap.urlset.url.map((entry) => entry.loc[0]);
      return urls;
    } catch (error) {
      cy.log('Error fetching sitemap:', error.message);
      return [];
    }
  }

before(async () => {
    const urls = await getSitemapUrls();
    Cypress.env('sitemapUrls', urls);
    cy.log('commands.js');
  })
