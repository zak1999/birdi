import * as dotenv from 'dotenv';
dotenv.config();
import Express from 'express';
import cors from 'cors';
import router from './router';

const app = Express();

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

app.use(Express.json());
app.use(router);

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server listening on port', process.env.SERVER_PORT);
});

export default app;
