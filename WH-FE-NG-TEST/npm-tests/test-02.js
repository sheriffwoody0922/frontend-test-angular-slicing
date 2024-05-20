//@ts-check
/** 
 * run from root folder as : node ./npm-tests/test-02.js
 * 
 * Parse the response from the given REST end point and print out "hobbies" property in the following format: ITEM1, ITEM2, ...
 */

import https from "https";

https.get('https://coderbyte.com/api/challenges/json/rest-get-simple', (resp) => {
    let data = "";

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        try {
            const json = JSON.parse(data);
            const hobbies = json.hobbies.join(", ");
            console.log(hobbies);
        } catch (e) {
            console.error('Error parsing JSON!', e);
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
