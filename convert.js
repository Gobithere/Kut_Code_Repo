var excelFile = require("xlsx");

var wb = excelFile.readFile("GerçekExcelSample.xlsx");

var ws = wb.Sheets["Sayfa1"];

// Excel verileri Kontrol Log.
//console.log(wsJson);

let mainComponent = {
  id: 0,
  linkId: -1,
  name: "HOPACA",
  isVirtual: false,
  assigneeType: 0,
  attributes: [],
  children: [],
};

// yeni komponent objesi oluşturulacak.
class komponent {
  constructor(id, linkId, name) {
    this.id = id;
    this.linkId = linkId;
    this.name = name;
    this.isVirtual = false;
    this.description = "";
    this.leadUsername = "";
    this.assigneeType = 1;
    this.attributes = [];
    this.children = [];
  }
}

// maincomponentte alt komponentleri push eden fonksiyon.

//console.log(wsJson.length);

//Konfigürasyon Field değerine göre seviye kıran ve push eden fonksiyon.

function excelSatırSayısı() {
  var wsJson = excelFile.utils.sheet_to_json(ws);
  let satırSayısı = wsJson.length;
  return satırSayısı;
}

//wsJson.forEach((value,index)=>{});

//console.log(ws['A2'].v);  //cell value alma.
let satır = 2;
let id = 1;
let linkid = 1;
for (let i = 1; i <= excelSatırSayısı(); i++) {
  let komp = new komponent(id, linkid, ws[`A${satır}`].v);
  console.log(komp);
  mainComponent.children.push(komp);

  linkid++;
  id++;
  satır++;
}

console.log(mainComponent);
// console.log(excelSatırSayısı());
