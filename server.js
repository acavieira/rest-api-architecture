const dotenv = require('dotenv');
dotenv.config({ path: `./config/.env.${process.env.NODE_ENV || 'development'}` });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express();
const winston = require('winston');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// Logger configuration
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/app.log' }),
        new winston.transports.Console() // Log also to the terminal
    ]
});

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

// Rate limiter middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit to 100 requests per IP
    message: { error: "Too many requests, please try again later." }
});
app.use(limiter);

// Import routes
// -- clients
const clientsRouter = require('./routes/clients');
logger.info('clientsRouter loaded');
app.use('/api/v1/clients', clientsRouter);

//-- products
const productsRouter = require('./routes/products');
logger.info('productsRouter loaded');
app.use('/api/v1/products', productsRouter);

//-- auth
const authRouter = require('./routes/auth');
app.use('/api/v1', authRouter);

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
    res.json({ status: "ok", environment: process.env.NODE_ENV });
});

// Global error handler
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const port = process.env.PORT || 3000;
logger.info(`Starting server on port ${port} [${process.env.NODE_ENV}]`);
app.listen(port, () => {
    logger.info(`Server is running on port ${port} [${process.env.NODE_ENV}]`);
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = app;

