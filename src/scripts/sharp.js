const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, '../public/images/heros');

fs.readdirSync(target)
  .forEach((image) => {
    sharp(`${target}/${image}`)
      .resize(800)
      .toFile(path.resolve(
        __dirname,
        `${target}/${image.split('.').slice(0, -1).join('.')}-large.jpg`,
      ));

    sharp(`${target}/${image}`)
      .resize(480)
      .toFile(path.resolve(
        __dirname,
        `${target}/${image.split('.').slice(0, -1).join('.')}-small.jpg`,
      ));
  });
