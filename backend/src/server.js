//auxilia na definicao de rotas
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');




//importacao do socket.io para ouvir o protocolo websocket
const socketio = require('socket.io');
const http = require('http');

const connectedUsers = {};

const app = express();
const server = http.Server(app);
const io = socketio(server);


mongoose.connect('mongodb+srv://aircnc:aircnc@mycluster-9luvh.mongodb.net/aircnc?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})




io.on('connection', socket => {
    
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id; //relaciona o id de usuario do mongo com o id de conexao do websocket
});

app.use((req,res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});


//habilita o express a usar json como retorno
app.use(cors());
app.use(express.json());
app.use('/files',express.static(path.resolve(__dirname, '..' , 'upload')));
app.use(routes);



//porta de escuta
server.listen(3333);



