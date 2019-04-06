import React from "react";
import CardView from "./CardView";
import Card from "./Card";

class WastePilesView extends React.Component {
  generateCard(pileIndex, card, cardIndex) {
    if (pileIndex === 0) card = new Card(null, "black", null, "&#x1F0A0");
    return (
      <CardView
        id={pileIndex + "_" + cardIndex}
        onClick={onclick}
        className="waste-pile-card"
        card={card}
      />
    );
  }

  generatePile(wastePiles, wastePile, pileIndex) {
    let onclick = this.props.resetWastePile;
    if (pileIndex === 0) onclick = this.props.handleWastePile;
    const toRenderPile = wastePiles[wastePile].map(
      this.generateCard.bind(null, pileIndex)
    );
    return (
      <div onClick={onclick} className="waste-pile">
        {toRenderPile}
      </div>
    );
  }

  render() {
    const wastePiles = this.props.wastePiles;
    const toRenderWastePiles = Object.keys(wastePiles).map(
      this.generatePile.bind(this, wastePiles)
    );
    return <div className="waste-piles">{toRenderWastePiles}</div>;
  }
}

export default WastePilesView;
