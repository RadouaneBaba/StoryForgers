"use client";
import { socket } from "@/socket";
import { Room } from "@/types/Room";
import { useEffect, useState } from "react";
import Link from "next/link";
type Rooms = {
    [room_id: string]: Room;
};
export default function JoinGame() {
    const [rooms, setRooms] = useState<Rooms>({});
    useEffect(() => {
        console.log('joined', socket);
        socket.emit("getrooms");
        socket.on("sendrooms", rooms=>setRooms(rooms));
    }, []);
    
    return (
        <div className="">  
            {
                Object.keys(rooms).length == 0 && <div className="p-4 flex justify-center items-center">
                    <h1 className="text-xl sm:text-2xl font-semibold">No Stories available</h1>
                </div>
            }
            <ul className="">
                {
                    Object.keys(rooms).map((room, ind) => (<li key={ind} className="bg-slate-200 text-slate-900 border border-slate-900 text-lg flex justify-between">
                            <span className="font-semibold py-2 px-4 w-full border-r border-slate-900">{rooms[room].storyname}</span><Link href={"/game/" + room} className="bg-slate-900 text-slate-100 py-2 px-4 border border-slate-100">Join</Link>
                        </li>))
                }
            </ul>
        </div>
    )
}