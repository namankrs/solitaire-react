import React, { Component } from "react";
import deckGenerator from "./deckGenerator";
import TableauView from "./TableauView";
import Foundations from "./FoundationsView";
import WastePilesView from "./WastePilesView";

class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      piles: [],
      wastePiles: Array(2).fill([]),
      foundationPiles: Array(4).fill([])
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
    const wastePiles = [deckCopy, []];
    this.setState({ piles: piles, wastePiles: wastePiles });
  }

  dropOnPile(pileIndex, event) {
    event.preventDefault();
    const toDropCardIndexes = event.dataTransfer.getData("text").split("_");
    const dragPileIndex = toDropCardIndexes[0];
    const dragCardIndex = toDropCardIndexes[1];
    const piles = this.state.piles;
    const draggedCards = piles[dragPileIndex].slice(dragCardIndex);
    const remainingCards = piles[dragPileIndex].slice(0, dragCardIndex);
    piles[dragPileIndex] = remainingCards;
    piles[pileIndex] = piles[pileIndex].concat(draggedCards);
    this.setState({ piles: piles });
  }

  resetWastePile() {
    if (this.state.wastePiles[0].length) return;
    const faceOnWastePile = this.state.wastePiles[1];
    faceOnWastePile.reverse();
    this.setState({ wastePiles: [faceOnWastePile, []] });
  }

  handleWastePile(event) {
    const wastePile = this.state.wastePiles[0];
    if (!wastePile.length) return;
    const faceOnWastePile = this.state.wastePiles[1];
    const clickedCard = wastePile[wastePile.length - 1];
    wastePile.pop();
    faceOnWastePile.push(clickedCard);
    this.setState({ wastePiles: [wastePile, faceOnWastePile] });
  }

  dropOnFoundations(event) {
    event.preventDefault();
    const toDropCardIndexes = event.dataTransfer.getData("text");
    console.log(toDropCardIndexes);
    console.log(event);
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
          <Foundations
            foundationPiles={this.state.foundationPiles}
            dropOnFoundationPile={this.dropOnFoundations.bind(this)}
          />
        </div>
        <TableauView
          piles={this.state.piles}
          dropOnPile={this.dropOnPile.bind(this)}
        />
      </div>
    );
  }
}

export default GameView;
