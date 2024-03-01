import StoryCard from "../storycard/StoryCard";

export default function Showcase() {
    return (
        <div className="bg-gradient-to-r from-slate-900 to-amber-800">
            <h1 className="text-6xl font-bold text-center p-24 text-slate-100">Showcase</h1>
            <div className="m-20 grid grid-cols-3 gap-8 mb-10">
                <StoryCard />
                <StoryCard />
                <StoryCard />
            </div>
            <div className="text-center pb-20">
                <button className="p-4 rounded-md font-bold bg-slate-200 text-slate-900 hover:bg-slate-50">Show more</button>
            </div>
        </div>
    )
}