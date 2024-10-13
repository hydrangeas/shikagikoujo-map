import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dataDir = path.resolve(process.cwd(), 'data');
  const files = fs.readdirSync(dataDir);
  let positions = [];

  files.forEach(file => {
    if (path.extname(file) === '.json') {
      const filePath = path.join(dataDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      positions = positions.concat(data);
    }
  });

  res.status(200).json({ positions });
}