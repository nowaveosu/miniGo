import Link from 'next/link';
import './globals.css'

const Home = () => {
    return (
        <>
            <h1>Expand Your Territory</h1>
            <button className='play'>
                <Link href="/game">플레이하기</Link>
            </button>
        </>
    );
}

export default Home;