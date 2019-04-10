import { Component } from "react";
import React from "react";

class CardView extends Component {
  drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }

  render() {
    const { onClick, id, draggable, className, card } = this.props;
    return (
      <div
        key={id}
        id={id}
        draggable={draggable}
        onDragStart={this.drag.bind(this)}
        className={className}
        onClick={onClick}
        style={{ color: card.getColor() }}
        dangerouslySetInnerHTML={{
          __html: `${card.getUnicode()}`
        }}
      />
    );
  }
}

export default CardView;
