const { createServer } = require('http');
const { Server } = require('socket.io');
const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
});


const rooms = {};

io.on("connection", (socket) => {
    console.log("user connected with id " + socket.id);
    
    socket.on("create", (data, userid) => {
        let room_name = socket.id;
        rooms[room_name] = {
            players: {},
            roundlength: data.roundlength,
            storyname: data.storyname,
            started: false,
            owner: userid,
            curr: 0,
            story: '',
            turns: [],
            rounds: 0,
        }
    });
    socket.on("join_room", (room_name, user) => {
        if (rooms[room_name].started && !rooms[room_name].players[user?.id]) io.emit("allowed", false);
        else if (rooms[room_name].started && rooms[room_name].players[user?.id]) {
            socket.join(room_name);
            io.to(room_name).emit("started", true);
            //io.to(room_name).emit("nextturn", rooms[room_name]);
        }
        else {
            socket.join(room_name);
            rooms[room_name].players[user?.id] = user?.given_name;
            //if (rooms[room_name]?.players.length == 1) rooms[room_name].owner = socket.id;
            rooms[room_name].turns = Object.keys(rooms[room_name].players);
            io.to(room_name).emit("room_info", rooms[room_name]);
        }
    });
    
    socket.on("started", (room_id) => {
        if (rooms[room_id].started == false) rooms[room_id].started = true;
        io.to(room_id).emit("started", true);
        io.to(room_id).emit("nextturn", rooms[room_id]);
    });

    socket.on("getrooms", () => {
        io.emit("sendrooms", rooms);
    });

    socket.on("writing", (text, room_id) => {  
        io.to(room_id).emit("write", text);
    });
    
    socket.on("endturn", (room_id, text) => {
        rooms[room_id].rounds++;
        const writers = rooms[room_id].turns;
        console.log(writers.length);
        let currturn = rooms[room_id].curr;
        rooms[room_id].curr = (currturn == (writers.length - 1)) ? 0 : currturn + 1;
        rooms[room_id].story += ' ' + text;
        console.log(rooms[room_id], currturn);
        io.to(room_id).emit("nextturn", rooms[room_id]);

    });

    socket.on("endGame", room_id => {
        console.log("endGame", room_id);
        delete rooms[room_id];
        io.to(room_id).emit("quitgame");
    })
    socket.on("disconnect", () => {
        /*let room;
        let room_name;
        for (const [key, value] of Object.entries(rooms)) {
            const index = value.players.indexOf(socket.id);
            if (index !== -1) {
                value.players.splice(index, 1);
                room = value;
                room_name = key;
            }
        }
        io.to(room_name).emit("room_info", room);*/
        console.log("user disconnected with id " + socket.id);
    });

});


httpServer.listen(3001, () => {
    console.log("listening on port 3001");
});
