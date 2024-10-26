import * as fs from 'fs';
import * as csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

const inputFilePath = 'akita-input.csv';
const outputFilePath = 'akita.csv';
const apiKey = 'AIzaSyDmoY5C-Ltr_eDT8KC0_AwZ-ToL8SMn380';
const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

interface Facility {
  管轄: string;
  管理番号: string;
  施設名: string;
  開設者名: string;
  所在地: string;
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
      管轄: row['管轄'],
      管理番号: row['管理番号'],
      施設名: row['施設名'],
      開設者名: row['開設者名'],
      所在地: row['所在地'],
    });
  })
  .on('end', async () => {
    const outputFacilities: OutputFacility[] = [];

    for (const facility of facilities) {
      const address = `秋田県${facility.所在地}`;
      const response = await fetch(`${apiUrl}?key=${apiKey}&address=${encodeURIComponent(`${address}`)}`);
      const data = await response.json();

      let location = data.results[0]?.geometry.location;
      for (let i = 1; i < data.results.length; i++) {
        console.log(`0 ${facility.施設名} (${address}), ${location.lat}, ${location.lng},${data.results[0].geometry.location_type}`);
        const result = data.results[i];
        console.log(`${i} ${facility.施設名} (${address}), ${result.geometry.location.lat}, ${result.geometry.location.lng}, ${result.geometry.location_type}`);
        if (result.geometry.location_type === 'ROOFTOP' || result.geometry.location_type === 'APPROXIMATE') {
          location = result.geometry.location;
        }
      }

      outputFacilities.push({
        管轄: facility.管轄,
        管理番号: facility.管理番号,
        名称: facility.施設名,
        緯度: location ? location.lat : null,
        経度: location ? location.lng : null,
        所在地: address,
        電話番号: ''
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
    console.log('akita.csv has been written successfully.');
  });
// npx tsc akita.ts && node akita.js | tee akita.log