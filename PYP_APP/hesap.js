// pyp dağılımının hesaplanacağı aydaki çalışma günü ve toplam
// çalışma saati

var CalısmaSaati;

let HesaplaButonu = document.getElementById("Button-1");

const PypOranları = {
  kksturundestek: 0.1,
  milgem3_4: 0.2,
  mk48: 0.2,
  tbgth: 0.2,
  ummanc4ı: 0.2,
  hurkus: 0.1,
};

// DAĞILIMI HESAPLIYAN FONKSİYON
function PypDağılımHesapla() {
  let urundesteksaat;
  let milgemsaat;
  let mk48saat;
  let ummanc4ısaat;
  let hurkussaat;
  let tbgthsaat;
  htmldata_2 = "";
  for (let i = 1; i <= CalısmaGunu; i++) {
    let girilenveri = parseFloat(
      document.getElementById(`${i}.input`).value.replace(",", "."));

    urundesteksaat = (girilenveri * PypOranları.kksturundestek).toFixed(2);
    milgemsaat = (girilenveri * PypOranları.milgem3_4).toFixed(2);
    mk48saat = (girilenveri * PypOranları.mk48).toFixed(2);
    ummanc4ısaat = (girilenveri * PypOranları.ummanc4ı).toFixed(2);
    hurkussaat = (girilenveri * PypOranları.hurkus).toFixed(2);
    tbgthsaat = (girilenveri * PypOranları.tbgth).toFixed(2);

    htmldata_2 += `
    <tr>
         <td>${i}.gün</td><td>${girilenveri}</td><td>${urundesteksaat}</td><td>${milgemsaat}</td><td>${tbgthsaat}</td><td>${mk48saat}</td><td>${ummanc4ısaat}</td><td>${hurkussaat}</td>
    </tr> `;

    //console.log(htmldata);      //kontrol
  }
  tabloverisi.innerHTML = htmldata_2;
}

HesaplaButonu.addEventListener("click", PypDağılımHesapla);
