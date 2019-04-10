class Card {
  constructor(suite, color, number, unicode) {
    this.suite = suite;
    this.color = color;
    this.number = number;
    this.unicode = unicode;
    this.isOpen = false;
  }

  getColor() {
    if (this.isOpen) return this.color;
    return "black";
  }

  getUnicode() {
    if (this.isOpen) return this.unicode;
    return "&#x1F0A0";
  }

  open() {
    this.isOpen = true;
  }

  draggable() {
    return this.isOpen;
  }

  isAce() {
    return this.number === 1;
  }

  isKing() {
    return this.number === 13;
  }

  canBePlacedForPile(card) {
    return this.number === card.number + 1 && this.color != card.color;
  }

  canBePlacedForFoundation(card) {
    return (
      this.number === card.number - 1 &&
      this.color === card.color &&
      this.suite === card.suite
    );
  }
}

export default Card;
