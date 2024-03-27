import React from 'react';
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { TiSocialGithub } from "react-icons/ti";



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
        image: '/images/profile.png',
        socials: {
            twitter: 'https://twitter.com/Lamin_Sage',
            linkedin: 'https://www.linkedin.com/in/lamin-jawla/',
            github: 'https://github.com/laminjawla1',
        }
    },
  ];

  return (
    <>
        <h1 className='text-white text-center text-5xl underline py-10'>Team</h1>
        <div className="flex flex-wrap justify-center items-center gap-20 p-8 text-white">
        {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center bg-slate-300 p-3 rounded-lg">
            <img src={member.image} alt={member.name} className="rounded-full w-20 h-20 mb-2" />
            <h2 className="text-xl font-bold mb-2 text-slate-600">{member.name}</h2>
            <div className="flex gap-2 text-3xl">
                <a
                    className='text-[#1DA1F2]'
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer">
                    <TiSocialTwitter/>
                </a>
                <a
                    className='text-[#0A66C2]'
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer">
                    <TiSocialLinkedin/>
                </a>
                <a
                    className=' text-[#171515]'
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer">
                    <TiSocialGithub/>
                </a>
            </div>
            </div>
        ))}
        </div>
    </>
  );
};

export default TeamComponent;
