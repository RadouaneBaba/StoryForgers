"use client";
import Link from "next/link";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import React, { useState } from "react";
export default function Navbar({user}: {user: KindeUser | null}) {

  const [menuState, setMenuState] = useState(false);

  /*const handleMenuClick = () => {
    let list = document.querySelector('ul');
    if (!menuState) {
      list?.classList.add('top-[30px]');
      list?.classList.add('opacity-100');
      setMenuState(true);
    }
    else {
      list?.classList.remove('top-[30px]');
      list?.classList.remove('opacity-100');
      setMenuState(false);
    }
  };*/

  const handleMenuClick = () => {
    setMenuState((menuState) => !menuState);
  };

  return (

    <nav className="md:flex text-slate-50 bg-slate-900 md:items-center md:justify-between fixed inset-0 w-full h-14 md:h-20 z-20">

      {/* Logo and project name */}
      <div className="flex justify-between items-center p-2">
        <div className="text-2xl md:pl-5 font-semibold text-slate-50 cursor-pointer">
          <span>StoryForgers</span>
        </div>
        {/* Menu */}
        <div className="md:hidden block z-30 transition-all ease-out duration-500">
          {
            !menuState ? (<span className="text-slate-50 text-3xl cursor-pointer" onClick={handleMenuClick}><FiAlignJustify /></span>
            ): (
              <span className="text-3xl cursor-pointer" onClick={handleMenuClick}><IoMdClose /></span>
            )
          }
        </div>
      </div>

      {/* Nav items and links */}
      <div className={`md:block ${!menuState ? "hidden": ""}`}>
        <div className="fixed inset-0 bg-slate-900 bg-opacity-45 backdrop-blur-sm md:hidden"></div>
        <ul className="md:static md:h-auto md:flex md:items-center md:z-auto md:w-auto md:py-0 md:pl-0 md:mt-0 transition-all ease-out duration-500 h-screen w-4/5 absolute right-0 top-0 md:opacity-100 md:bg-slate-900 bg-amber-700 md:text-slate-100 pt-20 px-6 text-xl opacity-90 md:text-base">

          <li className="mx-4 my-10 md:my-0">
            <Link href="/" className="hover:text-amber-200 md:hover:text-amber-700 duration-500 hover:underline hover:underline-offset-8">Home</Link>
          </li>
          <li className="mx-4 my-10 md:my-0">
            <Link href="/#howtoplay" className="hover:text-amber-200 md:hover:text-amber-700 duration-500 hover:underline hover:underline-offset-8">How To Play</Link>
          </li>
          <li className="mx-4 my-10 md:my-0">
            <Link href="/#showcase" className="hover:text-amber-200 md:hover:text-amber-700 duration-500 hover:underline hover:underline-offset-8">Showcase</Link>
          </li>
          <li className="mx-4 my-10 md:my-0">
            <Link href="/about" className="hover:text-amber-200 md:hover:text-amber-700 duration-500 hover:underline hover:underline-offset-8">About</Link>
          </li>
        </ul>
      </div>

      {/* Authentication */}
      <div className={`md:block ${!menuState ? "hidden": ""} transition-all ease-out duration-200 md:static fixed right-0 bottom-0 py-4`}>
      {
        user ? (

          <div className="flex items-center md:pl-0 pl-5 transition-all ease-out duration-200">
            <div className=" md:text-slate-50">{user.given_name}</div>
            <LogoutLink className=" bg-slate-100 hover:bg-slate-50 rounded-md p-2 mx-4 font-bold text-slate-900">Logout</LogoutLink>
          </div>
        ) : (

            <div className="md:pl-0 pl-5 transition-all ease-in duration-500 pr-4">
              <LoginLink className="md:hover:text-slate-100  md:text-slate-50 font-semibold md:font-base mx-6">Sign in</LoginLink>
              <RegisterLink className="text-slate-900 bg-slate-200 hover:bg-slate-50 font-bold rounded-md duration-500 px-2 py-2">Sign up</RegisterLink>
            </div>
        )
      }
      </div>
    </nav>
  );
}