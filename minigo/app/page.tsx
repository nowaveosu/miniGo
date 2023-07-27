"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Lobby = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (username && room) {
      const gameURL = `/game?username=${username}&room=${room}`;
      router.push(gameURL);
    }
  };
  return (
    <div className="lobby">
      <h1>바둑 게임</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">사용자 이름:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="room">방 이름:</label>
          <input
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />
        </div>
        <button type="submit">입장</button>
      </form>
    </div>
  );
};

export default Lobby;