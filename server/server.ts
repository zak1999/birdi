import Express from 'express';
import cors from 'cors';

const app = Express();

import router from './router';

app.use(cors())
app.use(Express.json());
app.use(router)

export default app;