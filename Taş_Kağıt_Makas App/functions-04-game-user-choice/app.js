const BaslamaTusu = document.getElementById("start-game-btn");
const Zar= document.getElementById("roll-game-btn");

var oyuncusecimi;
var bilgisayarsecimi;
const TAŞ = "TAŞ";
const MAKAS = "MAKAS";
const KAGIT = "KAĞIT";
const DefaultDeğer = TAŞ;

let oyunçalışıyor = false;

const bilgisayarsecimkümesi = [TAŞ, MAKAS, KAGIT];

function secimyap() {
  oyuncusecimi = prompt(
    `${TAŞ} mı, ${KAGIT} mı, ${MAKAS} mı?`,
    ""
  ).toUpperCase();

  //kontrol yazdırması
  // console.log(oyuncusecimi);

  if (
    oyuncusecimi !== TAŞ &&
    oyuncusecimi !== KAGIT &&
    oyuncusecimi !== MAKAS
  ) {
    oyuncusecimi = `${DefaultDeğer}`;

    alert(`Yanlış Değer Girdin; Oyuna ${DefaultDeğer}la Devam Edeceksin.`);
  }
  return oyuncusecimi;
};

function bilgisayarsecimyap() {
  
  let elementid = Math.round(Math.random() * 2);

  bilgisayarsecimi = bilgisayarsecimkümesi[elementid];
  // // değer kontrolü
  // console.log (elementid,bilgisayarsecimi);
  return bilgisayarsecimi;
};

function sonuc (){
  secimyap();
  bilgisayarsecimyap();

console.log(`BİLGİSAYAR:${bilgisayarsecimi}`);
console.log(`OYUNCU:${oyuncusecimi}`);


//Kazanma koşulları
if (oyuncusecimi==MAKAS&&bilgisayarsecimi==KAGIT){
alert('OYUNCU WON');  
}else if (oyuncusecimi==MAKAS&&bilgisayarsecimi==TAŞ){
  alert('BİLGİSAYAR WON');  
}
else if (oyuncusecimi==TAŞ&&bilgisayarsecimi==KAGIT){
  alert('BİLGİSAYAR WON');  
}
else if (oyuncusecimi==TAŞ&&bilgisayarsecimi==MAKAS){
  alert('OYUNCU WON');  
}
else if (oyuncusecimi==KAGIT&&bilgisayarsecimi==MAKAS){
  alert('BİLGİSAYAR WON');  
}
else if (oyuncusecimi==KAGIT&&bilgisayarsecimi==TAŞ){
  alert('OYUNCU WON');  
}
else if (oyuncusecimi==bilgisayarsecimi){
  alert('DRAW');  
}


};


BaslamaTusu.addEventListener("click", function () {
  if (oyunçalışıyor) {
    alert("Oyun Devam Ediyor!!");
    return;
  }
  oyunçalışıyor = true;
  console.log("Oyun Başlıyor");
  console.log("Oyun Devam Ediyor");
  sonuc();
});

Zar.addEventListener("click",sonuc());