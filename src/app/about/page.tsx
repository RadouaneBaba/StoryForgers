import Navbar from '@/components/navbar/Navbar';
import React from 'react';
import Link from 'next/link';
import TeamComponent from "@/components/team/team"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function About() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  return (
    <>
      <Navbar user={user}/>
      <div
        className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center"
        style={{
          backgroundImage: `url(/images/hero3.jpeg)`,
          minHeight: "100vh",
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-white">
              <h1 className="mb-4 text-4xl font-semibold">Story Forgers</h1>
              <h5 className="mb-6 text-xl font-semibld">A place to forge a tale and inspire millions.</h5>
              <Link
                href="/forge"
                type="button"
                className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-auto p-5 items-center">
      {/* Left side with text */}
      <div className="items-center p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">What it is?</h1>
        <p className='text-center items-center justify-center'>&quot;Story Forgers was born from the desire to cultivate a vibrant community of passionate storytellers. It serves as a hub for connecting individuals who share a love for crafting compelling narratives, fostering an environment where incredible stories are woven, and where inspiration has the power to transform lives.&quot;</p>
      </div>

      {/* Right side with video */}
      <div className="relative border rounded-md overflow-hidden">
        <video style={{ width: '100%' }} autoPlay loop muted className="w-full h-full object-cover">
          <source src="/gifs/storyforgers.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <TeamComponent/>


    <div className='flex items-center text-center justify-center py-10'>
        <Link
            target="_blank"
            href="https://github.com/RadouaneBaba/StoryForgers"
            type="button"
            className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-twe-ripple-init
            data-twe-ripple-color="light">
            Visit The Repository
        </Link>
    </div>
    </>
  );
}
