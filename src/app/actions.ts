"use server";
import { db } from "@/db";
import { Room } from "@/types/Room";
import { stories, users, storyWriters } from "@/db/schema";
export async function publishStory(room: Room | undefined) {
    if (!room) {
        console.error("No room to publish");
        return;
    }
    const dbStory = await db.insert(stories).values({
        title: room.storyname,
        text: room.story,
        roundLength: room.roundlength,
        rounds: room.rounds,
    }).returning();

    for (const user of Object.keys(room.players)){
        await db.insert(storyWriters).values({
            userId: user,
            storyId: dbStory[0].id,
        });
    };

    console.log("inserted", dbStory);

}

export async function getStories () {
    const dbStories = await db.select().from(stories);

    console.log("stories: ", dbStories);
    return dbStories;
}