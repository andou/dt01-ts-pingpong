import express from 'express';
import os from 'os';
import pug from 'pug';

const app = express();
const port_env = process.env.EXPOSED_PORT ?? "80";
const port = Number(port_env);
const message = process.env.MESSAGE ?? "PING";

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send(pug.renderFile(__dirname + '/views/main-template.pug', {
        message: message,
        container_id: os.hostname()
    }));
});

app.listen(port, () => {
    return console.log(`${os.hostname()} is listening at http://localhost:${port}`);
});