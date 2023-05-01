

describe('spec.cy.js', () =>{
    // it('should visit',()=>{
    //     cy.visit('/')
    // })

    // it('home page snapshot', () =>{
    //     cy.request('/').its('body', {log: false}).then(text => {
    //         cy.wrap({ html: text }).snapshot("test",{
    //             snapshotName: 'Home',
    //             snapshotPath: 'cypress/snapshots',
    //             json: true                           
    //           });
    //       });
    // })

    it('home page screenshot', () =>{

        // remove all js scripts
        // cy.intercept('*', (req) => {
        //     req.continue((res) => {
        //         
        //        // Modify the HTML response to include the CSP without affecting the existing head content
        //         res.body = res.body.replace(
        //             /(<head[^>]*>)/,
        //             `$1<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'none';">`
        //         );

        //         // Create a DOM parser to manipulate the HTML content
        //         const parser = new DOMParser();
        //         const doc = parser.parseFromString(res.body, 'text/html');

        //         // Remove all <script> elements from the <head> and <body> sections
        //         const scriptElements = doc.querySelectorAll('script');
        //         scriptElements.forEach((script) => script.remove());

        //         // Serialize the modified HTML back to a string
        //         const serializer = new XMLSerializer();
        //         res.body = serializer.serializeToString(doc);
        //     });
        //   });

        // cy.visit('https://github.com/bcgov/automated-testing/blob/main/.github/workflows/cypress-complex-auto.yaml');
        cy.visit('https://digital.gov.bc.ca/policies-standards/', {
            onBeforeLoad(win) {
                // Add a style element to the head of the document
                const styleElement = win.document.createElement('style');
                styleElement.innerHTML = 'html { scroll-behavior: auto !important; }';
                win.document.head.appendChild(styleElement);
            },
        });
        cy.wait(1000)
        cy.matchImage();
    })
})