// girilen gün sayısına göre html tablosunu değiştirme

// Calısma gunu girilmesi ve text değer girilmesi halinde uyarı veren kontrol.
function calısmagunugir() {
  let girilencalısmagunu;

  do {
    girilencalısmagunu = prompt("Aylık Çalışma Gününü Giriniz", "");
    if (!isNaN(girilencalısmagunu) && girilencalısmagunu != null) {
      return girilencalısmagunu;
    } else if (girilencalısmagunu === null) {
      alert(
        "Bir Gün Değeri Girmediniz. Lütfen Sayfayı Yenileyip Gün Değeri Giriniz."
      );
    } else alert("Uygun Olmayan Gün Değeri Girildi.");
  } while (isNaN(girilencalısmagunu));
}

var CalısmaGunu = parseInt(calısmagunugir());
let verigir = document.getElementById("Button-2");


const tabloverisi = document.getElementById("tabledata");

function saatgir() {
  
  let htmldata = "";
  for (let i = 1; i <= CalısmaGunu; i++) {
    htmldata += `
      <tr>
        <td>${i}.gün</td><td><input type="text" maxlength="5" id="${i}.input"></td> 
      </tr>`;

    //console.log(htmldata); //kontrol kodu
  }
  tabloverisi.innerHTML = htmldata;
}

verigir.addEventListener("click", saatgir);



