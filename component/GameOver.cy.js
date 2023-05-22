import React from "react";
import GameOver from "./GameOver";

describe("<GameOver />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <GameOver
        gamePlay="player1"
        winner={false}
        handleReset={() => {}}
        handleClose={() => {}}
      />
    );
  });
});
