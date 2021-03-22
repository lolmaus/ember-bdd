const glob = require('glob');
const path = require('path');
const fs = require('fs');
const frontmatter = require('@github-docs/frontmatter');

module.exports = function enumeratePremberURLs() {
  const pathToDocs = path.join(__dirname, '../../../docs');

  return glob
    .sync(path.join(__dirname, '../../../docs/**/*.md'))
    .filter((filename) => {
      const content = fs.readFileSync(filename, 'utf8');
      const fm = frontmatter(content);
      return !fm.data.sectionOnly;
    })
    .map((filename) => filename.slice(pathToDocs.length, -3))
    .filter((filename) => filename !== '/index');
};
