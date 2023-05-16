import React from 'react'
import Consent from './consent'

describe('<Consent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Consent />)
  })
})