import * as fs from 'fs';
import * as csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import * as dotenv from 'dotenv';
dotenv.config();

const inputFilePath = 'fukushimashi-input.csv';
const outputFilePath = 'fukushimashi.csv';
const apiKey = process.env.GOOGLE_API_KEY;
const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

interface Facility {
  歯科技工所の名称: string;
  歯科技工所の所在地: string;
  開設者氏名: string;
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
      歯科技工所の名称: row['歯科技工所の名称'],
      歯科技工所の所在地: row['歯科技工所の所在地'],
      開設者氏名: row['開設者氏名'],
    });
  })
  .on('end', async () => {
    const outputFacilities: OutputFacility[] = [];

    for (const facility of facilities) {
      const address = `福島県${facility.歯科技工所の所在地}`;
      const response = await fetch(`${apiUrl}?key=${apiKey}&address=${encodeURIComponent(`${address}`)}`);
      const data = await response.json();

      let location = data.results[0]?.geometry.location;
      for (let i = 1; i < data.results.length; i++) {
        console.log(`0 ${facility.歯科技工所の名称} (${address}), ${location.lat}, ${location.lng},${data.results[0].geometry.location_type}`);
        const result = data.results[i];
        console.log(`${i} ${facility.歯科技工所の名称} (${address}), ${result.geometry.location.lat}, ${result.geometry.location.lng}, ${result.geometry.location_type}`);
        if (result.geometry.location_type === 'ROOFTOP' || result.geometry.location_type === 'APPROXIMATE') {
          location = result.geometry.location;
        }
      }

      outputFacilities.push({
        管轄: '福島市保健所',
        管理番号: '',
        名称: facility.歯科技工所の名称,
        緯度: location ? location.lat : null,
        経度: location ? location.lng : null,
        所在地: address,
        電話番号: '',
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
    console.log('fukushimashi.csv has been written successfully.');
  });
// npx tsc fukushimashi.ts && node fukushimashi.js | tee fukushimashi.log