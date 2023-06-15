import { Server } from 'socket.io';

const io = new Server();

let waitingUser: string | null = null;

io.on('connection', (socket) => {
    socket.on('play', () => {
        if (waitingUser) {
            io.to(waitingUser).emit('matched', { opponent: socket.id });
            socket.emit('matched', { opponent: waitingUser });
            waitingUser = null;
        } else {
            waitingUser = socket.id;
        }
    });

    socket.on('cancel', () => {
        if (waitingUser === socket.id) {
            waitingUser = null;
        }
    });
});