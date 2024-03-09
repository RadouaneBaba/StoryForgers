import {db} from "@/db";
import {users} from "@/db/schema";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {eq} from "drizzle-orm";
import {NextResponse} from "next/server";

export async function GET() {
    // check if user exists
    const {getUser, getOrganization} = getKindeServerSession();
    const user = await getUser();
    // const {orgCode} = await getOrganization();

    if (!user || user == null || !user.id)
        throw new Error("something went wrong with authentication" + user);

    const dbUser = await db.select().from(users).where(eq(users.id, user.id));
    //console.log(dbUser, user);
    // or const dbUser = await db.select().from(users).where(eq(users.id, user.id)).get();

    if (!dbUser || dbUser.length === 0) {
        await db.insert(users)
        .values({
            id: user.id,
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email,
        });

        // or
        // db.insert(users)
        //     .values({
        //         id: user.id,
        //         firstName: user.given_name,
        //         lastName: user.given_name,
        //         email: user.email
        //     })
        //     .run();
    }
    
    return NextResponse.redirect("http://localhost:3000/");
}