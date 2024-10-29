import * as fs from 'fs';
import * as csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

const inputFilePath = 'otaru-input.csv';
const outputFilePath = 'otaru.csv';
const apiKey = process.env.GOOGLE_API_KEY;
const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

interface Facility {
  管理番号: string;
  届出歯科技工所名: string;
  郵便番号: string;
  所在地: string;
  開設日: string;
}

interface OutputFacility {
  管轄: string;
  管理番号: string;
  届出歯科技工所名: string;
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
      届出歯科技工所名: row['届出歯科技工所名'],
      郵便番号: row['郵便番号'],
      所在地: row['所在地'],
      開設日: row['開設日'],
    });
  })
  .on('end', async () => {
    const outputFacilities: OutputFacility[] = [];

    for (const facility of facilities) {
      const address = `${facility.所在地}`;
      const response = await fetch(`${apiUrl}?key=${apiKey}&address=${encodeURIComponent(`${facility.所在地}`)}`);
      const data = await response.json();

      let location = data.results[0]?.geometry.location;
      for (let i = 1; i < data.results.length; i++) {
        console.log(`0 ${facility.届出歯科技工所名} (${facility.所在地}), ${location.lat}, ${location.lng}, ${data.results[0].geometry.location_type}`);
        const result = data.results[i];
        console.log(`${i} ${facility.届出歯科技工所名} (${facility.所在地}), ${result.geometry.location.lat}, ${result.geometry.location.lng}, ${result.geometry.location_type}`);
        if (result.geometry.location_type === 'ROOFTOP' || result.geometry.location_type === 'APPROXIMATE') {
          location = result.geometry.location;
        }
      }

      outputFacilities.push({
        管轄: '小樽市保健所',
        管理番号: facility.管理番号,
        届出歯科技工所名: facility.届出歯科技工所名,
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
        { id: '届出歯科技工所名', title: '届出歯科技工所名' },
        { id: '緯度', title: '緯度' },
        { id: '経度', title: '経度' },
        { id: '所在地', title: '所在地' },
        { id: '電話番号', title: '電話番号' }
      ]
    });

    await csvWriter.writeRecords(outputFacilities);
    console.log('otaru.csv has been written successfully.');
  });

// npx tsc otaru.ts && node otaru.js | tee otaru.log