"use client";
import Link from "next/link";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import React, { useState } from "react";
export default function Navbar({user}: {user: KindeUser | null}) {

  const [menuState, setMenuState] = useState(false);

  const handleMenuClick = () => {
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
  };

  return (

    <nav className="top-0 shadow bg-slate-900 md:flex md:items-center md:justify-between fixed w-full h-14 md:h-20 z-20">

      {/* Logo and project name */}
      <div className="flex justify-between items-center p-2">
        <div className="text-2xl md:pl-5 font-semibold text-slate-50 cursor-pointer">
          <span>StoryForgers</span>
        </div>

        {
          !menuState ? (<span className="text-slate-50 text-3xl cursor-pointer md:hidden block" onClick={handleMenuClick}><FiAlignJustify /></span>
          ): (
            <span className="text-slate-50 text-3xl cursor-pointer md:hidden block" onClick={handleMenuClick}><IoMdClose /></span>
          )
        }
      </div>

      {/* Nav items and links */}
      <ul className="md:flex md:items-center md:z-auto md:static left-0 md:w-auto w-full md:py-0 md:pl-0 mt-5 md:mt-0 pl-5 transition-all ease-out duration-500 absolute md:opacity-100 opacity-0 top-[-400px] z-20 md:bg-slate-900 bg-white md:text-slate-100 rounded-xl text-slate-900">

        <li className="mx-4 my-6 md:my-0">
          <Link href="/" className="hover:text-amber-800 duration-500">Home</Link>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <Link href="#howtoplay" className="hover:text-amber-800 duration-500">How To Play</Link>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <Link href="#showcase" className="hover:text-amber-800 duration-500">Showcase</Link>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <Link href="/about" className="hover:text-amber-800 duration-500">About</Link>
        </li>
      </ul>

      {/* Authentication */}
      <div className={`md:block ${menuState ? "mt-[13.5rem]" : ""} ${menuState ? "bg-amber-800 w-50 rounded-xl p-2" : ""} pl-5 transition-all ease-out duration-200`}>
      {
        user ? (

          <div className="flex items-center md:pl-0 pl-5 transition-all ease-out duration-200">
            <div>{user.given_name}</div>
            <LogoutLink className="text-slate-900 bg-slate-100 hover:bg-slate-50 rounded-md p-2 mx-6 font-bold">Logout</LogoutLink>
          </div>
        ) : (

            <div className="md:pl-0 pl-5 transition-all ease-in duration-500 pr-4">
              <LoginLink className="text-slate-900 bg-slate-200 hover:bg-slate-50 font-bold rounded-md duration-500 px-6 py-2 mx-4">Sign in</LoginLink>
              <RegisterLink className="hover:text-slate-100">Sign up</RegisterLink>
            </div>
        )
      }
      </div>
    </nav>
  );
}