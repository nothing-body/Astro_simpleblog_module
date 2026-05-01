const fs = require('fs');
const pkgPath = './package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const removeDeps = ['@astrojs/react', 'react', 'react-dom'];
const removeDevDeps = [
  '@fortawesome/react-fontawesome', 'usehooks-ts', 
  '@fortawesome/fontawesome-svg-core', '@fortawesome/free-brands-svg-icons', 
  '@fortawesome/free-regular-svg-icons', '@fortawesome/free-solid-svg-icons', 
  '@reimujs/aos', 'mouse-firework', 'photoswipe', 'qrcode', 'stylus', 
  'hast-util-to-html'
];

removeDeps.forEach(dep => { delete pkg.dependencies[dep]; });
removeDevDeps.forEach(dep => { delete pkg.devDependencies[dep]; });

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('package.json cleaned!');
