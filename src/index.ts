require('dotenv').config();
import express from 'express';
import routes from './routes/index';
import initMongoDb from './db/db';
import bodyParser from 'body-parser';

initMongoDb();
const app = express();
const PORT: number = Number(process.env.PORT) || 8000;

// accept both raw data and application/json as post request body
app.use(bodyParser.json())
app.use(bodyParser.raw({type: 'text/plain'}))

app.use('/api', routes);

app.get('/', (req, res) => res.send('Server is running...'));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

export { app };
