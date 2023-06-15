"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import './globals.css'

const Home = () => {
    const router = useRouter();
    const [matching, setMatching] = useState(false);
    const [matched, setMatched] = useState(false);
    const socket = io();
    socket.on('matched', ({ opponent }) => {
        console.log(`Matched with ${opponent}`);
        setMatched(true);
        router.push('/game');
    });

    const handlePlayClick = () => {
        setMatching(true);
        socket.emit('play');
    }

    const handleCancelClick = () => {
        setMatching(false);
        setMatched(false);
        socket.emit('cancel');
    }

    return (
        <>
            <h1>miniGo</h1>
            {!matching && (
                <button className='play' onClick={handlePlayClick}>
                    플레이하기
                </button>
            )}
            {matching && !matched && (
                <>
                    <div>게임을 찾는중...</div>
                    <button className='cancel' onClick={handleCancelClick}>
                        취소
                    </button>
                </>
            )}
            {matching && matched && (
                <>
                    <div>게임을 찾았습니다!</div>
                    <button className='cancel' onClick={handleCancelClick}>
                        취소
                    </button>
                </>
            )}
        </>
    );
}

export default Home;