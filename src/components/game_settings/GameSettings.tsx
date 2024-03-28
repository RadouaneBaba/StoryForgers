"use client";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { Room } from "@/types/Room";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import Link from "next/link";

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
            <div className="h-screen text-center">
                <h1 className="text-5xl font-semibold text-slate-50 p-20">You cannot join this lobby</h1>
                <Link href="/" className="px-4 p-2 bg-amber-800 text-amber-50 rounded-full my-4">Go back Home</Link>
            </div>
        )
    }
    return (
        <div className="text-slate-900 h-full flex justify-center items-center text-center">
            <div className="w-72 sm:w-96 md:w-1/3 bg-slate-200 rounded-xl shadow-lg sm:text-xl border-4 border-amber-900 p-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold sm:px-6 sm:mb-12 mb-8">{room?.storyname}</h1>
                <div className="bg-slate-100 text-slate-900 m-6 font-medium rounded-lg border border-slate-900 shadow-lg">
                    <h1 className="bg-amber-700 p-2 rounded-t-lg text-slate-50">Writers</h1>
                    <ul>
                        {room?.turns?.map((id, ind) => <li key={ind} className="p-2 border-t border-slate-900">{room?.players[id]}</li>)}
                    </ul>
                </div>
                <div className="text-center">
                    {user?.id == room?.owner &&
                    <button onClick={startGame} className="mt-4 sm:mt-8 shadow-lg shadow-amber-700/50 text-xl sm:text-3xl bg-amber-700 text-amber-50 text-center font-semibold px-2 py-4 rounded-md">Start game</button>}
                </div>
            </div>
        </div>
    )
}