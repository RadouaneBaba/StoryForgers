import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
export default async function forge() {
    const {isAuthenticated} = getKindeServerSession();

    if (!(await isAuthenticated())) {
        redirect("/api/auth/login");
    }

    return (
    <div className="h-screen text-6xl">Forge route</div>
    );
}