import HowToPlay from "@/components/howtoplay/HowToPlay";
import Showcase from "@/components/showcase/Showcase";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="pt-20"></div>
      <div className="flex justify-between h-screen bg-gradient-to-br from-slate-900 to-amber-800">
        <div className="p-24 w-1/3 m-12">
          <h1 className="text-6xl font-bold text-slate-50">StoryForgers</h1> 
          <p className="my-10 text-2xl italic">“StoryForge is an engaging turn-based online game where players take turns to craft their part of the story until they forge a captivating tale and share it with the World.”</p>
          <Link href="/forge" className="mt-12 shadow-lg shadow-amber-700/50 text-3xl bg-amber-700 text-amber-50 text-center font-semibold px-2 py-4 w-1/2 rounded-md">Forge a Story</Link>
        </div>
        <div className="m-24">
        <Image
            src="/images/hero33.svg"
            width={700}
            height={700}
            alt="hero image example"
          />
          </div>
      </div>
      <HowToPlay />
      <Showcase />
      <footer className="bg-gray-800 text-white p-10">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Story Forgers. All rights reserved.</p>
            <p>Connect with us on <a href="#" className="text-blue-500 hover:underline">Twitter</a> and <a href="#" className="text-blue-500 hover:underline">Instagram</a></p>
          </div>
      </footer>
    </div>
  );
}