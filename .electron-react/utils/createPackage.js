const path = require('path');
const fs = require('fs');

const copy = (src, tgt) => {
   fs.createReadStream(src).pipe(fs.createWriteStream(tgt));
}

const srcPath = path.resolve(__dirname, '../../package.json');
const tgtPath = path.resolve(__dirname, '../../dist/electron/package.json');


const copyPackageJSON = () => copy(srcPath, tgtPath);

module.exports = {
  copyPackageJSON,
}
