const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '.env'), 
});

if (!process.env.ATLAS_URI || !process.env.JWT_SECRET) {
  console.warn('[jest.setup] Variables manquantes :',
    { ATLAS_URI: !!process.env.ATLAS_URI, JWT_SECRET: !!process.env.JWT_SECRET });
}
