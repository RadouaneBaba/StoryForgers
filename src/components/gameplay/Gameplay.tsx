"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/socket";
import { Room } from "@/types/Room";
import { publishStory } from "@/app/actions";
import { BsUpload } from "react-icons/bs";

export default function Gameplay ({ room_id, userid }: { room_id: string, userid: string | null | undefined }) {
    const router = useRouter();
    const [text, setText] = useState('');
    const [room, setRoom] = useState<Room>();
    const [endTurn, setEndTurn] = useState(false);
    const [curr, setCurr] = useState(false);
    function passTurn () {
        if (text != '') {
            setEndTurn(true);
        }
    }
    function endGame () {
        let rounds = room ? room.rounds : 0;
        if (rounds >= 3) {
            publishStory(room);
            socket.emit("endGame", room_id);
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
        socket.on("quitgame", () => {
            router.push('/');
        });
    }, [endTurn, room, room_id, text, userid, router]);

    return (
        <div className="h-full">
            <div className="hidden">
                <span className="font-bold text-lg md:text-2xl p-2 bg-amber-900 absolute top-5 left-5">{room?.players[room?.turns[room?.curr]]}</span>
            </div>

            <div className="flex justify-center h-full">
                <div className="flex flex-col justify-between w-4/5 sm:w-2/3 lg:w-3/5">
                    <div className="">
                        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-semibold text-center p-4 text-slate-50">{room?.storyname}</h1>
                        <div className="text-center m-4">
                            <span className="text-amber-50 rounded-full font-medium text-md sm:text-2xl px-4 p-2 bg-amber-800">{room?.players[room?.turns[room?.curr]]}</span>
                        </div>
                    </div>
                    <div className="h-full relative bg-amber-100 rounded-md rounded-t-none shadow-lg p-4 sm:p-12 sm:text-xl border-4 border-amber-900 text-amber-900 overflow-y-auto">
                        <div className="">
                            <p className="">{room?.story}</p>
                            <p className="">{text}</p>
                        </div>
                        {(room?.owner == userid) && <button onClick={endGame} className="absolute bottom-4 right-2.5 bg-amber-200 rounded-full p-2 px-4 shadow-lg shadow-amber-950/5">End game</button>}
                    </div>
                    <div className="mt-4">
                        
                        {curr &&
                            <div className="relative mb-4">
                                <textarea name="text" onChange={(e) => setText(e.target.value)} 
                                className="block w-full resize-none rounded-xl border-2 border-amber-800 bg-amber-50 p-4 pr-20 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-900 sm:text-base"
                                rows={1} placeholder="Write your part..." required />
                                <button onClick={passTurn} className="absolute bottom-2 right-2.5 rounded-lg bg-amber-700 p-2 text-sm font-medium text-slate-50 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 sm:text-base">
                                    <BsUpload className="w-5 h-5" />
                                </button>
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
        )

}