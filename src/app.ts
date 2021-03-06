import {json} from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import {Pool} from 'pg';
import {createContext} from './init';
import {route} from './route';

dotenv.config();

const app = express();

const port = process.env.PORT;

const provider = process.env.PROVIDER;

app.use(json());

export const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  password: 'bbc148562',
  database: 'public',
  port: 5432
});

pool.connect().then(() => {
  const ctx = createContext(pool, provider);
  route(app, ctx);
  http.createServer(app).listen(port, () => {
    console.log('Start server at port ' + port);
  });
  console.log('Connected successfully to PostgreSQL.');
})
.catch(e => {
  console.error('Failed to connect to PostgreSQL.', e.message, e.stack);
});

