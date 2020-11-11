const ATTACK_DAMAGE = 10;
//const MONSTER_ATTACK_VALUE = 14;
const CRITICAL_ATTACK_VALUE = 20;
const heal_value = 15;
let bonuslife = 1;
let logdosyası = [];

//damage değişkenleri
var playerdamage;
var monsdamage;

//Log Event Değişkenleri
const LOG_EVENT_PLAYER_ATTACK = "Player_Attack";
const LOG_EVENT_PLAYER_CRITICAL_ATTACK = "Player_Crıtıcal_Attack";
const LOG_EVENT_PLAYER_HEAL = "Player_Heal";
const LOG_EVENT_MONSTER_CRITICAL_ATTACK = "Monster_Attack";
const LOG_EVENT_MONSTER_ATTACK = "Monster_Crıtıcal_Attack";
const LOG_EVENT_GAMEOVER = "GAME_OVER";

/////////////////////////

function maxlife() {
  const enteredMaxLife = parseInt(
    prompt("Oyun için Yaşam Değeri Giriniz", "100")
  );

  // Rakam Haricinde Life Girilmesini Engelleyen Kontrol şartı.
  if (isNaN(enteredMaxLife)) {
    alert("Lütfen Uygun Bir Yaşam Değeri", "100");
    const reenteredMaxLife = parseInt(
      prompt("Oyun için Yaşam Değeri Giriniz", "100")
    );
    return reenteredMaxLife;
  } else return enteredMaxLife;
}

const Maxlife = maxlife();
let currentmonsterhealth = Maxlife;
let currentplayerhealth = Maxlife;

// Kontrol Kodları
// console.log(currentplayerhealth);
// console.log(currentplayerhealth);

adjustHealthBars(Maxlife);

//Boolean olmadan sayısal olarak bonuslife düşürme denemesi.
function rmvbonuslife() {
  if (currentplayerhealth <= 0 && bonuslife >= 1) {
    removeBonusLife();
    alert(`${bonuslife} Bonuslife Consumed!!`);
    bonuslife--;
  }
}

function endround() {
  if (currentmonsterhealth <= 0) {
    alert("You Won");
    resetGame(100);
  } else if (currentplayerhealth <= 0 && bonuslife == 0) {
    alert("You Lost");
    resetGame(100);
  } else if (currentplayerhealth <= 0 && currentmonsterhealth <= 0) {
    alert("Draw");
    resetGame(100);
  } else if (currentplayerhealth <= 0 && bonuslife >= 1) {
    rmvbonuslife();
    currentplayerhealth = 1; // cheatdeath özelliğinin olduğu yer. Bonus Life'ın oyuncuyu getirmesini istediğimiz yer.
    playerHealthBar.value = 1;
  }
}

function logçıkar(ev, val, monsterhealth, playerhealth, healthbar) {
  let logentry;

  if (ev === LOG_EVENT_PLAYER_ATTACK) {
    logentry = {
      event: ev,
      value: val,
      target: "MONSTER",
      finalMonsterHealth: monsterhealth,
      finalPlayerHealth: playerhealth,
      TargetHealthBar: healthbar,
    };
    logdosyası.push(logentry);
  } else if (ev === LOG_EVENT_PLAYER_CRITICAL_ATTACK) {
    logentry = {
      event: ev,
      value: val,
      target: "MONSTER",
      finalMonsterHealth: monsterhealth,
      finalPlayerHealth: playerhealth,
      TargetHealthBar: healthbar,
    };
    logdosyası.push(logentry);
  } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logentry = {
      event: ev,
      value: val,
      target: "PLAYER",
      finalMonsterHealth: monsterhealth,
      finalPlayerHealth: playerhealth,
      TargetHealthBar: healthbar,
    };
    logdosyası.push(logentry);
  } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    logentry = {
      event: ev,
      value: val,
      target: "PLAYER",
      finalMonsterHealth: monsterhealth,
      finalPlayerHealth: playerhealth,
      TargetHealthBar: healthbar,
    };
    logdosyası.push(logentry);
  } else if (ev === LOG_EVENT_MONSTER_CRITICAL_ATTACK) {
    logentry = {
      event: ev,
      value: val,
      target: "PLAYER",
      finalMonsterHealth: monsterhealth,
      finalPlayerHealth: playerhealth,
      TargetHealthBar: healthbar,
    };
    logdosyası.push(logentry);
  } else if (ev === LOG_EVENT_GAMEOVER) {
    logentry = {
      event: ev,
      value: val,
      finalMonsterHealth: monsterhealth,
      finalPlayerHealth: playerhealth,
    };
    logdosyası.push(logentry);
  }
}

function attack(mode) {
  let maxdamage;
  if (mode === "ATTACK") {
    maxdamage = ATTACK_DAMAGE;
  } else if (mode === "CRITICAL_ATTACK") {
    maxdamage = CRITICAL_ATTACK_VALUE;
  }
  if (currentplayerhealth > 100 || playerHealthBar.value >= 100) {
    currentplayerhealth = 100;
    playerHealthBar.value = 100;
  } else {
    currentplayerhealth = currentplayerhealth;
    playerHealthBar.value = currentplayerhealth;
  }
  playerdamage = dealMonsterDamage(maxdamage);
  currentmonsterhealth -= playerdamage;

  monsdamage = dealPlayerDamage(maxdamage);
  currentplayerhealth -= monsdamage;
}

function attackhandler() {
  attack("ATTACK");
  endround();
  logçıkar(
    "Player_Attack",
    playerdamage,
    currentmonsterhealth,
    currentplayerhealth,
    monsterHealthBar.value
  );
  logçıkar(
    "Monster_Attack",
    monsdamage,
    currentmonsterhealth,
    currentplayerhealth,
    playerHealthBar.value
  );
}
function criticattackhandler() {
  attack("CRITICAL_ATTACK");
  endround();
  // logçıkar(
  //   "Player_Crıtıcal_Attack",
  //   playerdamage,
  //   currentmonsterhealth,
  //   currentplayerhealth,
  //   playerHealthBar.value
  // );
  // logçıkar(
  //   "Monster_Crıtıcal_Attack",
  //   monsdamage,
  //   currentmonsterhealth,
  //   currentplayerhealth,
  //   playerHealthBar.value
  // );
}

function healhandler() {
  increasePlayerHealth(heal_value);
  //dealPlayerDamage(CRITICAL_ATTACK_VALUE);
  endround();
  logçıkar(
    "Player_Heal",
    heal_value,
    currentmonsterhealth,
    currentplayerhealth,
    playerHealthBar.value
  );
}

function loghandler() {
  console.log(logdosyası);
}

attackBtn.addEventListener("click", attackhandler);
strongAttackBtn.addEventListener("click", criticattackhandler);
healBtn.addEventListener("click", healhandler);
logBtn.addEventListener("click", loghandler);
