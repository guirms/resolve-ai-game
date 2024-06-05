import express from 'express';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200'
};

app.use(cors(corsOptions));

const port = 3000;

app.get('/', (_req, res) => {
    res.json({msg: 'Deu bom2'})
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});