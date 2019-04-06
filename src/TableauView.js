import React from "react";
import CardView from "./CardView";

class TableuView extends React.Component {
  allowDrop(event) {
    event.preventDefault();
  }

  generateCard(pileIndex, card, cardIndex) {
    return (
      <CardView
        id={pileIndex + "_" + cardIndex}
        draggable={true}
        className="card"
        card={card}
      />
    );
  }

  generatePile(pileIndex, toRenderPile) {
    return (
      <div
        id={pileIndex}
        onDragOver={this.allowDrop.bind(this)}
        onDrop={this.props.dropOnPile.bind(null, pileIndex)}
        className="pile-column"
      >
        {toRenderPile}
      </div>
    );
  }

  render() {
    const toRenderPiles = this.props.piles.map((pile, pileIndex) => {
      const toRenderPile = pile.map(this.generateCard.bind(null, pileIndex));
      return this.generatePile(pileIndex, toRenderPile);
    });
    return <div className="piles"> {toRenderPiles}</div>;
  }
}

export default TableuView;
