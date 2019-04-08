class Card {
  constructor(suite, color, number, unicode) {
    this.suite = suite;
    this.color = color;
    this.number = number;
    this.unicode = unicode;
    this.isOpen = false;
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
}

export default Card;
