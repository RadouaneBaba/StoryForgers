"use client";
import { useState } from "react";
import { SelectStory } from "@/db/schema"
export default function StoryCard({ story }: {story: SelectStory}) {
    const [showModal, setShowModal] = useState(false);
    return (
    <div>
        <div className="shadow-xl shadow-slate-900/5 bg-slate-950 rounded-md">
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-slate-50">{story.title}</h2>
                <p className="text-slate-100 mb-4 line-clamp-3">{story.text}</p>
                <div className="flex justify-between">
                    <p className="text-slate-50">Rounds: {story.rounds}</p>
                    <span className="text-slate-300 hover:underline hover:text-slate-50 cursor-pointer" onClick={()=>setShowModal(true)}>Read More</span>
                </div>
            </div>
        </div>
            { showModal && (
                <>
                <div className="opacity-45 fixed inset-0 z-40 bg-slate-950"></div>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl m-2 text-slate-50"
                >
                  <div className="relative w-auto my-6 mx-auto max-w-3xl p-4 max-h-96">
                    {/*content*/}
                    <div className="relative border-0 rounded-lg shadow-lg w-full bg-slate-950 outline-none focus:outline-none">
                      {/*header*/}
                      <div className="relative p-5">
                        <h3 className="text-3xl font-semibold text-center">
                          {story.title}
                        </h3>
                      </div>
                      {/*body*/}
                      <div className="relative p-6">
                        <p className="my-4 text-lg leading-relaxed">
                        {story.text}
                        </p>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end py-6 rounded-b">
                        <button
                          className="text-slate-50 font-semibold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:text-slate-100"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
    </div>
    )
}