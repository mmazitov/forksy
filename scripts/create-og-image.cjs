const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const width = 1200;
const height = 630;
const brandColor = '#f97316'; // Orange from theme

// Create SVG with text
const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${brandColor}"/>
  <text
    x="50%"
    y="45%"
    font-family="Arial, sans-serif"
    font-size="120"
    font-weight="bold"
    fill="#ffffff"
    text-anchor="middle"
    dominant-baseline="middle"
  >Mealvy</text>
  <text
    x="50%"
    y="60%"
    font-family="Arial, sans-serif"
    font-size="40"
    fill="#ffffff"
    text-anchor="middle"
    dominant-baseline="middle"
  >Планувальник харчування та менеджер рецептів</text>
</svg>
`;

const outputPath = path.join(__dirname, '../public/og-image.jpg');

sharp(Buffer.from(svg))
  .jpeg({ quality: 90 })
  .toFile(outputPath)
  .then(() => {
    console.log(`✅ Created og-image.jpg (${width}x${height}px)`);
    // Clean up temp file
    const tempPath = path.join(__dirname, '../public/og-image-temp.png');
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
      console.log('✅ Cleaned up temporary file');
    }
  })
  .catch((err) => {
    console.error('❌ Error creating og-image:', err);
    process.exit(1);
  });
