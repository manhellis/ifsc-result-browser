// pages/api/readDirectory.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const directoryPath = path.join(process.cwd(), '../../data/seasons/');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read directory' });
      return;
    }
    res.status(200).json(files);
  });
}
