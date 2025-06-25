import { promises as fs } from 'fs';
import path from 'path';
import { createReadStream } from 'fs';

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);
const cache = new Map();

async function loadDir(targetDir) {
  try {
    const files = await fs.readdir(targetDir);
    return files.filter(file => IMAGE_EXTS.has(path.extname(file).toLowerCase()));
  } catch (error) {
    return [];
  }
}

export default async function handler(req, res) {
  try {
    const subPath = (req.query.path || []).join('/');
    const targetDir = path.join(process.cwd(), 'public', subPath);

    if (!cache.has(targetDir)) {
      cache.set(targetDir, {
        images: await loadDir(targetDir),
        lastUpdated: Date.now()
      });
    } else if (Date.now() - cache.get(targetDir).lastUpdated > 5000) {
      loadDir(targetDir).then(images => {
        cache.set(targetDir, { images, lastUpdated: Date.now() });
      });
    }

    const { images } = cache.get(targetDir);
    if (!images?.length) return res.status(404).end();

    const randomIndex = Math.floor(Math.random() * images.length);
    const filePath = path.join(targetDir, images[randomIndex]);

    res.setHeader('Cache-Control', 'no-store, max-age=0');
    const stream = createReadStream(filePath);
    stream.pipe(res);
    
    return new Promise((resolve) => {
      stream.on('end', resolve);
      stream.on('error', () => res.status(500).end());
    });
    
  } catch (error) {
    res.status(500).end();
  }
}