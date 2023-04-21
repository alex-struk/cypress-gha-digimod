require("@datashard/snapshot").register();

describe('spec.cy.js', () =>{
    it('should visit',()=>{
        cy.visit('/')
    })

    it('home page snapshot', () =>{
       cy.visit('/')
        //    cy.get({'sup':1}).snapshot({name:"homepage"})
        cy.get('html').snapshot({"snapshotName":"foo","snapshotPath": "cypress/snapshots",json: false});
    })
})