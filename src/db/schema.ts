import { serial, text, pgTable, primaryKey, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'

export const users = pgTable("users", {
	  id: text("id").primaryKey(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    email: text("email")
});

export const usersRelations = relations(users, ({ many }) => ({
    stories: many(storyWriters),
}));

export const stories = pgTable("stories", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    text: text("text").notNull(),
    roundLength: integer("round_length").notNull(),
    rounds: integer("rounds").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const storiesRelations = relations(stories, ({ many }) => ({
  writers: many(storyWriters),
}));

export const storyWriters = pgTable('story_writers', {
    userId: text('user_id').notNull().references(() => users.id),
    storyId: serial('story_id').notNull().references(() => stories.id),
  }, (t) => ({
    pk: primaryKey(t.userId, t.storyId),
  }));

export const storyWritersRelations = relations(storyWriters, ({ one }) => ({
    story: one(stories, {
      fields: [storyWriters.storyId],
      references: [stories.id],
    }),
    user: one(users, {
      fields: [storyWriters.userId],
      references: [users.id],
    }),
  }));
  

export type SelectStory = InferSelectModel<typeof stories>
  