// Run Cypress tests with the fetched URLs
  function runTests(urls) {
    let i = 0;
    let allBrokenLinks = [];
    let currentUrl = {'url':''};
    // urls = ['https://digital.gov.bc.ca/learning/',
    //         'https://digital.gov.bc.ca/contact/'];

    urls.every((pageUrl) =>  {
        i++;
        
        
        // if (i<49)
        //     return true;

        // url = 'https://wodpress-version-bump.apps.silver.devops.gov.bc.ca/cloud/public-cloud/';
       
        // Define a variable to store broken links
        it('broken links test for ' + pageUrl, () => {

            currentUrl['url'] = pageUrl;
            let brokenLinks = [];
        
            cy.visit(pageUrl);
        
            // Collect all the links on the page
            cy.get('a')
                .each(($link, index, $links) => {
                    // Get the link href attribute
                    const url = $link.prop('href');
        
                    // Skip "#" links and email links
                    if (url.startsWith('#') || url.startsWith('mailto:') || url == '') {
                        return;
                    }
        
                    cy.log('requesting: ', url);
        
                    // Make a request to the link and check if it returns a 200 status code
                    cy.request({
                        url: url,
                        failOnStatusCode: false, // Prevent the test from failing on the first broken link
                        timeout: 30000 // Custom timeout value in milliseconds, e.g., 30 seconds
                    })
                        .then((response) => {
                            if (response.status !== 200 && response.status !== 401) {
                                // Add the broken link to the brokenLinks array
                                brokenLinks.push({ url: url, status: response.status });
                            }
        
                            // Check if it's the last link
                            if (index === $links.length - 1) {
                                finishTest(brokenLinks, pageUrl, allBrokenLinks);
                            }
                        }
                        // , (error) => {
                        //     // Handle the timeout error by adding the link to the brokenLinks array with a custom status message
                        //     if (error.message.includes('timed out')) {
                        //         brokenLinks.push({ url: url, status: 'Timeout' });
                        //     }
        
                        //     // Check if it's the last link
                        //     if (index === $links.length - 1) {
                        //         finishTest(brokenLinks, pageUrl, allBrokenLinks);
                        //     }
                        // }
                        );
                });
        })
        
        function finishTest(brokenLinks, pageUrl, allBrokenLinks) {
            if (brokenLinks.length > 0) {
                cy.log('pushing report item: ', JSON.stringify({ 'page': pageUrl, 'brokenLinks': brokenLinks }))
                allBrokenLinks.push({ 'page': pageUrl, 'brokenLinks': brokenLinks });
            }
            cy.wait(100);
            expect(brokenLinks).to.be.empty;
        }

        // if (i>3){
        //     return false;
        // }
        return true;
    });

    after(() => {
        if (allBrokenLinks.length!=0){
            let report = allBrokenLinks.map((entry) => {
                let brokenLinksString = entry.brokenLinks.map((brokenLink) => {
                    return `  URL: ${brokenLink.url}\n  Status: ${brokenLink.status}\n`;
                }).join('\n');
                return `Page: ${entry.page}\nBroken Links:\n${brokenLinksString}`;
            }).join('\n\n');

            cy.writeFile('cypress/e2e/broken-links-report/report.txt', report);
        }
    })
}

describe('broken-link-checker',  () =>{
    runTests(Cypress.env('sitemapUrls'));
});