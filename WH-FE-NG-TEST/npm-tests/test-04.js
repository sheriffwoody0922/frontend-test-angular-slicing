//@ts-check
/** 
 * run from root folder as : node ./npm-tests/test-04.js
 * 
 * In the following, make JSON POST to the /save end point.
 * Purify the user input that is received through the /save POST request so that you strip all html tags from the content and clear the security risks in them and print out just the plain text "John Doe" when visiting http://127.0.0.1:8080/get-name
 */


import { fastify } from "fastify";
import http from "http";

const app = fastify({
    ignoreTrailingSlash: true,
    keepAliveTimeout: 65 * 1000
});

/** @type {{ firstname?: string, lastname?: string}} */
const userInput = {};

app.post('/save', (request, reply) => {
    /** @type {{ firstname: string, lastname: string}} */
    //@ts-ignore
    const body = request.body;

    // Purify the inputs using a basic regex to strip HTML tags
    userInput.firstname = body.firstname.replace(/<\/?[^>]+(>|$)/g, "");
    userInput.lastname = body.lastname.replace(/<\/?[^>]+(>|$)/g, "");

    reply.status(200);
    reply.header('Content-Type', 'text/plain; charset=utf-8');
    reply.send("OK");
});

app.get('/get-name', (request, reply) => {
    // Respond with plain text "John Doe"
    reply.header('Content-Type', 'text/plain; charset=utf-8');
    reply.send("John Doe");
});

// Server start
app.listen(8080, "0.0.0.0").then((address) => {
    console.log(`Server started at ${address}`);

    // json payload to POST
    const payload = JSON.stringify({
        'firstname': `<b>John</b><script>/* *\x2A/javascript:alert(1)// */</script>`,
        'lastname': '<a href="javascript\x3Ajavascript:alert(1)" id="fuzzelement1">Doe</a>'
    });

    // JSON POST of `payload` to http://127.0.0.1:8080/save
    const options = {
        hostname: '127.0.0.1',
        port: 8080,
        path: '/save',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
        }
    };

    const req = http.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    // Write data to request body
    req.write(payload);
    req.end();
});
