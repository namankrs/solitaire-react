import React, { Component } from "react";
import "./App.css";
import deckGenerator from "./deckGenerator";

class App extends Component {
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

  generatePiles() {
    const toRenderPiles = this.state.piles.map(pile => {
      const toRenderPile = pile.map(card => (
        <div
          className="card"
          style={{ color: card.color }}
          dangerouslySetInnerHTML={{
            __html: `${card.getUnicode()}`
          }}
        />
      ));
      return <div className="pile-column"> {toRenderPile}</div>;
    });
    return toRenderPiles;
  }

  handleWastePile() {}

  generateWastePiles() {
    const wastePiles = this.state.wastePiles;
    const toRenderWastePiles = Object.keys(wastePiles).map(wastePile => {
      const toRenderPile = wastePiles[wastePile].map(card => (
        <div
          className="waste-pile-card"
          style={{ color: card.color }}
          dangerouslySetInnerHTML={{
            __html: `${card.getUnicode()}`
          }}
        />
      ));
      return <div className="waste-pile">{toRenderPile}</div>;
    });
    return <div className="waste-piles">{toRenderWastePiles}</div>;
  }

  generateFoundationPiles() {
    const foundationPiles = this.state.foundationPiles;
    const toRenderPiles = Object.keys(foundationPiles).map(foundationPile => {
      const toRenderPile = foundationPiles[foundationPile].map(card => (
        <div
          className="foundation-pile-card"
          style={{ color: card.color }}
          dangerouslySetInnerHTML={{
            __html: `${card.getUnicode()}`
          }}
        />
      ));
      return <div className="foundation-pile">{toRenderPile}</div>;
    });
    return <div className="foundation-piles">{toRenderPiles}</div>;
  }

  render() {
    return (
      <div className="container">
        <div className="top-layer">
          {this.generateWastePiles()}
          {this.generateFoundationPiles()}
        </div>
        <div className="piles"> {this.generatePiles()}</div>
      </div>
    );
  }
}

export default App;
