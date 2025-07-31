const morseMap = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..", 0: "-----", 1: ".----", 2: "..---",
  3: "...--", 4: "....-", 5: ".....", 6: "-....", 7: "--...",
  8: "---..", 9: "----.", " ": "/"
};

const reverseMorse = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v, k]));

function toMorse(text) {
  return text.toUpperCase().split('').map(c => morseMap[c] || '').join(' ');
}

function fromMorse(code) {
  return code.split(' ').map(c => reverseMorse[c] || '').join('');
}

const socket = new WebSocket(`ws://${location.host}`);

socket.onmessage = (event) => {
  const div = document.getElementById("messages");
  const decoded = fromMorse(event.data);
  div.innerHTML += `<div><b>Received:</b> ${decoded} <code>(${event.data})</code></div>`;
  div.scrollTop = div.scrollHeight;
};

function send() {
  const input = document.getElementById("input");
  const message = input.value.trim();
  if (!message) return;
  const morse = toMorse(message);
  socket.send(morse);
  const div = document.getElementById("messages");
  div.innerHTML += `<div><b>You:</b> ${message} <code>(${morse})</code></div>`;
  div.scrollTop = div.scrollHeight;
  input.value = '';
}
