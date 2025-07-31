const morseMap = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..", 0: "-----", 1: ".----", 2: "..---",
  3: "...--", 4: "....-", 5: ".....", 6: "-....", 7: "--...",
  8: "---..", 9: "----.", " ": "/"
};

const reverseMorse = Object.fromEntries(
  Object.entries(morseMap).map(([k, v]) => [v, k])
);

function toMorse(text) {
  return text.toUpperCase().split('').map(c => morseMap[c] || '').join(' ');
}

function fromMorse(code) {
  return code.split(' ').map(c => reverseMorse[c] || '').join('');
}

module.exports = { toMorse, fromMorse };
