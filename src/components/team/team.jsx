import Link from 'next/link';
import React from 'react';
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { TiSocialGithub } from "react-icons/ti";
import Image from "next/image";

const TeamComponent = () => {
  const teamMembers = [
    {
        name: 'Lamin Jawla',
        image: '/images/sage.jpg',
        socials: {
            twitter: 'https://twitter.com/Lamin_Sage',
            linkedin: 'https://www.linkedin.com/in/lamin-jawla/',
            github: 'https://github.com/laminjawla1',
        }
    },
    {
        name: 'Radouane Baba',
        image: '/images/profil.jpeg',
        socials: {
            twitter: '',
            linkedin: 'https://www.linkedin.com/in/radouane-baba-61694b18a/',
            github: 'https://github.com/RadouaneBaba',
        }
    },
  ];

  return (
    <>
        <h1 className='text-white text-center text-5xl underline py-10'>Team</h1>
        <div className="flex flex-wrap justify-center items-center gap-20 p-8 text-white">
        {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center bg-slate-300 p-3 rounded-lg w-56">
            <Image src={member.image} alt={member.name} width={80} height={80} className="rounded-full w-20 h-20 mb-2" />
            <h2 className="text-xl font-bold mb-2 text-slate-600">{member.name}</h2>
            <div className="flex gap-2 text-3xl">
                {/*<Link
                    className='text-[#1DA1F2]'
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer">
                    <TiSocialTwitter/>
        </Link>*/}
                <Link
                    className='text-[#0A66C2]'
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer">
                    <TiSocialLinkedin/>
                </Link>
                <Link
                    className=' text-[#171515]'
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer">
                    <TiSocialGithub/>
                </Link>
            </div>
            </div>
        ))}
        </div>
    </>
  );
};

export default TeamComponent;
