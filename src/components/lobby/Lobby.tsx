"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { socket } from "@/socket";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";


type Inputs = {
    storyname: string;
    roundlength: number;
}

export default function Lobby ({user}: {user: KindeUser | null}) {
    //const [text, setText] = useState('');
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        socket.emit("create", data, user?.id);
        let game_path = '/game/' + data.storyname + '_' + socket.id;
        router.push(game_path);
    };
    
    useEffect(() => {
        console.log("lobby");
        socket.connect();

        /*return () => {
            console.log("unmounted");
            socket.off("create");
            socket.disconnect();
        }*/
    }, []);

    
    return (
    <div className="p-20">
        <h1>Create</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Story name: </label>
                <input {...register("storyname", { required: true })} className="text-slate-900" />
                {errors.storyname && <span>This field is required</span>}
            </div>
            <div>
                <label>Round length (in min): </label>
                <input defaultValue={10} {...register("roundlength", { required: true })} className="text-slate-900" />
                {errors.roundlength && <span>This field is required</span>}
            </div>

            <input type="submit" />
        </form>
    </div>
    )
}