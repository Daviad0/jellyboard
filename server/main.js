const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    path: '/live',
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://jelly:board@jellybaord.viv4kml.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    pwHash: String,
    pwSalt: String,
    type: String // creator, player
});
const User = mongoose.model('User', userSchema);

const boardSchema = new mongoose.Schema({
    title: String,
    description: String,
    creator: String, // user id
    createdAt: Date,
    slides: [{
        title: String,
        data: Object,
        usageHistory: Object
    }],
    public: Boolean
})
const Board = mongoose.model('Board', boardSchema);


app.use(bodyParser.json());
app.use(cookieParser());



function generateCode(){
    // gen 5 letter code
    var code = "";
    while(applicableSession.filter(session => session.code == code).length == 0 && code != ""){
        code = "";
        for(var i = 0; i < 5; i++){
            code += String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
        code = code.toUpperCase();
    }
    return code;
}


io.on('connection', (socket) => {
    socket.on('ping', (data) => {
        socket.emit('home:active_sessions', activeSessions.length);
    });

    socket.on("host:create_session", (data) => {
        const { board, stateData } = data;

        var applicableBoard = Board.find({ _id: board });
        if (applicableBoard.length == 0) {
            socket.emit("host:create_session", { valid: false, error: "Board not found" });
            return;
        }
        applicableBoard = applicableBoard[0];

        const code = generateCode();
        activeSessions.push({
            code,
            applicableBoard,
            aliveUntil: new Date(),
            players: [],
            stateData: {}
        });
        socket.emit("host:create_session", { code });
    });



    socket.on('home:verify_code', (data) => {
        const {code} = data;
        const applicableSession = activeSessions.filter(session => session.code == code);
        if(applicableSession.length == 0){
            socket.emit('home:verify_code', {valid: false});
        }else{
            socket.emit('home:verify_code', {valid: true});
        }
    });
    socket.on('home:join', (data) => {
        const {code, username} = data;
        const applicableSession = activeSessions.filter(session => session.code == code);
        if(applicableSession.length == 0){
            socket.emit('home:verify_code', {valid: false});
        }else{
            const session = applicableSession[0];
            if(session.players.filter(player => player.username == username).length > 0){
                socket.emit('home:join', {valid: false, message: "Username already taken!"});
                return;
            }
            session.players.push({
                username,
                lastSeen: new Date()
            });
            socket.nickname = username + "@" + code;
            socket.emit('home:join', {valid: true, stateData: session.stateData});
        }
    });


});



var activeSessions = [];
/*
{
    code: String (id),
    board: String (id)
    aliveUntil: Date,
    players: [{
        username: String,
        lastSeen: Date
    }],
    stateData: Object
}


*/







const crypto = require('crypto');
const jwt = require('jsonwebtoken');
function hashPW(password){
    const salt = crypto.randomBytes(16).toString('hex');
    const pwHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { pwHash, salt };
}
function checkPW(password, pwHash, salt){
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === pwHash;
}

function genToken(user){
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    return jwt.sign({
        _id: user._id,
        username: user.username,
        exp: expires.getTime() / 1000
    }, 'jelly');
}
function validateToken(token){
    jwt.verify(token, 'jelly', (err, decoded) => {
        if (err) {
            console.error(err);
            return false;
        } else {
            return true;
        }
    });
}
function validateIdentity(req){
    const { token } = req.cookies;
    jwt.verify(token, 'jelly', (err, decoded) => {
        if (err) {
            console.error(err);
            return false;
        } else {
            return true;
        }
    });
}



app.post("/acc/register", async (req, res) => {
    const { username, email, password } = req.body;
    const { pwHash, salt } = hashPW(password);

    var existingUser = User.find({ username });
    if (existingUser.length > 0) {
        res.status(409).send("Username already exists");
        return;
    }

    const user = new User({
        username,
        email,
        pwHash,
        pwSalt: salt,
        type: 'creator'
    });

    user.save((err, user) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            user.pwHash = undefined;
            user.pwSalt = undefined;
            user.token = genToken(user);
            res.status(200).send(user);
        }
    });
});

app.post("/acc/login", async (req, res) => {
    const { username, password } = req.body;
    var applicableUser = User.find({ username });
    if (applicableUser.length == 0) {
        res.status(401).send("Login Failed");
    } else {
        const user = applicableUser[0];
        if (checkPW(password, user.pwHash, user.pwSalt)) {
            user.pwHash = undefined;
            user.pwSalt = undefined;
            user.token = genToken(user);
            res.status(200).send(user);
        } else {
            res.status(401).send("Login Failed");
        }
    }
});

app.post("/acc/validate", async (req, res) => {
    const { token } = req.body;
    if (validateToken(token)) {
        res.status(200).send("Valid");
    } else {
        res.status(401).send("Invalid");
    }
});

app.get("/board/:id", async (req, res) => {
    const { id } = req.params;
    const board = Board.find({ _id: id });
    if (board.length == 0) {
        res.status(404).send("Board not found");
    } else {
        res.status(200).send(board[0]);
    }
});

app.post("/board/create", async (req, res) => {
    if(!validateIdentity(req)){
        res.status(401).send("Invalid");
        return;
    }
    const { title, description, creator, slides, public } = req.body;
    const board = new Board({
        title,
        description,
        creator,
        createdAt: new Date(),
        slides,
        public
    });
    board.save((err, board) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(board);
        }
    });
});

app.post("/board/update", async (req, res) => {
    if(!validateIdentity(req)){
        res.status(401).send("Invalid");
        return;
    }
    const { id, title, description, slides, public } = req.body;
    const board = Board.find({ _id: id });
    if (board.length == 0) {
        res.status(404).send("Board not found");
    } else {
        board[0].title = title;
        board[0].description = description;
        board[0].slides = slides;
        board[0].public = public;
        board[0].save((err, board) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(board);
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});