ALTER TABLE "stories" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "stories" ADD COLUMN "round_length" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "stories" ADD COLUMN "rounds" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "stories" ADD COLUMN "created_at" timestamp DEFAULT now();