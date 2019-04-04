import React, { Component } from "react";
import "./App.css";
import deckGenerator from "./deckGenerator";
import { shuffle } from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { facedUpwastePile: [], wastePile: [] };
  }

  generatePiles(pilesStack) {
    const stackCopy = pilesStack.slice(0);
    const piles = [];
    for (let pileCount = 1; pileCount <= 7; pileCount++) {
      const pile = [];
      for (let cardCount = 0; cardCount < pileCount; cardCount++) {
        pile.push(
          <div
            className="card"
            style={{ color: stackCopy[0].color }}
            dangerouslySetInnerHTML={{
              __html: `${stackCopy[0].getUnicode()}`
            }}
          />
        );
        stackCopy.shift();
      }
      piles.push(<div className="pile-column">{pile}</div>);
    }
    return piles;
  }

  generateDeck() {
    const deck = deckGenerator();
    const shuffledDeck = shuffle(deck);
    const pilesStack = shuffledDeck.slice(0, 28);
    const wastePile = shuffledDeck.slice(28);
    const cards = this.generatePiles(pilesStack);
    return cards;
  }

  handleWastePile() {}

  generateWastePiles() {
    return (
      <div className="waste-piles">
        <div
          className="waste-pile"
          onClick={this.handleWastePile}
          dangerouslySetInnerHTML={{
            __html: "&#X1F0A0"
          }}
        />
        <div className="faced-up-waste-pile" />
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="top-layer">
          {this.generateWastePiles()}
          {/* <div className="waste-piles" /> */}
          <div className="foundation-piles">
            <div className="foundation-pile" />
            <div className="foundation-pile" />
            <div className="foundation-pile" />
            <div className="foundation-pile" />
          </div>
        </div>
        <div className="piles"> {this.generateDeck()}</div>
      </div>
    );
  }
}

export default App;
