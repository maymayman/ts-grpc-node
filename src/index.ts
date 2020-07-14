import {client} from './client';

import path from 'path';
import express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    client.find(null, (err, data) => {
        if (!err) {
            res.json(data);
        }

        console.error(err);

        res.json(err);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running at port %d", PORT);
});