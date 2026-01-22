export function showResult(message) {
  const screen = document.getElementById("Result_Window");
  const text = document.getElementById("Result_Text");
  text.textContent = message;
  screen.style.display = "flex";
}

export function checkWinner(hero, enemy, addLog) {
  const { hp: chHp, name: chName } = hero;
  const { hp: enHp, name: enName } = enemy;

  if (chHp === 0 && enHp === 0) {
    showResult("Нічия!");
    addLog("Нічия!");
    return true;
  }
  if (chHp === 0) {
    showResult(`🎉 ${enName} Переміг! 🎉`);
    addLog(`${enName} виграв бій!`);
    return true;
  }
  if (enHp === 0) {
    showResult(`🎉 ${chName} Переміг! 🎉`);
    addLog(`${chName} виграв бій!`);
    return true;
  }
  return false;
}
