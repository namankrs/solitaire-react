import Card from "./Card";
import { shuffle } from "lodash";

function deckGenerator() {
  const suites = {
    spade: { color: "black", unicode: "&#x1F0A" },
    heart: { color: "red", unicode: "&#x1F0B" },
    diamond: { color: "red", unicode: "&#x1F0C" },
    club: { color: "black", unicode: "&#x1F0D" }
  };
  const deck = [];

  Object.keys(suites).forEach(suite => {
    const color = suites[suite].color;
    const unicodePrefix = suites[suite].unicode;
    for (let cardNumber = 1; cardNumber <= 14; cardNumber++) {
      let unicode = unicodePrefix + cardNumber.toString(16);
      if (cardNumber === 12) continue;
      deck.push(new Card(suite, color, cardNumber, unicode));
    }
  });
  return shuffle(deck);
}

export default deckGenerator;
