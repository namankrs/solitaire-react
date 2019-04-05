import React from "react";

class WastePilesView extends React.Component {
  render() {
    const wastePiles = this.props.wastePiles;
    const toRenderWastePiles = Object.keys(wastePiles).map(
      (wastePile, pileIndex) => {
        let onclick = this.props.resetWastePile.bind(this);
        if (pileIndex === 0) onclick = this.props.handleWastePile.bind(this);
        const toRenderPile = wastePiles[wastePile].map((card, cardIndex) => (
          <div
            key={pileIndex + "_" + cardIndex}
            id={pileIndex + "_" + cardIndex}
            onClick={onclick}
            className="waste-pile-card"
            style={{ color: card.color }}
            dangerouslySetInnerHTML={{
              __html: `${card.getUnicode()}`
            }}
          />
        ));
        return <div className="waste-pile">{toRenderPile}</div>;
      }
    );
    return <div className="waste-piles">{toRenderWastePiles}</div>;
  }
}

export default WastePilesView;
