require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const {pool} = require('./config/db');
const {errorHandler} = require("./middleware/handleErrors");
const {authenticateTokenRun} = require("./middleware/authenticateToken");
const pageRouter = require("./routes/pageRoutes");
const apiRouter = require("./routes/apiRoutes");
const assetsRouter = require("./routes/assetsRoutes");

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({
    extended: true
}));

app.use(authenticateTokenRun);
app.use(pageRouter);
app.use('/api', assetsRouter);
app.use('/api', apiRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});