import * as fs from 'fs';
import * as csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

const inputFilePath = 'hokkaido-input.csv';
const outputFilePath = 'hokkaido.csv';
const apiKey = 'AIzaSyDmoY5C-Ltr_eDT8KC0_AwZ-ToL8SMn380';
const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

interface Facility {
  管理番号: string;
  '都道府県名-保健所名': string;
  歯科技工所名称: string;
  郵便番号: string;
  歯科技工所所在地: string;
  電話番号: string;
  開設年月日: string;
}

interface OutputFacility {
  管轄: string;
  管理番号: string;
  名称: string;
  緯度: number | null;
  経度: number | null;
  所在地: string;
  電話番号: string;
}

const facilities: Facility[] = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    facilities.push({
      管理番号: row['管理番号'],
      '都道府県名-保健所名': row['都道府県名-保健所名'],
      歯科技工所名称: row['歯科技工所名称'],
      郵便番号: row['郵便番号'],
      歯科技工所所在地: row['歯科技工所所在地'],
      電話番号: row['電話番号'],
      開設年月日: row['開設年月日'],
    });
  })
  .on('end', async () => {
    const outputFacilities: OutputFacility[] = [];

    for (const facility of facilities) {
      const address = `${facility.歯科技工所所在地}`;
      const response = await fetch(`${apiUrl}?key=${apiKey}&address=${encodeURIComponent(`〒${facility.郵便番号} 北海道${facility.歯科技工所所在地}`)}`);
      const data = await response.json();

      let location = data.results[0]?.geometry.location;
      for (let i = 1; i < data.results.length; i++) {
        console.log(`0 ${facility.歯科技工所名称} (${address}), ${location.lat}, ${location.lng},${data.results[0].geometry.location_type}`);
        const result = data.results[i];
        console.log(`${i} ${facility.歯科技工所名称} (${address}), ${result.geometry.location.lat}, ${result.geometry.location.lng}, ${result.geometry.location_type}`);
        if (result.geometry.location_type === 'ROOFTOP' || result.geometry.location_type === 'APPROXIMATE') {
          location = result.geometry.location;
        }
      }

      outputFacilities.push({
        管轄: facility['都道府県名-保健所名'],
        管理番号: facility.管理番号,
        名称: facility.歯科技工所名称,
        緯度: location ? location.lat : null,
        経度: location ? location.lng : null,
        所在地: address,
        電話番号: facility.電話番号
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: outputFilePath,
      header: [
        { id: '管轄', title: '管轄' },
        { id: '管理番号', title: '管理番号' },
        { id: '名称', title: '名称' },
        { id: '緯度', title: '緯度' },
        { id: '経度', title: '経度' },
        { id: '所在地', title: '所在地' },
        { id: '電話番号', title: '電話番号' }
      ]
    });

    await csvWriter.writeRecords(outputFacilities);
    console.log('hokkaido.csv has been written successfully.');
  });
// npx tsc hokkaido.ts && node hokkaido.js | tee hokkaido.log