import React from 'react'
import GameOver from './GameOver'

describe('<GameOver />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GameOver />)
  })
})