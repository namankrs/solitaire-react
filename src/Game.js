import deckGenerator from "./deckGenerator";

class Game {
  constructor() {
    this.deck = deckGenerator();
  }
}

export default Game;
