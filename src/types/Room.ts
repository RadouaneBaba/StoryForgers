export type Room = {
    players: {
        [id: string]: string;
    };
    roundlength: number;
    storyname: string;
    started: boolean;
    owner: string;
    curr: number;
    story: string;
    turns: string[];
    rounds: number;
};
