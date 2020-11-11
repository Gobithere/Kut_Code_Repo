const monsterHealthBar = document.getElementById("monster-health");
const playerHealthBar = document.getElementById("player-health");
const bonusLifeEl = document.getElementById("bonus-life");

const attackBtn = document.getElementById("attack-btn");
const strongAttackBtn = document.getElementById("strong-attack-btn");
const healBtn = document.getElementById("heal-btn");
const logBtn = document.getElementById("log-btn");

function adjustHealthBars(maxLife) {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife; 
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
}

function dealMonsterDamage(damage) {          
  const dealtDamagetomonster = Math.random() * damage;
  monsterHealthBar.value -=dealtDamagetomonster;
  return dealtDamagetomonster;
}

function dealPlayerDamage(damage) {
  const dealtDamagetoplayer = Math.random() * damage;
  playerHealthBar.value -=dealtDamagetoplayer;           //+playerHealthBar.value 
  return dealtDamagetoplayer;
}

function increasePlayerHealth(healValue) {
  
  if (currentplayerhealth >= 100||playerHealthBar.value>=100) {
    currentplayerhealth = 100;
    playerHealthBar.value = 100;
  } else {
    currentplayerhealth += heal_value;
    currentplayerhealth = currentplayerhealth;
    playerHealthBar.value = +playerHealthBar.value + healValue;
  }
}

function resetGame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
  currentmonsterhealth = Maxlife;
  currentplayerhealth = Maxlife;
}

function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}
