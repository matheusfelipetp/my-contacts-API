import express from 'express';
import 'express-async-errors';
import router from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(3000, () => console.log('Server started at http://localhost:3000'));
