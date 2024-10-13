import * as fs from 'fs';
import * as csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

const inputFilePath = 'sapporo-input.csv';
const outputFilePath = 'sapporo.csv';
const apiKey = 'AIzaSyDmoY5C-Ltr_eDT8KC0_AwZ-ToL8SMn380';
const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

interface Facility {
  管理番号: string;
  施設名称: string;
  施設所在地: string;
  施設ビル名: string;
}

interface OutputFacility {
  管轄: string;
  管理番号: string;
  施設名称: string;
  緯度: number | null;
  経度: number | null;
  施設所在地: string;
  電話番号: string;
}

const facilities: Facility[] = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    facilities.push({
      管理番号: row['管理番号'],
      施設名称: row['施設名称'],
      施設所在地: row['施設所在地'],
      施設ビル名: row['施設ビル名']
    });
  })
  .on('end', async () => {
    const outputFacilities: OutputFacility[] = [];

    for (const facility of facilities) {
      const address = `${facility.施設所在地} ${facility.施設ビル名}`;
      const response = await fetch(`${apiUrl}?key=${apiKey}&address=${encodeURIComponent(`${facility.施設所在地}`)}`);
      const data = await response.json();

      const location = data.results[0]?.geometry.location;
      outputFacilities.push({
        管轄: '札幌市保健所',
        管理番号: facility.管理番号,
        施設名称: facility.施設名称,
        緯度: location ? location.lat : null,
        経度: location ? location.lng : null,
        施設所在地: address,
        電話番号: ''
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: outputFilePath,
      header: [
        { id: '管轄', title: '管轄' },
        { id: '管理番号', title: '管理番号' },
        { id: '施設名称', title: '施設名称' },
        { id: '緯度', title: '緯度' },
        { id: '経度', title: '経度' },
        { id: '施設所在地', title: '施設所在地' },
        { id: '電話番号', title: '電話番号' }
      ]
    });

    await csvWriter.writeRecords(outputFacilities);
    console.log('sapporo.csv has been written successfully.');
  });