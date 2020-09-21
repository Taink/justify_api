import express from 'express';
import { routes } from './routes/index';

const app = express();
const PORT = 8000;


app.use('/api/v1', routes);

app.get('/', (req, res) => res.send('Server is running...'));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

export { app };
