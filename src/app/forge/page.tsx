import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import  Lobby from "@/components/lobby/Lobby"
export default async function forge() {
    const {isAuthenticated, getUser} = getKindeServerSession();

    if (!(await isAuthenticated())) {
        redirect("/api/auth/login");
    }
    const user = await getUser();
    return (
    <div className="h-screen">
        <div className="text-6xl">Forge route</div>
        <Lobby user={user} />
    </div>
    );
}