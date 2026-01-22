import { Pokemon } from "./pokemon.js";
import { clickCounter, showResult } from "./functions.js";
import { pokemons } from "./pokemons.js";

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
window.addLog = addLog;

const pikachuData = pokemons.find(p => p.name === "Pikachu");

const enemies = pokemons.filter(p => p.name !== "Pikachu");
const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];

const player1 = new Pokemon("player1", pikachuData);
player1.isHero = true;

function nextEnemy() {
  const enemies = pokemons.filter(p => p.name !== "Pikachu");
  const newEnemy = enemies[Math.floor(Math.random() * enemies.length)];

  player2.name = newEnemy.name;
  player2.hp = player2.maxHp = newEnemy.hp; 
  player2.attacks = newEnemy.attacks;

  document.getElementById("img-player2").src = newEnemy.img;
  document.getElementById("name-player2").textContent = newEnemy.name;
  player2.updateHp();

  addLog(`Новий суперник — ${newEnemy.name}!`, "enemy");
}

document.getElementById("Restart_Button").addEventListener("click", () => {
  location.reload();
});

const player2 = new Pokemon("player2", randomEnemy);

document.getElementById("img-player2").src = randomEnemy.img;
document.getElementById("name-player2").textContent = randomEnemy.name;


function Winner() {
  const { hp: chHp, name: chName } = player1;
  const { hp: enHp, name: enName } = player2;

  if (chHp === 0 && enHp === 0) {
    showResult("Нічия!");
    addLog("Нічия!");
    document.getElementById("Restart_Button").style.display = "block";
    return true;
  }

  if (chHp === 0) {
    showResult(`💀 ${chName} загинув! ${enName} переміг! 💀`);
    addLog(`${enName} виграв бій!`);
    document.getElementById("Restart_Button").style.display = "block";
    return true;
  }

  if (enHp === 0) {
    addLog(`${chName} виграв бій!`);
    showResult(`🎉 ${chName} Переміг! 🎉`);

    document.getElementById("Restart_Button").style.display = "none";

    setTimeout(() => {
      document.getElementById("Result_Window").style.display = "none";
      nextEnemy();
    }, 1000);

    return true;
  }

  return false;
}


const controlDiv = document.querySelector(".control");

player1.attacks.forEach(attack => {
  const btn = document.createElement("button");
  btn.classList.add("button");
  btn.textContent = `${attack.name} (${attack.maxCount})`;
  controlDiv.appendChild(btn);

  let count = 0; 
  btn.addEventListener("click", () => {
    if (count < attack.maxCount) {
      count++;
      const remaining = attack.maxCount - count;
      btn.textContent = `${attack.name} (${remaining})`;
      player1.attack(player2, attack.minDamage, attack.maxDamage);
      player2.attack(player1);
      Winner();

      if (remaining === 0) {
        btn.disabled = true;
        btn.textContent = `${attack.name} (0)`;
      }
    }
  });
});

console.log("Атаки Пікачу:", pikachuData.attacks);
