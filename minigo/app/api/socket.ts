import { Server } from 'socket.IO';

const io = new Server();

let waitingUser: string | null = null;

io.on('connection', (socket) => {
    if (waitingUser) {
        io.to(waitingUser).emit('matched', { opponent: socket.id });
        socket.emit('matched', { opponent: waitingUser });
        waitingUser = null;
    } else {
        waitingUser = socket.id;
    }
});