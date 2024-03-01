import Link from "next/link";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
export default async function Navbar() {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="flex items-center justify-between h-20 bg-slate-900 fixed w-full">
        <div className="text-3xl font-semibold m-2 px-4 text-slate-50">
            <h1>StoryForgers</h1>
        </div>
        <div>
            <Link href="#" className="m-4 hover:text-slate-100">Home</Link>
            <Link href="#" className="m-4 hover:text-slate-100">How To Play</Link>
            <Link href="#" className="m-4 hover:text-slate-100">Showcase</Link>
        </div>
      {user ? (
        <div className="flex items-center">
          <div>{user.given_name}</div>
          <LogoutLink className="text-slate-900 bg-slate-100 hover:bg-slate-50 rounded-md p-2 mx-6 font-bold">Logout</LogoutLink>
        </div>
        ) : (
        <div className="mx-10">
          <LoginLink className="text-slate-900 bg-slate-200 hover:bg-slate-50 rounded-md p-2 mx-4 font-bold">Sign in</LoginLink>
          <RegisterLink className="hover:text-slate-100">Sign up</RegisterLink>
        </div>
      )}
    </nav>
  );
}