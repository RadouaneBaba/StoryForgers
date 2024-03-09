"use client";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { Room } from "@/types/Room";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";


export default function GameSettings ({ room_id, startGame, user }: { room_id: string, startGame: () => void, user: KindeUser | null }) {
    const [room, setRoom] = useState<Room>();
    const [allowed, setAllowed] = useState(true);
    useEffect(() => {
        // notify the server that a writer has joined the room and feed him with room information
        socket.emit("join_room", room_id, user);
        // check if player allowed to join
        socket.on("allowed", (val) => setAllowed(val));
        socket.on("room_info", (updatedroom) => {
            setRoom(updatedroom);
        });
    }, [room_id, allowed, user]);
    if (!allowed)
    {
        return (
            <div className="h-screen">
                <h1>You cannot join this lobby</h1>
            </div>
        )
    }
    return (
        <div className="p-20">
            <h1>{room?.storyname}</h1>
            <ul>
                {room?.turns?.map((id, ind) => <li key={ind}>{room?.players[id]}</li>)}
            </ul>
            {user?.id == room?.owner &&
            <button onClick={startGame} className="mt-12 shadow-lg shadow-amber-700/50 text-3xl bg-amber-700 text-amber-50 text-center font-semibold px-2 py-4 w-1/2 rounded-md">Start game</button>}
        </div>
    )
}