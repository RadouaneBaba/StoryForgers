import {db} from "@/db";
import {users} from "@/db/schema";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {eq} from "drizzle-orm";
import {NextResponse} from "next/server";

export async function GET() {
    // check if user exists
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user || user == null || !user.id)
        //throw new Error("something went wrong with authentication" + user);
        return NextResponse.json({ error: 'something went wrong with authentication' }, { status: 500 })

    const dbUser = await db.select().from(users).where(eq(users.id, user.id));

    if (!dbUser || dbUser.length === 0) {
        await db.insert(users)
        .values({
            id: user.id,
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email,
        });
    }
    
    return NextResponse.redirect("https://story-forgers.vercel.app");
}