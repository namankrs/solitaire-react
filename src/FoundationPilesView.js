import React from "react";

class FoundationPilesView extends React.Component {
  constructor(props) {
    super(props);
  }

  dragFromFoundationPile(event) {
    console.log(event.target.id);
    event.dataTransfer.setData("text", event.target.id);
  }

  allowDrop(event) {
    event.preventDefault();
  }

  render() {
    const foundationPiles = this.props.foundationPiles;
    const toRenderPiles = Object.keys(foundationPiles).map(
      (foundationPile, pileIndex) => {
        const pile = foundationPiles[foundationPile];
        const toRenderPile = pile.map((card, cardIndex) => (
          <div
            id={pileIndex + "_" + cardIndex}
            draggable={true}
            onDrop={this.props.dropOnFoundationPile}
            onDragStart={this.dragFromFoundationPile.bind(this)}
            onDragOver={this.allowDrop.bind(this)}
            className="foundation-pile-card"
            style={{ color: card.color }}
            dangerouslySetInnerHTML={{
              __html: `${card.getUnicode()}`
            }}
          />
        ));
        return <div className="foundation-pile">{toRenderPile}</div>;
      }
    );
    return <div className="foundation-piles">{toRenderPiles}</div>;
  }
}

export default FoundationPilesView;
