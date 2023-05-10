// Run Cypress tests with the fetched URLs
  function runTests(urls) {
    let i = 0;
    let allBrokenLinks = [];
    let currentUrl = {'url':''};
    urls.every((url) =>  {
        i++;
        currentUrl['url'] = url;
        
        // if (i<49)
        //     return true;

        // url = 'https://wodpress-version-bump.apps.silver.devops.gov.bc.ca/cloud/public-cloud/';
       
        // Define a variable to store broken links
        it('broken links test for '+url, ()=>{
            let brokenLinks = [];

            cy.visit(url);

            // Collect all the links on the page
            cy.get('a')
            .each(($link, index, $links) => {
                // Get the link href attribute
                const url = $link.prop('href');

                // Skip "#" links and email links
                if (url.startsWith('#') || url.startsWith('mailto:')) {
                    return;
                }

                // Make a request to the link and check if it returns a 200 status code
                cy.request({
                url: url,
                failOnStatusCode: false // Prevent the test from failing on the first broken link
                })
                .then((response) => {
                    if (response.status !== 200) {
                        // Add the broken link to the brokenLinks array
                        brokenLinks.push({ url: url, status: response.status });
                    }

                    // If it's the last link, check if there are any broken links
                    if (index === $links.length - 1) {
                        if (brokenLinks.length>0)
                            allBrokenLinks.push({'page':url,'brokenLinks':brokenLinks});

                        expect(brokenLinks).to.be.empty;
                    }
                });
            });
        })

        // if (i>2){
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