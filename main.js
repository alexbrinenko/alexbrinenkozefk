import { Pokemon } from "./pokemon.js";
import { checkWinner } from "./result.js";
import { clickCounter } from "./counter.js";

const logsDiv = document.createElement("div");
logsDiv.id = "logs";
document.body.appendChild(logsDiv);

function addLog(message, type = "neutral") {
  const logs = document.getElementById("logs");
  const p = document.createElement("p");
  p.textContent = message;

  if (type === "hero") p.style.color = "lime";
  else if (type === "enemy") p.style.color = "red";
  else p.style.color = "white";

  logs.prepend(p);
}

const character = new Pokemon("character", "Pikachu", true);
const enemy = new Pokemon("enemy", "Charmander");

document.querySelectorAll("button").forEach(btn => {
  const handleClick = clickCounter(6);
  btn.addEventListener("click", () => handleClick(btn));
});

document.getElementById("dbtn-kick").addEventListener("click", () => {
  character.attack(enemy, addLog);
  enemy.attack(character, addLog);
  if (checkWinner(character, enemy, addLog)) return;
});

document.getElementById("kbtn-kick").addEventListener("click", () => {
  character.attack(enemy, addLog, 10, 25);
  enemy.attack(character, addLog, 5, 15);
  if (checkWinner(character, enemy, addLog)) return;
});

document.getElementById("Restart_Button").addEventListener("click", () => {
  location.reload();
});
