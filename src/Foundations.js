import React from "react";
import CardView from "./CardView";
import Card from "./Card";

class Foundations extends React.Component {
  allowDrop(event) {
    event.preventDefault();
  }

  generateCard(pileIndex, card, cardIndex) {
    return (
      <CardView
        id={pileIndex + "_" + cardIndex}
        className="foundation-pile-card"
        card={card}
      />
    );
  }

  generateFoundation(pileIndex, toRenderPile) {
    return (
      <div
        id={"foundation_" + pileIndex}
        onDragOver={this.allowDrop.bind(this)}
        onDrop={this.props.dropOnFoundations.bind(null, pileIndex)}
        className="foundation-pile"
      >
        {toRenderPile}
      </div>
    );
  }

  render() {
    const foundationPiles = this.props.foundationPiles;
    const toRenderPiles = foundationPiles.map((foundationPile, pileIndex) => {
      const toProcessPile = foundationPile.slice();
      const toRenderPile = toProcessPile.map(
        this.generateCard.bind(null, pileIndex)
      );
      return this.generateFoundation(pileIndex, toRenderPile);
    });
    return <div className="foundation-piles">{toRenderPiles}</div>;
  }
}

export default Foundations;
