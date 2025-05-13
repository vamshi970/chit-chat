import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongosanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import {router} from '../routes'
// import xss from "xss-clean";
// import compression from 'compression'
import cookieParser  from 'cookie-parser'
import { errorHandler } from "../middleware/error.middleware";
import { env } from "../helpers";

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true,limit : "16kb" }));

app.use(express.json({limit : "16kb"}))

app.use(morgan("dev"));

app.use(helmet());

app.use(mongosanitize());

app.use(cookieParser())

// app.use(xss())

// app.use(compression())

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3000,
  message: "Too many requests from this IP , Please Try again after one hour",
});

app.use(limiter);

app.use(router)

app.use(errorHandler)

export default app