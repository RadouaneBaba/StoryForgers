"use client";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import Gameplay from "@/components/gameplay/Gameplay";
import GameSettings from "@/components/game_settings/GameSettings";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";


export default function GameSet ({ room_id, user }: { room_id: string; user: KindeUser | null }) {
    const [gameStarted, setGameStarted] = useState(false);
    useEffect(() => {
        if (!socket.connected) socket.connect();
        console.log("game", socket.id);
        //socket.emit("gamestate", room_id, user?.id);
        if (gameStarted) {
            socket.emit("started", room_id);
        }

        socket.on("started", (val) => {
            setGameStarted(val);
        });
        /*return () => {
            socket.disconnect();
        }*/
    }, [gameStarted, room_id, user]);
    
    if (gameStarted) {
        return <Gameplay room_id={room_id} userid={user?.id}/>;
    }

    return <GameSettings room_id={room_id} startGame={() => setGameStarted(true)} user={user}/>;
}