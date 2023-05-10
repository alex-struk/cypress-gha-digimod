describe('spec.cy.js', () =>{
    it('home page screenshot', () =>{

        // cy.visit('https://github.com/bcgov/automated-testing/blob/main/.github/workflows/cypress-complex-auto.yaml');
        cy.visit('https://digital.gov.bc.ca/', {
            onBeforeLoad(win) {
                // Add a style element to the head of the document
                const styleElement = win.document.createElement('style');
                styleElement.innerHTML = 'html { scroll-behavior: auto !important; }';
                win.document.head.appendChild(styleElement);
            },
        });

        cy.get('.back-to-top', { timeout: 10000 });
        
        cy.document().then((doc) => {

            cy.viewport(1440, 900);
            cy.wait(100)
            const backToTop = doc.querySelectorAll('.back-to-top');
            backToTop.forEach((element) => element.remove());
            
            // Find all images with loading="lazy" attribute using jQuery
            const lazyImgs = doc.querySelectorAll('img[loading="lazy"]');

            // If there are images with the "lazy" attribute
            if (lazyImgs.length) {
                // Remove the attribute from each image
                lazyImgs.forEach(($img) => {
                    $img.removeAttribute('loading');
                });
            }

            cy.matchImage({
                maxDiffThreshold: 0.0,
                title: 'homepage'
            });
        });
        
    })

})