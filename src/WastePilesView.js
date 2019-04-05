import React from "react";
import CardView from "./CardView";

class WastePilesView extends React.Component {
  generateCard(pileIndex, onclick, card, cardIndex) {
    return (
      <CardView
        id={pileIndex + "_" + cardIndex}
        onClick={onclick}
        className="waste-pile-card"
        card={card}
      />
    );
  }

  render() {
    const wastePiles = this.props.wastePiles;
    const toRenderWastePiles = Object.keys(wastePiles).map(
      (wastePile, pileIndex) => {
        let onclick = this.props.resetWastePile.bind(this);
        if (pileIndex === 0) onclick = this.props.handleWastePile;
        const toRenderPile = wastePiles[wastePile].map(
          this.generateCard.bind(null, pileIndex, onclick)
        );
        return <div className="waste-pile">{toRenderPile}</div>;
      }
    );
    return <div className="waste-piles">{toRenderWastePiles}</div>;
  }
}

export default WastePilesView;
