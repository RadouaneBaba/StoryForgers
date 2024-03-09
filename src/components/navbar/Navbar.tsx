import Link from "next/link";
import Image from "next/image";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FiAlignJustify } from "react-icons/fi";
export default async function Navbar() {

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="p-5 shadow bg-slate-900 md:flex md:items-center md:justify-between fixed">
      {/* Logo and project name */}
      <div className="flex justify-between items-center mx-2">
        <div className="text-2xl pl-5 md:pl-0 font-semibold text-slate-50l cursor-pointer">
          <span className="text-white">StoryForgers</span>
        </div>
        <span className="text-white text-3xl cursor-pointer md:hidden block"><FiAlignJustify /></span>
      </div>

      {/* Nav items and links */}
      <ul className="md:flex md:items-center z-[-1] md:z-auto md:static left-0 md:w-auto w-full md:py-0 py-4 md:pl-0 pl-5 top-[-400px] transition-all ease-in duration-500">
        <li className="mx-4 my-6 md:my-0">
          <Link href="#" className="hover:text-slate-100 text-xl duration-500">Home</Link>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <Link href="#howtoplay" className="hover:text-slate-100 text-xl duration-500">How To Play</Link>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <Link href="#showcase" className="hover:text-slate-100 text-xl duration-500">Showcase</Link>
        </li>
      </ul>

      {/* Authentication */}
      {
        user ? (
          <div className="flex items-center md:pl-0 pl-5 top-[-400px] transition-all ease-in duration-500">
            <div>{user.given_name}</div>
            <LogoutLink className="text-slate-900 bg-slate-100 hover:bg-slate-50 rounded-md p-2 mx-6 font-bold">Logout</LogoutLink>
          </div>
        ) : (
            <div className="md:pl-0 pl-5 top-[-400px] transition-all ease-in duration-500">
              <LoginLink className="text-slate-900 bg-slate-200 hover:bg-slate-50 font-bold rounded-md font-[Poppins] duration-500 px-6 py-2 mx-4">Sign in</LoginLink>
              <RegisterLink className="hover:text-slate-100">Sign up</RegisterLink>
            </div>
        )
      }
    </nav>
  );
}