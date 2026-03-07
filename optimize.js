const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'images');

async function optimizeImages() {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const filePath = path.join(dir, file);
      const ext = path.extname(file).toLowerCase();
      const outputFilePath = path.join(dir, `optimized-${file}`);

      try {
        let image = sharp(filePath);
        const metadata = await image.metadata();

        // 限制最大宽度，如果是超大图则缩小
        if (metadata.width > 1600) {
          image = image.resize(1600, null, { withoutEnlargement: true });
        }

        if (ext === '.jpg' || ext === '.jpeg') {
          await image.jpeg({ quality: 80, progressive: true }).toFile(outputFilePath);
        } else if (ext === '.png') {
          await image.png({ quality: 80, progressive: true, compressionLevel: 8 }).toFile(outputFilePath);
        }

        // 替换原图
        fs.unlinkSync(filePath);
        fs.renameSync(outputFilePath, filePath);
        console.log(`Optimized ${file}`);

      } catch (err) {
        console.error(`Error processing ${file}: ${err.message}`);
      }
    }
  }
}

optimizeImages();
