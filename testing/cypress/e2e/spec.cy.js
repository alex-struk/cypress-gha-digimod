

describe('spec.cy.js', () =>{
    it('should visit',()=>{
        cy.visit('/')
    })

    it('home page snapshot', () =>{
        cy.request('/').its('body', {log: false}).then(text => {
            cy.wrap({ html: text }).snapshot("test",{
                snapshotName: 'Home',
                snapshotPath: 'cypress/snapshots',
                json: true                           
              });
          });
    })
})