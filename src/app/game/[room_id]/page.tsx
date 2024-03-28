import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import  GameSetup from "@/components/game_setup/GameSetup";
export default async function Game({ params } : { params: { room_id: string } }) {
    const {isAuthenticated, getUser} = getKindeServerSession();

    if (!(await isAuthenticated())) {
        redirect("/api/auth/login");
    }
    const user = await getUser();
    return (
    <div className="h-screen">
        <GameSetup room_id={params.room_id} user={user} />
    </div>
    );
}