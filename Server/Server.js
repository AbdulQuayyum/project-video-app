const express = require('express')
const app = express()
const server = require("http").createServer(app);
const cors = require("cors");

const port = 8080

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

app.get('/', (req, res) => res.send('Heyy There!'))

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("CallEnded")
    });

    socket.on("CallUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("CallUser", { signal: signalData, from, name });
    });

    socket.on("AnswerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    });
});

server.listen(port, () => console.log(`Project is running!`))