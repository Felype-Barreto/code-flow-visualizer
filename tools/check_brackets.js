const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '..', 'client', 'src', 'components', 'roadmap.tsx');
const s = fs.readFileSync(file, 'utf8');
const pairs = { '(': ')', '{': '}', '[': ']' };
const opens = Object.keys(pairs);
const closes = Object.values(pairs);
const stack = [];
for (let i=0;i<s.length;i++){
  const ch = s[i];
  if (opens.includes(ch)) stack.push({ch,i});
  else if (closes.includes(ch)){
    const last = stack.pop();
    if (!last || pairs[last.ch] !== ch) {
      console.log('Mismatch at', i, 'char', ch, 'expected', last? pairs[last.ch] : 'none', 'lastOpen', last);
      process.exit(0);
    }
  }
}
if (stack.length) console.log('Unclosed opens at end:', stack);
else console.log('All balanced');
