import * as dotenv from 'dotenv';
dotenv.config();
import Express from 'express';
import cors from 'cors';
import router from './router';

const port = 3001;

const app = Express();

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

app.use(Express.json());
app.use(router);

app.listen(port, () => {
  console.log('Server listening on port', port);
});

export default app;
