const express = require('express');
const app = express();
const config = require('./config');
const btcRouter = require('./BTC');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDoc = yaml.load('./api-docs/swagger.yaml');

const loggerMiddleWare = (req, res, next) => {
    console.log(`Logged ${req.method} ${req.url}`);
    next();
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(loggerMiddleWare);

app.use(express.json());

app.use('/api', btcRouter);

app.use((req, res, next) => {
    res.status(400).send('Resource not found');
})

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
})