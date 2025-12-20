const fs = require('fs');
const path = require('path');
const vm = require('vm');

const target = path.join(__dirname, 'generate-i18n.js');
const code = fs.readFileSync(target, 'utf8');

const sandbox = {
  require: require,
  module: { exports: {} },
  exports: {},
  __dirname: path.dirname(target),
  __filename: target,
  console: console,
  process: process,
};

try {
  vm.runInNewContext(code, sandbox, { filename: target });
  console.log('wrapper: executed', target);
} catch (err) {
  console.error('wrapper error:', err);
  process.exitCode = 1;
}
