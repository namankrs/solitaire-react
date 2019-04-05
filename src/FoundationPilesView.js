import React from "react";
import CardView from "./CardView";

class FoundationPilesView extends React.Component {
  allowDrop(event) {
    event.preventDefault();
  }

  generateCard(pileIndex, card, cardIndex) {
    return (
      <CardView
        id={pileIndex + "_" + cardIndex}
        draggable={true}
        onDragStart={this.dragFromFoundationPile.bind(this)}
        className="foundation-pile-card"
        card={card}
      />
    );
  }

  generateFoundation(pileIndex, toRenderPile) {
    return (
      <div
        id={pileIndex}
        onDragOver={this.allowDrop.bind(this)}
        onDrop={this.props.dropOnFoundationPile}
        className="foundation-pile"
      >
        {toRenderPile}
      </div>
    );
  }

  render() {
    const foundationPiles = this.props.foundationPiles;
    const toRenderPiles = Object.keys(foundationPiles).map(
      (foundationPile, pileIndex) => {
        const pile = foundationPiles[foundationPile];
        const toRenderPile = pile.map(this.generateCard.bind(null, pileIndex));
        return this.generateFoundation(pileIndex, toRenderPile);
      }
    );
    return <div className="foundation-piles">{toRenderPiles}</div>;
  }
}

export default FoundationPilesView;
