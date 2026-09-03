import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import { UrlControllers } from './app/modules/Url/url.controller';
import config from './app/config';

const app: Application = express();


const allowedOrigins = [
  'http://localhost:5173',                    // Vite dev server (local frontend)
  'http://127.0.0.1:5173',
  'https://www.ashali.com',
  ...(config.frontend_url ? [config.frontend_url] : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile apps, curl, etc.)
      if (!origin) {
        return callback(null, true);
      }

      // Check if origin is in the allowed list
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // Optional: log rejected origins during development
        console.warn(`CORS blocked origin: ${origin}`);
        callback(new Error(`Origin ${origin} is not allowed by CORS`));
      }
    },
    credentials: true,                        // Required if you use cookies or Authorization headers
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ──────────────────────────────────────────────────────────────
//                     OTHER MIDDLEWARE & ROUTES
// ──────────────────────────────────────────────────────────────

app.use(express.json());

// Public short URL redirect (no auth, no CORS issue usually)
app.get('/:shortCode', UrlControllers.redirectShortUrl);

// All API routes under /api
app.use('/api', router);

// Health check / welcome route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Ash Ali backend is running',
    environment: config.node_env || 'unknown',
    databaseConfigured: Boolean(config.database_url),
  });
});

// Global error handler (should be last)
app.use(globalErrorHandler);

export default app;
