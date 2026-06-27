const { default: chalk } = require('chalk');
const app = require('./src/app.js');
require('dotenv').config();
const connectDb = require('./src/db/db.js')

const PORT = 8000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

connectDb();

