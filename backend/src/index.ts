import express from "express";
import env from 'dotenv';
import cors from "cors";
import db_init from "./entities/db_init";
import masterRouter from "./routes/masterRouter";

env.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,PUT,PATCH,POST,DELETE'
};

app.use(cors(corsOptions));

db_init();

app.use('/api', masterRouter);

const port = process.env.PORT || 8001;
app.listen(port);
console.log('API is runnning at ' + port);