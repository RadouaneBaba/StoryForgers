import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import  Lobby from "@/components/lobby/Lobby"
import Navbar from "@/components/navbar/Navbar";
export default async function forge() {
    const {isAuthenticated, getUser} = getKindeServerSession();

    if (!(await isAuthenticated())) {
        redirect("/api/auth/login");
    }
    const user = await getUser();
    return (
    <>
        <Navbar user={user}/>
        <div className="pt-20"></div>
        <div className="md:h-screen bg-slate-900">
            <div className="text-3xl sm:text-5xl py-10 text-slate-50 font-semibold text-center">Forge a New Story</div>
            <div className="flex justify-center items-center">
                <Lobby user={user} />
            </div>
        </div>
    </>
    );
}