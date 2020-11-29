const BaslamaTusu = document.getElementById("start-game-btn");
const Zar = document.getElementById("roll-game-btn");
const BitirmeTusu = document.getElementById("end-game-btn");

var oyuncusecimi;
var bilgisayarsecimi;
const TAŞ = "TAŞ";
const MAKAS = "MAKAS";
const KAGIT = "KAĞIT";
const DefaultDeğer = TAŞ;

//Genel Skor Değişkenleri

var OyunTurSayısı;
let TurSayısı=1;
let OyuncuSkoru = 0;
let BilgisayarSkoru = 0;

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
}

function bilgisayarsecimyap() {
  let elementid = Math.round(Math.random() * 2);

  bilgisayarsecimi = bilgisayarsecimkümesi[elementid];
  // // değer kontrolü
  // console.log (elementid,bilgisayarsecimi);
  return bilgisayarsecimi;
}

function sonuc() {
  console.log(`BİLGİSAYAR:${bilgisayarsecimi}`);
  console.log(`OYUNCU:${oyuncusecimi}`);
  console.log (`${TurSayısı}.Tur Bitti.`);
  //function GenelTurSayacı() {}

  //Kazanma koşulları
  if (oyuncusecimi == MAKAS && bilgisayarsecimi == KAGIT) {
    alert("OYUNCU WON");
    OyuncuSkoru++;
  } else if (oyuncusecimi == MAKAS && bilgisayarsecimi == TAŞ) {
    alert("BİLGİSAYAR WON");
    BilgisayarSkoru++;
  } else if (oyuncusecimi == TAŞ && bilgisayarsecimi == KAGIT) {
    alert("BİLGİSAYAR WON");
    BilgisayarSkoru++;
  } else if (oyuncusecimi == TAŞ && bilgisayarsecimi == MAKAS) {
    alert("OYUNCU WON");
    OyuncuSkoru++;
  } else if (oyuncusecimi == KAGIT && bilgisayarsecimi == MAKAS) {
    alert("BİLGİSAYAR WON");
    BilgisayarSkoru++;
  } else if (oyuncusecimi == KAGIT && bilgisayarsecimi == TAŞ) {
    alert("OYUNCU WON");
    OyuncuSkoru++;
  } else if (oyuncusecimi == bilgisayarsecimi) {
    alert("DRAW");
  }
}

BaslamaTusu.addEventListener("click", function () {
  if (oyunçalışıyor) {
    alert("Oyun Devam Ediyor!!");
    return;
  }
  oyunçalışıyor = true;
  OyunTurSayısı = parseInt(prompt("Oyun Kaç Tur Olsun Dayko?", "")) || 5;
  console.log("Oyun Başlıyor");
  console.log("Oyun Devam Ediyor");
});

Zar.addEventListener("click", function () {
  // Oyunu başlatmadan roll edememe kontorlü.
  if (!oyunçalışıyor) {
    alert("Oyunu Henüz Başlamadı!");
    return;
  }

  secimyap();
  bilgisayarsecimyap();
  sonuc();
  if (OyunTurSayısı == TurSayısı) {
    oyunçalışıyor = false;
    if (OyuncuSkoru > BilgisayarSkoru) {
      alert("Oyuncu Oyunu Kazandı. Tebrikler");
    } else if (BilgisayarSkoru > OyuncuSkoru) {
      alert("Bilgisayar Oyunu Kazandı. Üzülme Bir Sonrakine:(");
    } else alert("Berabere Bitti. Vay anasını :O");
    
    console.log("Oyun Bitti !");
  }
  TurSayısı++;
});

BitirmeTusu.addEventListener("click", function () {
  

// oyun istenildiği zaman bitirildiğinde mevcut skora göre skor genel
// skoru yazdırma ve hali hazırda zaten oyun devam etmiyorsa oyuncuya uyarı yapma EKLENECEK****

//   console.log("Oyun Bitti !");
//   if (OyuncuSkoru > BilgisayarSkoru) {
//     alert("Oyuncu Oyunu Kazandı. Tebrikler");
    
//   } else if (BilgisayarSkoru > OyuncuSkoru) {
//     alert("Bilgisayar Oyunu Kazandı. Üzülme Bir Sonrakine:(");
    
//   }else if (!oyunçalışıyor){
//     alert('Oyun Zaten Bitti Dostum Zorlama Bence:)\n Ama Tekrar Başlatabilirsin.');
//   } else  alert("Berabere Bitti. Vay anasını :O");
// 
oyunçalışıyor = false ;
});

    

