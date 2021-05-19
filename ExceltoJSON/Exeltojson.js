const excel = require('xlsx');
const komponent = require('./KomponentClass');
const getOptions = ()=> require('./excelValidatorapp')

const excelFile = excel.readFile('./sampleexcel.xlsx');
const Sayfa1 = excelFile.SheetNames[0];
const workSheet = excelFile.Sheets[`${Sayfa1}`];

// İçeri Atılacak JSON'da object protype'ı
const mainComponent = {
  id: 0,
  linkId: -1,
  name: 'TBGTHYAR',
  isVirtual: false,
  assigneeType: 0,
  attributes: [],
  children: [],
};

const excelKırılımBilgisi = komponent.kırılımSayısıHesapla(workSheet);
const komponentSayısı = komponent.excelKomponentSayısı(workSheet);

//başlama parametreleri
var satır = 2;
var id = 1;
var linkId = 1;

//Seviyelere göre komponent oluşturup mainkomponent altına ekleyen nested for loop

async function ExcelToJson () {

try {
    
  /*Seviye-1*/ for (let i = 0; i <= komponentSayısı; i++) {
    const newKomp = new komponent(id, linkId, workSheet[`B${satır}`].v);
    mainComponent.children.push(newKomp);
    satır++;
    id++;
    linkId++;
    if (
      workSheet[`A${satır}`].v.length == excelKırılımBilgisi[2].KırılımUzunluğu ) {
      /*Seviye-2*/ for (let a = 0; a <= komponentSayısı; a++) {
        if (
          workSheet[`A${satır}`].v.length <
          excelKırılımBilgisi[2].KırılımUzunluğu
        ) {
          break;
        }
        const newKomp = new komponent(id, linkId, workSheet[`B${satır}`].v);
        mainComponent.children[i].children.push(newKomp);
        satır++;
        id++;
        linkId++;
        if (
          workSheet[`A${satır}`].v.length ==
          excelKırılımBilgisi[3].KırılımUzunluğu 
        ) {
          /*Seviye-3*/ for (let b = 0; b <= komponentSayısı; b++) {
            if (
              workSheet[`A${satır}`].v.length <
              excelKırılımBilgisi[3].KırılımUzunluğu
            ) {
              break;
            }
            const newKomp = new komponent(id, linkId, workSheet[`B${satır}`].v);
            mainComponent.children[i].children[a].children.push(newKomp);
            satır++;
            id++;
            linkId++;
            if (
              workSheet[`A${satır}`].v.length ==
              excelKırılımBilgisi[4].KırılımUzunluğu 
              
            ) {
              /*Seviye-4*/ for (let c = 0; c <= komponentSayısı; c++) {      
                if (
                  workSheet[`A${satır}`].v.length <
                  excelKırılımBilgisi[4].KırılımUzunluğu
                ) {
                  break;
                }
                const newKomp = new komponent(
                  id,
                  linkId,
                  workSheet[`B${satır}`].v
                );
                mainComponent.children[i].children[a].children[b].children.push(  
                  newKomp
                );
                satır++;
                id++;
                linkId++;
                if (
                  workSheet[`A${satır}`].v.length ==
                  excelKırılımBilgisi[5].KırılımUzunluğu
                ) {
                  /*Seviye-5*/ for (let d = 0; d <= komponentSayısı; d++) {
                    if (
                      workSheet[`A${satır}`].v.length <
                      excelKırılımBilgisi[5].KırılımUzunluğu
                    ) {
                      break;
                    }
                    const newKomp = new komponent(
                      id,
                      linkId,
                      workSheet[`B${satır}`].v
                    );
                    mainComponent.children[i].children[a].children[b].children[
                      c
                    ].children.push(newKomp);
                    satır++;
                    id++;
                    linkId++;
                  }
                } else if (
                  workSheet[`A${satır}`].v.length <=
                  excelKırılımBilgisi[3].KırılımUzunluğu
                ) {
                  break;
                }
              }
            } else if (
              workSheet[`A${satır}`].v.length <=
              excelKırılımBilgisi[2].KırılımUzunluğu
            ) {
              break;
            }
          }
        } else if (
          workSheet[`A${satır}`].v.length <=
          excelKırılımBilgisi[1].KırılımUzunluğu
        ) {
          break;
        }
      }
    } 
  }
} catch (err) {
  console.log('RUN-TIME EXCEPTION---->>> ' + err);
}

// // console.log(excelKırılımBilgisi[1].KırılımUzunluğu);
// // console.log(excelKırılımBilgisi);
// // console.log(komponentSayısı);
//console.log(workSheet[`A${satır}`].v.length);
//console.log(mainComponent);


// JSON Dosyasının oluşuturlması ve mainkomponentin basılması
komponent.jsonFileOluştur(mainComponent);
 


}



module.exports = ExcelToJson();