import React from "react";

class PilesView extends React.Component {
  constructor(props) {
    super(props);
  }

  dragFromPile(event) {
    event.dataTransfer.setData("text", event.target.id);
  }

  allowDrop(event) {
    event.preventDefault();
  }

  render() {
    const toRenderPiles = this.props.piles.map((pile, pileIndex) => {
      const toRenderPile = pile.map((card, cardIndex) => (
        <div
          id={pileIndex + "_" + cardIndex}
          draggable={true}
          onDrop={this.props.dropOnPile.bind(this)}
          onDragStart={this.dragFromPile.bind(this)}
          onDragOver={this.allowDrop.bind(this)}
          className="card"
          style={{ color: card.color }}
          dangerouslySetInnerHTML={{
            __html: `${card.getUnicode()}`
          }}
        />
      ));
      return <div className="pile-column"> {toRenderPile}</div>;
    });
    return <div className="piles"> {toRenderPiles}</div>;
  }
}

export default PilesView;
