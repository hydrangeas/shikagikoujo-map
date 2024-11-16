import * as fs from 'fs';
import * as csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import * as dotenv from 'dotenv';
dotenv.config();

const inputFilePath = 'fukushima-input.csv';
const outputFilePath = 'fukushima.csv';
const apiKey = process.env.GOOGLE_API_KEY;
const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

interface Facility {
  管轄保健所: string;
  通番: string;
  歯科技工所名: string;
  技工所所在地: string;
  開設者氏名: string;
  管理者氏名: string;
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
      管轄保健所: row['管轄保健所'],
      通番: row['通番'],
      歯科技工所名: row['歯科技工所名'],
      技工所所在地: row['技工所所在地'],
      開設者氏名: row['開設者氏名'],
      管理者氏名: row['管理者氏名'],
      開設年月日: row['開設年月日'],
    });
  })
  .on('end', async () => {
    const outputFacilities: OutputFacility[] = [];

    for (const facility of facilities) {
      const address = `福島県${facility.技工所所在地}`;
      const response = await fetch(`${apiUrl}?key=${apiKey}&address=${encodeURIComponent(`${address}`)}`);
      const data = await response.json();

      let location = data.results[0]?.geometry.location || null;
      for (let i = 1; i < data.results.length; i++) {
        console.log(`0 ${facility.歯科技工所名} (${address}), ${location.lat}, ${location.lng},${data.results[0].geometry.location_type}`);
        const result = data.results[i];
        console.log(`${i} ${facility.歯科技工所名} (${address}), ${result.geometry.location.lat}, ${result.geometry.location.lng}, ${result.geometry.location_type}`);
        if (result.geometry.location_type === 'ROOFTOP' || result.geometry.location_type === 'APPROXIMATE') {
          location = result.geometry.location;
        }
      }

      outputFacilities.push({
        管轄: facility.管轄保健所,
        管理番号: facility.通番,
        名称: facility.歯科技工所名,
        緯度: location ? location.lat : null,
        経度: location ? location.lng : null,
        所在地: address,
        電話番号: '', //facility.電話番号,
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
    console.log('fukushima.csv has been written successfully.');
  });
// npx tsc fukushima.ts && node fukushima.js | tee fukushima.log