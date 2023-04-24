Interactive Tic-Tac-Toe App

This is an interactive tic-tac-toe game app built using Next.js. The game allows two players to play against each other on a 3x3 grid. You can either invite another human to play against you in a separate browser window with a unique game code, or you can play against the computer. The game is won by the player who places three of their marks (either X or O) in a horizontal, vertical, or diagonal row.

To play the current production version, navigate to https://tictactoe2next.vercel.app/


Installation

To run the app locally, you will need to have Node installed on your machine. Once you have the required dependencies installed, you can clone the repository to your local machine by running the following command in your terminal:

sh
Copy code
git clone https://github.com/kpatterson395/tictactoe2next
Usage
To start the app, navigate to the directory where you cloned the repository and run the following command:

sh
Copy code
npm run dev
Once the app is running, open your web browser and go to http://localhost:3000. You should see the tic-tac-toe game board displayed on the screen. To start playing, select the game type you would like to play on the new game modal.

On each turn, the current player should click on one of the unoccupied squares on the board to place their mark (either X or O). The game will automatically switch to the other player's turn after each move. The game will end when one player wins by getting three of their marks in a row, or when all squares on the board are filled and no winner is declared.

Contributing

If you find any bugs or issues with the app, feel free to open an issue in the GitHub repository or submit a pull request with your proposed changes. Any contributions are welcome and appreciated!
