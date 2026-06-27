const { default: chalk } = require('chalk');
const app = require('./src/app.js');
require('dotenv').config();
const connectDb = require('./src/db/db.js')

app.listen(3000 , () => {
    console.log(chalk.bold.green("Server Is Running On Port 3000"));
});
connectDb();

