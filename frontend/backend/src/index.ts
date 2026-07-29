// DILMAN Premier League API Server Entry Point (Placeholder)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'DPL Backend API operational' });
});

app.listen(PORT, () => {
  console.log(`[DPL Backend] Running on http://localhost:${PORT}`);
});
