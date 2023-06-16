import { Server } from 'socket.io';

const io = new Server();

interface Game {
    player1: string;
    player2: string;
    currentTurn: string;
}

const games: Game[] = [];

io.on('connection', (socket) => {
    socket.on('play', () => {
        const game = games.find(game => game.player2 === '');
        if (game) {
            game.player2 = socket.id;
            game.currentTurn = game.player1;
            io.to(game.player1).emit('start', { opponent: socket.id });
            io.to(game.player2).emit('start', { opponent: game.player1 });
        } else {
            games.push({ player1: socket.id, player2: '', currentTurn: '' });
        }
    });

    socket.on('move', () => {
        const game = games.find(game => game.player1 === socket.id || game.player2 === socket.id);
        if (!game) return;
        if (game.currentTurn !== socket.id) return;
        game.currentTurn = game.currentTurn === game.player1 ? game.player2 : game.player1;
        io.to(game.currentTurn).emit('yourTurn');
    });

    socket.on('disconnecting', () => {
        const gameIndex = games.findIndex(game => game.player1 === socket.id || game.player2 === socket.id);
        if (gameIndex === -1) return;
        const game = games[gameIndex];
        const opponent = game.player1 === socket.id ? game.player2 : game.player1;
        io.to(opponent).emit('opponentLeft');
        games.splice(gameIndex, 1);
    });
});