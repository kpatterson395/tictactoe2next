import React from 'react'
import NewGame from './NewGame'

describe('<NewGame />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NewGame />)
  })
})