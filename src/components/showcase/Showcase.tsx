import StoryCard from "../storycard/StoryCard";
import { getStories } from "@/app/actions";
export default async function Showcase() {
    const stories = await getStories();
    return (
        <div className="p-4 mt-10" id="showcase">
            <h1 className="text-4xl md:text-6xl font-bold text-center text-slate-50 mb-20">Showcase</h1>
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-8 ">
                {
                    stories.map(story => <div key={story.id}><StoryCard story={story} /></div>)
                }
            </div>
            <div className="text-center pb-16 md:pb-18 m-10">
                <button className="m-6 p-4 shadow-lg shadow-amber-700/50 text-lg bg-amber-700 text-amber-50 text-center font-semibold px-2 py-4 rounded-md">Show more</button>
            </div>
        </div>
    )
}