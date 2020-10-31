const yeniyıl = "01 January 2021";

const günele = document.getElementById("günid");
const saatele = document.getElementById("saatid");
const dakele = document.getElementById("dakid");
const sanele = document.getElementById("sanid");
//zamanların sürekli iki haneli olarak gösterilmesi
function ikihaneli(zaman) {
  return zaman < 10 ? `0${zaman}` : zaman;
}

// Bugünün tarihinden yılbaşı tarihine geri sayan fonksiyon
function gerisayım() {
  const yılbaşı = new Date(yeniyıl);
  const şimdikizaman = new Date();
  const kalanzaman = (yılbaşı - şimdikizaman) / 1000;

  const saniye = Math.floor(kalanzaman % 60);
  const dakika = Math.ceil((kalanzaman / 60) % 60);
  const saat = Math.floor((kalanzaman / 3600) % 24);
  const gün = Math.ceil(kalanzaman / 3600 / 24);

  günele.innerHTML = ikihaneli(gün);
  saatele.innerHTML = ikihaneli(saat);
  dakele.innerHTML = ikihaneli(dakika);
  sanele.innerHTML = ikihaneli(saniye);

  //console.log(gün, saat, dakika);
}

setInterval(gerisayım, 1000);
