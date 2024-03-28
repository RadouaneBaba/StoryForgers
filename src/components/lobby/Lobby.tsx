"use client";
import { useState, useEffect } from "react";
import { socket } from "@/socket";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import Create from "../create/Create";
import JoinGame from "../join_game/JoinGame";

export default function Lobby ({user}: {user: KindeUser | null}) {
    const [join, setJoin] = useState(false);
    useEffect(() => {
        if (!socket.connected) socket.connect();
    }, [])
    return (
    <div className="m-4 md:mt-12">
        <div className="flex">
            <button onClick={() => setJoin(false)} className={`font-bold text-2xl md:text-2xl p-2 border-4 border-b-0 ${!join ? "bg-slate-200 text-slate-900 rounded-tl-xl border-amber-900" : "border-slate-900 "}`}>Create</button>
            <button onClick={() => setJoin(true)} className={`font-bold text-2xl md:text-2xl p-2 border-4 border-b-0 ${join ? "bg-slate-200 text-slate-900 rounded-tr-xl border-amber-900" : "border-slate-900 "}`}>Join</button>
        </div>
        <div className="w-72 sm:w-96 bg-amber-700 text-slate-50 rounded-md rounded-t-none shadow-lg p-2 sm:text-xl border-4 border-amber-900">
            {!join && <Create user={user} />}
            {join && <JoinGame />}
        </div>
    </div>
    )
}