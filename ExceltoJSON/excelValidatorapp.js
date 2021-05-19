const komponent = require('./KomponentClass');
const excelfile = require('xlsx');
const fs = require('fs');
const chalk = require('chalk');

const cfonts = require('cfonts');

const Exeltojson= ()=>require ('./Exeltojson');

const { Chalk } = require('cfonts/lib/Chalk');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Açılış Girişi
cfonts.say('Excel to JSON| RUNNING... ', {
  font: 'block',
  align: 'center',
  colors: ['system'],
  background: 'transparent',
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: '0',
  gradient: false,
  independentGradient: false,
  transitionGradient: false,
  env: 'node',
});

function getOptions() {
  readline.question(
    '\n[1]: Çıkış: Exit + Enter \n' + "[2]: Convert to JSON: JSON + Enter\n",
    (answer) => {
      try {
        if (answer == 'Exit') {
          cfonts.say('BYE :(', {
            font: '',
            align: 'center',
          });
          readline.close();
        } 
        else if (answer == 'JSON') {

          console. log(chalk.yellow.bold('\nConverter Initiating...\n'));

        Exeltojson();
        readline.close();
        
        }
        
        else {
          throw 'Bilinmeyen Seçenek';
        }
      } catch (err) {
        console.log('\n' + chalk.red.bold(err) + '...\n');
        getOptions();
      }
    }
  );
}

async function isimkontrol(filePath) {
  let validIsım = false;

  const workbook = excelfile.readFile(filePath + '.xlsx');
  const Sayfa1 = workbook.SheetNames[0];
  const ws = workbook.Sheets[`${Sayfa1}`];

  let komponentSayısı = komponent.excelKomponentSayısı(ws);

  for (let i = 0; i < komponentSayısı - 1; i++) {
    let satır = i + 2;
    let nextSatır = i + 3;
    let satırString = ws[`B${satır}`].v;
    let nextsatırString = ws[`B${nextSatır}`].v;

    // console.log(satırString);
    // console.log(nextsatırString);

    if (satırString == nextsatırString) {
      validIsım = true;
      break;
    } else if ((satırString = !nextsatırString)) {
      continue;
    }
  }
  return validIsım;
}

async function excelValidator(filePath) {
  try {
    const workbook = excelfile.readFile(filePath + '.xlsx'); //default olarak ilk sayfa valide olur.
    const Sayfa1 = workbook.SheetNames[0];
    const ws = workbook.Sheets[`${Sayfa1}`];
    console.log('Excel Validator is Checking Status...\n');

    let validKırılım = false;
    let komponentSayısı = komponent.excelKomponentSayısı(ws);

    // Kırılım Seviyesi Mantık Kontrol Bloğu
    for (let i = 0; i < komponentSayısı - 1; i++) {
      let satır = i + 2;
      let nextSatır = i + 3;

      if (ws[`A${nextSatır}`].v.length - ws[`A${satır}`].v.length > 3) {
        validKırılım = true;
        break;
      } else if (ws[`A${nextSatır}`].v.length - ws[`A${satır}`].v.length == 0) {
        continue;
      } else if (ws[`A${nextSatır}`].v.length - ws[`A${satır}`].v.length < 0) {
        continue;
      }
    }

    // Unique Olmayan İsim Bloğu Kontrol

    let kontroledilmişIsım = await isimkontrol(filePath);

    validKırılım & kontroledilmişIsım
      ? console.log(
          'Proje Konfigürasyon Exceli --STATUS: ' +
            chalk.red.bold('INVALID>> ') +
            'Konfigürasyon Kırılım Seviyesinde Mantıksal Hata\n ' +
            '                          --STATUS: ' +
            chalk.red.bold('INVALID>> ') +
            'Unique Olmayan Komponent İsmi Mevcut\n'
        )
      : validKırılım
      ? console.log(
          'Proje Konfigürasyon Exceli --STATUS: ' +
            chalk.red.bold('INVALID>> ') +
            'Konfigürasyon Kırılım Seviyesinde Mantıksal Hata\n '
        )
      : kontroledilmişIsım
      ? console.log(
          'Proje Konfigürasyon Exceli --STATUS: ' +
            chalk.red.bold('INVALID>> ') +
            'Unique Olmayan Komponent İsmi Mevcut'
        )
      : console.log(
          'Proje Konfigürasyon Exceli --STATUS: ' + chalk.green.bold('VALID\n')
        );

    getOptions();
  } catch (err) {
    //console.log(err.code);
    console.log(
      Chalk.red(
        'Excel Dosyasının EXELTOJSON Klasörü Altında Olduğunda Emin Olununuz'
      )
    );
    readline.question('Excel Dosyasının Adını Giriniz:', (answer) =>
      excelValidator(answer)
    );
  }
}

//excelValidator('sampleexcel');
readline.question("Çevirmek İstediğiniz Excel Dosyasının Adını Giriniz:", (answer) =>
  excelValidator(answer)
);

// Cfonts modulü eklenecek. Uygulamanın açılış yazısı ve bilgilendirmeleri
// yazdırılacak.

module.exports = getOptions(); 