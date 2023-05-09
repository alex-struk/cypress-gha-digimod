// Run Cypress tests with the fetched URLs
  function runTests(urls) {
    let i = 0;
    urls.every((url) =>  {
        i++;
        cy.log('running test for: ', url);
       
        cy.request({url: url, failOnStatusCode: false}).its('status').should('not.equal', 404)

        // cy.request(url).its('body', {log: false}).then(text => {
        //     cy.wrap({ html: text }).snapshot("test",{
        //             snapshotName: urlSlug.convert(url),
        //             snapshotPath: 'cypress/snapshots',
        //             json: true                           
        //         });
        // });

        return true;
    });
}

function main() {
  runTests(Cypress.env('missingUrls'));
};

describe('missing-pages-test',  () =>{
    
    // check that pages that are now missing have redirects setup
    it('validateSitemap', ()=>{
        main();
    })
});