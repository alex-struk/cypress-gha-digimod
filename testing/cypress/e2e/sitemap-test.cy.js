const urlSlug = require('url-slug');

// Run Cypress tests with the fetched URLs
  function runTests(urls) {
    let i = 0;
    urls.every((url) =>  {
        i++;
        cy.log('running test for: ', url);
        cy.request(url).its('body', {log: false}).then(text => {
            cy.wrap({ html: text }).snapshot("test",{
                    snapshotName: urlSlug.convert(url),
                    snapshotPath: 'cypress/snapshots',
                    json: true                           
                });
        });
        // if (i>2){
        //     return false;
        // }
        return true;
    });
}

async function main(urls) {
  runTests(Cypress.env('sitemapUrls'));
};

describe('sitemap-test',  () =>{
    
    // it('validateSitemap', ()=>{
    //     main();
    // })
});