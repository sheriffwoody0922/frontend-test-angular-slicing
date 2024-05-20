//@ts-check
import { fastify } from "fastify";
import fs from "fs-extra";
import { fileURLToPath } from 'url';
import path from "path";

//@ts-ignore
const ROOT = path.dirname(fileURLToPath(import.meta.url));

const app = fastify({
    ignoreTrailingSlash: true,
    keepAliveTimeout: 65 * 1000
});

app.get('/', async(request, reply) => {
    reply.header('Content-Type', 'text/html; charset=utf-8');
    return fs.readFile(ROOT +"/index.html");
});

app.get('/index.js', async(request, reply) => {
    reply.header('Content-Type', 'text/javascript; charset=utf-8');
    return fs.readFile(ROOT + "/index.js");
});

// server start
app.listen(8081, "0.0.0.0").then((address) => {
    console.log(`Server started at ${address}`);
});