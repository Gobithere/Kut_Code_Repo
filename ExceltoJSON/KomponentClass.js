const excelfile = require('xlsx');
const fs = require('fs');
const utf8 = require('utf8');
// const mainComponent = require('./deneme');
const chalk = require('chalk');

const workbook = excelfile.readFile('./sampleexcel.xlsx');

const ws = workbook.Sheets['Sayfa1'];

const kompDataArray = [];

class komponent {
  constructor(id, linkId, name) {
    this.id = id;
    this.linkId = linkId;
    this.name = name;
    this.isVirtual = false;
    this.description = '';
    this.leadUsername = '';
    this.assigneeType = 1;
    this.attributes = [];
    this.children = [];
  }
  static excelKomponentDataArrayOluştur(worksheet) {
    let linkId = 1;
    let id = 1;
    let satır = 2;
    const wsJson = excelfile.utils.sheet_to_json(worksheet);
    for (let i = 1; i <= wsJson.length; i++) {
      let itemname = ws[`B${satır}`].v;
      let item = new komponent(id, linkId, itemname);
      kompDataArray.push(item);

      linkId++;
      id++;
      satır++;
    }
    return kompDataArray;
  }
  static excelKomponentSayısı(worksheet) {
    const wsJson = excelfile.utils.sheet_to_json(worksheet);
    let satırSayısı = wsJson.length;
    return satırSayısı;
  }

  static kırılımSayısıHesapla(sheet) {
    let komponentSayısı = komponent.excelKomponentSayısı(sheet);
    let kırılımSeviyeleriArray = [];

    for (var i = 2; i <= komponentSayısı; i++) {
      kırılımSeviyeleriArray.push(ws[`A${i}`].v.length);

      //let kırılımSeviyeleri = [...kırılımSeviyeleriArray]
    }

    let kırılımSeviyeleri = kırılımSeviyeleriArray.filter(
      (value, index, ar) => ar.indexOf(value) === index
    );

    let kırılımObj = [{ KırılımSeviye: 0, KırılımUzunluğu: 'Main Komponent' }];

    kırılımSeviyeleri.forEach((v, i, a) => {
      let eklenecekObj = {
        KırılımSeviye: a.indexOf(v) + 1,
        KırılımUzunluğu: v,
      };
      kırılımObj.push(eklenecekObj);
    });

    return kırılımObj;
  }

  static jsonFileOluştur(obj) {
    //let parseObj = JSON.parse(object);
    let türkçeKarakter = {
      İ: 'I',
      Ş: 'S',
      ş: 'ş',
      Ü: 'U',
      ü: 'u',
      Ö: 'O',
      ö: 'o',
      Ğ: 'G',
      ğ: 'g',
    };
    let stringContent = JSON.stringify(obj);
    let türkceChar = stringContent.replace(/[İŞşÜüÖöĞğ]/g,(char)=>türkçeKarakter[char]);

    const path = 'ExceltoJson.json';
    fs.writeFile(path, türkceChar, (err) => {
      if (err) throw 'Dosyaya yazım esnasında hata oluştu' + err;

      console.log('\nJSON Dosyası ' + chalk.green.bold( `${path}`) + ' ismiyle Uygulama Klasörü Altına Oluşturuldu.\n');
    });
  }
}
module.exports = komponent;
//export default komponent;

