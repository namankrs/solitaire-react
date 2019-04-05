import React, { Component } from "react";
import deckGenerator from "./deckGenerator";
import PilesView from "./PilesView";
import FoundationPilesView from "./FoundationPilesView";
import WastePilesView from "./WastePilesView";

class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      piles: [],
      wastePiles: { 1: [], 2: [] },
      foundationPiles: { 1: [], 2: [], 3: [], 4: [] }
    };
  }

  componentDidMount() {
    this.setStates();
  }

  setStates() {
    const deck = deckGenerator();
    const deckCopy = deck.slice(0);
    const piles = [];
    for (let pileCount = 1; pileCount <= 7; pileCount++) {
      const pile = [];
      for (let cardCount = 0; cardCount < pileCount; cardCount++) {
        pile.push(deckCopy[0]);
        deckCopy.shift();
      }
      piles.push(pile);
    }
    const wastePiles = { 1: deckCopy, 2: [] };
    this.setState({ piles: piles, wastePiles: wastePiles });
  }

  dropOnPile(event) {
    event.preventDefault();
    const toDropCardIndexes = event.dataTransfer.getData("text").split("_");
    const dragPileIndex = toDropCardIndexes[0];
    const dragCardIndex = toDropCardIndexes[1];
    const toDropPileIndex = event.target.id.split("_")[0];
    const piles = this.state.piles;
    const draggedCards = piles[dragPileIndex].slice(dragCardIndex);
    const remainingCards = piles[dragPileIndex].slice(0, dragCardIndex);
    piles[dragPileIndex] = remainingCards;
    piles[toDropPileIndex] = piles[toDropPileIndex].concat(draggedCards);
    this.setState({ piles: piles });
  }

  resetWastePile() {
    if (this.state.wastePiles[1].length) return;
    const faceOnWastePile = this.state.wastePiles[2];
    faceOnWastePile.reverse();
    this.setState({ wastePiles: { 1: faceOnWastePile, 2: [] } });
  }

  handleWastePile(event) {
    const wastePile = this.state.wastePiles[1];
    const faceOnWastePile = this.state.wastePiles[2];
    const clickedCard = wastePile[wastePile.length - 1];
    wastePile.pop();
    faceOnWastePile.push(clickedCard);
    this.setState({ wastePiles: { 1: wastePile, 2: faceOnWastePile } });
  }

  dropOnFoundationPile(event) {
    event.preventDefault();
    const toDropCardIndexes = event.dataTransfer.getData("text");
    console.log(toDropCardIndexes);
  }

  render() {
    return (
      <div className="container">
        <div className="top-layer">
          <WastePilesView
            wastePiles={this.state.wastePiles}
            resetWastePile={this.resetWastePile.bind(this)}
            handleWastePile={this.handleWastePile.bind(this)}
          />
          <FoundationPilesView
            foundationPiles={this.state.foundationPiles}
            dropOnFoundationPile={this.dropOnFoundationPile.bind(this)}
          />
        </div>
        <PilesView
          piles={this.state.piles}
          dropOnPile={this.dropOnPile.bind(this)}
        />
      </div>
    );
  }
}

export default GameView;
