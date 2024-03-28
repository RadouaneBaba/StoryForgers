import HowToPlay from "@/components/howtoplay/HowToPlay";
import Showcase from "@/components/showcase/Showcase";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="bg-slate-900">
      <Navbar user={user} />
      <div className="mt-12 md:mt-20"></div>
      <div className="md:flex md:justify-between h-screen xl:bg-gradient-to-br from-slate-900 to-amber-800 p-4">
        <div className="md:p-24 xl:w-2/5 md:m-12 text-center xl:text-left md:my-auto my-20">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-50">StoryForgers</h1> 
          <p className="my-16 text-lg md:text-2xl italic text-slate-100">“StoryForgers is an engaging turn-based online game where players take turns to craft their part of the story until they forge a captivating tale and share it with the World.”</p>
          <Link href="/forge" className="md:mt-12 shadow-lg shadow-amber-700/50 text-3xl bg-amber-700 text-amber-50 text-center font-semibold px-2 py-4 w-1/2 rounded-md">Forge a Story</Link>
        </div>
        <div className="my-auto mx-20 hidden xl:block">
        <Image
            src="/images/hero33.svg"
            width={800}
            height={600}
            alt="hero image example"
          />
          </div>
      </div>
      <HowToPlay />
      <Showcase />
      <footer className="p-6 text-sm">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Story Forgers. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}