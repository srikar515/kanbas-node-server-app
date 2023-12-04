import express from 'express';
import Hello from './hello.js';
import Lab5 from './Lab5.js';
import CourseRoutes from './Courses/routes.js';
import cors from 'cors';
import ModuleRoutes from "./Modules/routes.js";
import "dotenv/config";
import mongoose from 'mongoose';
import UserRoutes from './users/routes.js';
import session from 'express-session';

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
const sessionOptions = {
  secret: 'any string',
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== 'development') {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: 'none',
    secure: true,
  };
}

app.use(session(sessionOptions));

app.use(express.json());
const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);
UserRoutes(app);
ModuleRoutes(app)
CourseRoutes(app)
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);