'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const MeetPage = () => {
    const router = useRouter();
    const [roomId, setRoomId] = useState('');


    const handleNavigate = () => {
        router.push(`/room/${roomId}`);
    }

    return (
        
        <div>
            meet MeetPage
            <input type="text" placeholder="Enter room name"  onChange={(e)=>setRoomId(e.target.value)} />
            <button onClick={handleNavigate}>Join</button>
        </div>
    );
}

export default MeetPage;
