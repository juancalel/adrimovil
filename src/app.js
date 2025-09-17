import express from 'express';
import dotenv from 'dotenv';
import { AuthRouter, UserRouter } from './Routes/index.js';
import { FormRouter } from './Routes/Form.js';


dotenv.config();

const app = express();
const version = 'v1';

app.use(express.json());
app.disable('x-powered-by');
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use(`/${version}/auth`, AuthRouter);
app.use(`/${version}/user`, UserRouter);
app.use(`/${version}/form`, FormRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});