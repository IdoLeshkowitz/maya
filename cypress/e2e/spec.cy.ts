describe('template spec', () => {
    it('passes', () => {
        cy.visit('http://localhost:3000?prolificid=1234')
        /* check that the text "Start to the session is displayed" */
        cy.contains('Start to the session')
        /* welcome scrren press next */
        cy.get('[data-testid="common-button"]').click()
        /* consent screen should cotain the text "Informed Consent" */
        cy.contains('Informed Consent')
        /* mark i agree */
        cy.get('input').click()
        /* press next */
        cy.get('[data-testid="common-button"]').click()
        /* press next */
        cy.get('[data-testid="common-button"]').click()
        /* press next */
        cy.get('[data-testid="common-button"]').click()
    })
})