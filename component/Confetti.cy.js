import React from 'react'
import Confetti from './Confetti'

describe('<Confetti />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Confetti />)
  })
})