// girilen verileri kontorl etmek için yazılacak script  button-3

let verikontrol = document.getElementById("Button-3");

let girilenveriseti = [];

function verivalidator() {
  let i;
  for (let i = 1; i <= CalısmaGunu; i++) {
    let girilenveri = parseFloat(
      document.getElementById(`${i}.input`).value.replace(",", ".")
    );

    girilenveriseti.push(girilenveri);
  }

  let hatasayısı = 0;
  girilenveriseti.forEach(function (değer) {
    if (isNaN(değer)) {
      hatasayısı++;
    }
  });
  if (hatasayısı != 0) {
    alert("Girilen Değerlerde Hata Var Kontrol Ediniz");
    hatasayısı = 0;
    girilenveriseti = [];
  } else alert("Girilen VERİLER ONAYLANDI. HESAPLAMA YAPABİLİRSİNİZ.");
}

verikontrol.addEventListener("click", verivalidator);
