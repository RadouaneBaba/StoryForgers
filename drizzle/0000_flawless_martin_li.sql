CREATE TABLE IF NOT EXISTS "stories" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "story_writers" (
	"user_id" text NOT NULL,
	"story_id" serial NOT NULL,
	CONSTRAINT "story_writers_user_id_story_id_pk" PRIMARY KEY("user_id","story_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "story_writers" ADD CONSTRAINT "story_writers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "story_writers" ADD CONSTRAINT "story_writers_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
