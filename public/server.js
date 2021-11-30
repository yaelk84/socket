let express = require('express');
const port =  3000;
let app = express();
app.use(express.static(__dirname + '/public'))
let socketIO = require('socket.io');
let expressServer = app.listen(port)
let io = socketIO(expressServer,{ cors: {origins: ['http://localhost:4200'] }});

module.exports = {app,io}


