import express from 'express';
import cors from 'cors';
import {connectDB, getDb} from './config/db';
import { start } from 'repl';

const port = 3000
const app = express()
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



async function startServer() {
  try {
    await connectDB();
    const db = getDb();
    app.locals.db = db;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();