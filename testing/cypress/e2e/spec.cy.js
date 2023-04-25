

describe('spec.cy.js', () =>{
    it('should visit',()=>{
        cy.visit('/')
    })

    it('home page snapshot', () =>{
    //    cy.visit('https://google.com')
    //    cy.get('html').snapshot({"snapshotName":"foo","snapshotPath": "cypress/snapshots",json: false});
        // let html = cy.get('html');
        // html.snapshot("bar",{
        //     snapshotName: 'Snapshot Name',          // Overwrite the generated Snapshot name
        //     snapshotPath: 'cypress/snapshots', // Overwrite where the Snapshot should be stored
        //     json: true                           // convert DOM elements into JSON
        //   });
    })
})