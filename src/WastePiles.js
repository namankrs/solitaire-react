import React from "react";
import CardView from "./CardView";
import Card from "./Card";

class WastePiles extends React.Component {
  generateCard(pileIndex, card, cardIndex) {
    let draggable = true;
    if (pileIndex === 0) {
      card = new Card(null, "black", null, "&#x1F0A0");
      draggable = false;
    }
    return (
      <CardView
        id={cardIndex}
        draggable={draggable}
        onClick={onclick}
        className="waste-pile-card"
        card={card}
      />
    );
  }

  generatePile(wastePile, pileIndex) {
    let onclick = this.props.resetWastePile;
    if (pileIndex === 0) onclick = this.props.handleWastePile;
    const toRenderPile = wastePile.map(this.generateCard.bind(null, pileIndex));
    return (
      <div onClick={onclick} className="waste-pile">
        {toRenderPile}
      </div>
    );
  }

  render() {
    const wastePiles = this.props.wastePiles;
    const toRenderWastePiles = wastePiles.map(this.generatePile.bind(this));
    return <div className="waste-piles">{toRenderWastePiles}</div>;
  }
}

export default WastePiles;
