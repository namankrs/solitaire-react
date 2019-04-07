import React from "react";
import CardView from "./CardView";

class FoundationsView extends React.Component {
  allowDrop(event) {
    event.preventDefault();
  }

  generateCard(pileIndex, card, cardIndex) {
    return (
      <CardView
        id={pileIndex + "_" + cardIndex}
        draggable={true}
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
        onDrop={this.props.dropOnFoundations}
        className="foundation-pile"
      >
        {toRenderPile}
      </div>
    );
  }

  render() {
    const foundationPiles = this.props.foundationPiles;
    const toRenderPiles = foundationPiles.map((foundationPile, pileIndex) => {
      const toRenderPile = foundationPile.map(
        this.generateCard.bind(null, pileIndex)
      );
      return this.generateFoundation(pileIndex, toRenderPile);
    });
    return <div className="foundation-piles">{toRenderPiles}</div>;
  }
}

export default FoundationsView;
