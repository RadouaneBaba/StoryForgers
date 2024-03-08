"use client";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { Room } from "@/types/Room";


export default function Gameplay ({ room_id, userid }: { room_id: string, userid: string | null | undefined }) {
    const [text, setText] = useState('');
    const [room, setRoom] = useState<Room>();
    const [endTurn, setEndTurn] = useState(false);
    const [curr, setCurr] = useState(false);
    function passTurn () {
        if (text != '') {
            setEndTurn(true);
        }
    }
    useEffect(() => {
        //socket.on("setup", (room) => setRoom(room));
        console.log("gameplay");
        if (endTurn) {
            setText('');
            socket.emit("endturn", room_id, text, room_id);
            setEndTurn(false);
        }
        socket.on("nextturn", (room) => {
            setText('');
            setRoom(room);
            if (userid == room?.turns[room?.curr]) setCurr(true);
            else setCurr(false);
        });
        socket.emit("writing", text, room_id);
        socket.on("write", (inp) => setText(inp));
    }, [endTurn, room, room_id, text, userid]);

    return (
        <div className="p-20">
                <h1>{room?.storyname}</h1>
                <div>current player: {room?.players[room?.turns[room?.curr]]}</div>
                <div>{room?.story}</div>
                <div>{text}</div>
                {curr &&
                    <div>
                        <textarea onChange={(e) => setText(e.target.value)} className="text-slate-900"/>
                        <button onClick={passTurn} className="bg-slate-100 text-slate-900 mx-2 p-2">Pass turn</button>
                    </div>
                }
        </div>
        )

}