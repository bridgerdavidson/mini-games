import express from 'express';
import cors from 'cors';
import gamesRouter from './routes/games';

const app = express();

app.use("/api/games", gamesRouter);

app.listen(4000, () => {console.log("Server is running on http://localhost:4000")});