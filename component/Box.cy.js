import React from 'react'
import Box from './Box'

describe('<Box />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Box />)
  })
})