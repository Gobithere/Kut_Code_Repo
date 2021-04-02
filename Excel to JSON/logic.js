const gercekExcelSample = require("xlsx");


const wb2 = gercekExcelSample.readFile("GerçekExcelSample.xlsx");

const ws2 = wb2.Sheets["Sayfa1"];

const ws2Json = gercekExcelSample.utils.sheet_to_json(ws2);
// console.log(ws2Json);
// A Sutünu seviye 
// let satır = 2;
// for (let i = 1; i <= ws2Json.length; i++) {
//     console.log("Üst Satır: "+`A${satır}`+" ,Üst Satır Sayısı: "+ ws2[`A${satır}`].v.length);
//     console.log("Alt Satır: "+`A${satır+1}`+" ,Alt Satır Sayısı: "+ ws2[`A${satır+1}`].v.length);
    
//   if (ws2[`A${satır + 1}`].v.length < ws2[`A${satır}`].v.length) {
//     console.log(`A${satır + 1} A${satır}'nin babası`);
//   } else if (ws2[`A${satır + 1}`].v.length == ws2[`A${satır}`].v.length) {
//     console.log(`A${satır + 1} A${satır}'yle aynı`);
//   } else if (ws2[`A${satır + 1}`].v.length > ws2[`A${satır}`].v.length) {
//     console.log(`A${satır + 1} A${satır}'nin cocugu`);
//   }
//   satır++;
// }

