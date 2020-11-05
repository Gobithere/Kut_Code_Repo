const ATTACK_DAMAGE = 10;
//const MONSTER_ATTACK_VALUE = 14;
const CRITICAL_ATTACK_VALUE = 20;
const heal_value = 15;
let bonuslife = 1;

function maxlife() {
  const enteredMaxLife = parseInt(
    prompt("Oyun için Yaşam Değeri Giriniz", "100")
  );

  // Rakam Haricinde Life Girilmesini Engelleyen Kontrol şartı.
  if (isNaN(enteredMaxLife)) {
    alert("Lütfen Uygun Bir Yaşam Değeri", "100");
    const reenteredMaxLife = parseInt(prompt("Oyun için Yaşam Değeri Giriniz", "100"));
    return reenteredMaxLife; 
  }
  else return enteredMaxLife;
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

function attack(mode) {
  let maxdamage;
  if (mode === "ATTACK") {
    maxdamage = ATTACK_DAMAGE;
  } else if (mode === "CRITICAL_ATTACK") {
    maxdamage = CRITICAL_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxdamage);
  currentmonsterhealth -= damage;

  const monsdamage = dealPlayerDamage(maxdamage);
  currentplayerhealth -= monsdamage;
}

function attackhandler() {
  attack("ATTACK");
  endround();
}
function criticattackhandler() {
  attack("CRITICAL_ATTACK");
  endround();
}

function healhandler() {
  increasePlayerHealth(heal_value);
  currentplayerhealth += heal_value;
  dealPlayerDamage(CRITICAL_ATTACK_VALUE);
  endround();
}

attackBtn.addEventListener("click", attackhandler);
strongAttackBtn.addEventListener("click", criticattackhandler);
healBtn.addEventListener("click", healhandler);
