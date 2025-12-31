import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const handler = require('./index.cjs');
export default handler;
