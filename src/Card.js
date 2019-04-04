class Card {
  constructor(suite, color, number, unicode) {
    this.suite = suite;
    this.color = color;
    this.number = number;
    this.unicode = unicode;
  }

  getUnicode() {
    return this.unicode;
  }
}

export default Card;
