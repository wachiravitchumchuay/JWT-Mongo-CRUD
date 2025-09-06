import express from 'express';
import cors from 'cors';
import {connectDB, getDb} from './config/db';
import  userRouter  from './routes/userRoute';

const port = process.env.PORT || 3001;
const app = express()
app.use(cors());
app.use(express.json());

app.use('/users', userRouter)

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