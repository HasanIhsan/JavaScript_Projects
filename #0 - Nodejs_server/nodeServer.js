//The require() method is used to load and cache JavaScript modules
//so in this case loaded the http and fs module
const http = require('http') //http:  Node.js has a built-in module called HTTP, which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP)
const fs = require('fs') //fs: The fs.readFile() method is used to read files on your computer. 

//set the port to run the local host
const port = 8000

//createserver: The http.createServer() method turns your computer into an HTTP server. 
//              The http.createServer() method creates an HTTP Server object
const server = http.createServer(function(req, res) {
    //writeHead: The response.writeHead() (Added in v1..0) property is an inbuilt property of the ‘http’ module which sends a response header to the request
    //also telling to that the content we will be using is a html file
    res.writeHead(200, {'Content-Type': 'text/html'})

    //readFile: reads in a file
    fs.readFile('index.html', function(error, data) {
        
        //if there is an error return 404: meaning not found
        if(error) {
            res.writeHead(404)
            res.write('Error: file not found')
        }else {

            //otherwise write the data in the html file
            res.write(data)
        }
        //end: The End method causes the Web server to stop processing the script and return the current result.
        res.end()
    })

    
    
}) 

//listen: The server.listen() method creates a listener on the specified port or path. 
server.listen(port, function(error) {

    //if error report the error
    if(error) {
        console.log('Something went wrong', error)
    } else {

        //otherwise continue listening to port (any new updated that happens in port will be displayed)
        console.log('Server is listening on port ' + port)
    }
})