//@ts-check
/**
 * run from root folder as : node ./npm-tests/test-01.js
 * 
 * Using fs-extra write the following json (data) into a file (data.json)
 * Through the fastify server and with help from fs-extra read the json saved in "data.json" and print out the data.user in the html response as a list of names each being as <p>{name}</p>m ex : <p>John Doe</p><p>Lucita Esau</p>
 */

import fs from "fs-extra";
import { fastify } from "fastify";

const data = { error: false, users: ["John Doe", "Lucita Esau", "Thomas Friedman", "Norma Helms", "Amy Manning"] };

// Write the json saving code here
fs.writeJson('./data.json', data, err => {
    if (err) return console.error(err);
    console.log('Data written successfully!');
});

const app = fastify({
    ignoreTrailingSlash: true,
    keepAliveTimeout: 65 * 1000
});

app.get('/', async (request, reply) => {
    reply.header('Content-Type', 'text/html; charset=utf-8');
    
    // Read the json here and insert the list names into the html
    try {
        const fileData = await fs.readJson('./data.json');
        const usersList = fileData.users.map(user => `<p>${user}</p>`).join('');
        
        const page = 
        `<html>
            <head>
                <title>Wallethub Test</title>
            </head>
            <body>
            ${usersList}
            </body>
        </html>`;
        
        reply.send(page);
    } catch (err) {
        console.error(err);
        reply.status(500).send('Error reading data');
    }
});

// Server start
app.listen(8080, "0.0.0.0").then((address) => {
    console.log(`Server started at ${address}`);
});
