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
const timers = {};
io.on("connection", (socket) => {
    console.log("user connected with id " + socket.id);
    
    socket.on("create", (data, userid) => {
        let room_name = socket.id;
        rooms[room_name] = {
            players: {},
            roundlength: data.roundlength * 60,
            storyname: data.storyname,
            started: false,
            owner: userid,
            curr: 0,
            story: '',
            turns: [],
            rounds: 0,
        }
        timers[room_name] = [null, rooms[room_name].roundlength];
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
        rooms[room_id].rounds++;
        io.to(room_id).emit("started", true);
        io.to(room_id).emit("nextturn", rooms[room_id]);
        if (!timers[room_id][0]) {
            timers[room_id][0] = setInterval(() => {
                io.to(room_id).emit("timer", timers[room_id][1]);
                console.log(timers[room_id][1]);
                timers[room_id][1]--;
                if (timers[room_id][1] == -1) {
                    io.to(room_id).emit("timeup");
                    console.log("emit");
                }
              }, 1000);
        }
    });

    socket.on("getrooms", () => {
        io.emit("sendrooms", rooms);
    });

    socket.on("writing", (text, room_id) => {  
        io.to(room_id).emit("write", text);
    });
    
    socket.on("endturn", (room_id, text) => {
        timers[room_id][1] = rooms[room_id].roundlength;
        rooms[room_id].rounds++;
        const writers = rooms[room_id].turns;
        console.log(writers.length);
        let currturn = rooms[room_id].curr;
        rooms[room_id].curr = (currturn == (writers.length - 1)) ? 0 : currturn + 1;
        rooms[room_id].story += ' ' + text;
        console.log(rooms[room_id], currturn);
        io.to(room_id).emit("nextturn", rooms[room_id]);
    });

    /*socket.on("getTimer", (room_id) => {
        // countdown
        let timer;
        let time = rooms[room_id].roundlength;
        if (!timer) {
            timer = setInterval(() => {
                io.to(room_id).emit("timer", time);
                console.log(time);
                socket.on("resetTimer", () => clearInterval(timer));
                if (time === 0) {
                    clearInterval(timer);
    
                } else {
                    time--;
                }
              }, 1000);
        }
          
    });*/

    socket.on("endGame", room_id => {
        console.log("endGame", room_id);
        clearInterval(timers[room_id][0]);
        delete rooms[room_id];
        io.to(room_id).emit("quitgame");
    });
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
