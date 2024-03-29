"use client";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import Gameplay from "@/components/gameplay/Gameplay";
import GameSettings from "@/components/game_settings/GameSettings";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { useRouter } from "next/navigation";

export default function GameSet ({ room_id, user }: { room_id: string; user: KindeUser | null }) {
    const router = useRouter();
    const [gameStarted, setGameStarted] = useState(false);
    useEffect(() => {
        if (!socket.connected) socket.connect();
        console.log("game", socket.id);
        
        socket.on("started", (val) => {
            setGameStarted(val);
        });
        socket.on("quitgame", () => {
            router.push('/');
        });
        return () => {
            socket.off("quitgame");
            socket.off("started");
            socket.disconnect();
        }
    }, [room_id, user, router]);

    useEffect (() => {
        if (gameStarted) {
            socket.emit("started", room_id);
        }
        if (!gameStarted && !socket.id) router.push('/forge');
    }, [gameStarted, room_id, router]);
    
    if (gameStarted) {
        return <Gameplay room_id={room_id} userid={user?.id}/>;
    }

    return <GameSettings room_id={room_id} startGame={() => setGameStarted(true)} user={user}/>;
}