const express = require("express");
const port = 8097;

// Create an Express application
const app = express();

/**
 * Middleware for serving static files from 'public' directory
 */
app.use(express.static("public"));

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Routes
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Route that handles GET requests to '/query', processed by queryHandler
app.get("/query", queryHandler);

// Route that handles GET requests to '/palindrome', processed by palindromeHandler
app.get('/palindrome', palindromeHandler);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Error Handling
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Middleware for handling cases where no other middleware or route handled the request
app.use(fileNotFound);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Server Activation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Start the server on the specified port and log a message to the console
app.listen(port, function () {
    console.log(`Server is listening on port ${port}...`);
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Support functions
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//`````````````````````````````````````````````````````````````````````````````````
// Handler function for specific query requests
//
function queryHandler(req, res, next) {
    let url = req.url; // Accessing the URL of the request
    let qObj = req.query; // Extracting the query parameters from the request
    console.log(qObj); // Logging the query object to the console

    // If the query contains the key 'animal', respond with JSON
    if (qObj.animal != undefined) {
        res.json({ beast: qObj.animal });
    } else {
        // If not handled, pass to the next handler in the stack
        next();
    }
}

// Handler function for generating palindromes
function palindromeHandler(req, res, next) {
    let qObj = req.query;
    console.log(qObj);

    // Check if 'word' query parameter is present
    if (qObj.word !== undefined) {
        // Generate palindrome of the provided word
        const reversedWord = qObj.word.split('').reverse().join('');
        const palindrome = qObj.word + reversedWord;

        // Respond with the palindrome in JSON format
        res.json({ "palindrome": palindrome });
    } else {
        // If the 'word' parameter is not present, pass to the next handler
        next();
    }
}

//`````````````````````````````````````````````````````````````````````````````````
// Handler function for cases where no appropriate file or route is found
//
function fileNotFound(req, res) {
    // Accessing the URL of the request that caused the error, sethe content
    // type of the response to plain text, set the status code of the response
    // to 404 (Not Found), and send a plain text message indicating the file
    // was not found
    //
    let url = req.url;
    res.type("text/plain");
    res.status(404);
    res.send("Cannot find " + url);
}



