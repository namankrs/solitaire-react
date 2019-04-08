import React, { Component } from "react";
import deckGenerator from "./deckGenerator";
import Tableau from "./Tableau";
import Foundations from "./Foundations";
import WastePiles from "./WastePiles";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      piles: [],
      wastePiles: [[], []],
      foundationPiles: [[], [], [], []]
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
      pile[pileCount - 1].open();
      piles.push(pile);
    }
    const wastePiles = [deckCopy, []];
    this.setState({ piles: piles, wastePiles: wastePiles });
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
    clickedCard.open();
    wastePile.pop();
    faceOnWastePile.push(clickedCard);
    this.setState({ wastePiles: [wastePile, faceOnWastePile] });
  }

  _dropOnPileFromWaste(piles, pileIndex) {
    const wastePiles = this.state.wastePiles;
    const draggedCard = wastePiles[1].pop();
    piles[pileIndex].push(draggedCard);
    this.setState({ piles: piles, wastePiles: wastePiles });
  }

  _dropOnPileFromPile(toDropCardIndexes, piles, pileIndex) {
    const dragPileIndex = toDropCardIndexes[0];
    const dragCardIndex = toDropCardIndexes[1];
    const draggedCards = piles[dragPileIndex].slice(dragCardIndex);
    const remainingCards = piles[dragPileIndex].slice(0, dragCardIndex);
    remainingCards.length && remainingCards[remainingCards.length - 1].open();
    piles[dragPileIndex] = remainingCards;
    piles[pileIndex] = piles[pileIndex].concat(draggedCards);
    this.setState({ piles: piles });
  }

  dropOnPile(pileIndex, event) {
    event.preventDefault();
    const toDropCardIndexes = event.dataTransfer.getData("text").split("_");
    const piles = this.state.piles;
    if (toDropCardIndexes.length === 1) {
      return this._dropOnPileFromWaste(piles, pileIndex);
    }
    this._dropOnPileFromPile(toDropCardIndexes, piles, pileIndex);
  }

  _dropOnFoundationFromWaste(foundationPiles, foundationIndex) {
    const wastePiles = this.state.wastePiles;
    const draggedCard = wastePiles[1].pop();
    foundationPiles[foundationIndex].push(draggedCard);
    this.setState({
      foundationPiles: foundationPiles,
      wastePiles: wastePiles
    });
  }

  _dropOnFoundationFromPile(
    toDropCardIndexes,
    foundationPiles,
    foundationIndex
  ) {
    const piles = this.state.piles;
    const pileIndex = toDropCardIndexes[0];
    const cardIndex = toDropCardIndexes[1];
    const pileLength = piles[pileIndex].length;
    if (pileLength !== +cardIndex + 1) return;
    const card = piles[pileIndex][cardIndex];
    foundationPiles[foundationIndex].push(card);
    piles[pileIndex].pop();
    pileLength - 1 && piles[pileIndex][pileLength - 2].open();
    this.setState({ piles: piles, foundationPiles: foundationPiles });
  }

  dropOnFoundations(foundationIndex, event) {
    event.preventDefault();
    const toDropCardIndexes = event.dataTransfer.getData("text").split("_");
    const foundationPiles = this.state.foundationPiles;
    if (toDropCardIndexes.length === 1) {
      return this._dropOnFoundationFromWaste(foundationPiles, foundationIndex);
    }
    this._dropOnFoundationFromPile(
      toDropCardIndexes,
      foundationPiles,
      foundationIndex
    );
  }

  render() {
    return (
      <div className="container">
        <div className="top-layer">
          <WastePiles
            wastePiles={this.state.wastePiles}
            resetWastePile={this.resetWastePile.bind(this)}
            handleWastePile={this.handleWastePile.bind(this)}
          />
          <Foundations
            foundationPiles={this.state.foundationPiles}
            dropOnFoundations={this.dropOnFoundations.bind(this)}
          />
        </div>
        <Tableau
          piles={this.state.piles}
          dropOnPile={this.dropOnPile.bind(this)}
        />
      </div>
    );
  }
}

export default Game;
