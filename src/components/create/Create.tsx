"use client";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { socket } from "@/socket";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

type Inputs = {
    storyname: string;
    roundlength: number;
}

export default function Create ({user}: {user: KindeUser | null}) {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        socket.emit("create", data, user?.id);
        let game_path = '/game/' + socket.id;
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
    <div className="">
        <form onSubmit={handleSubmit(onSubmit)} className="p-2">
            <div className="sm:px-10 p-4">
                <label className="font-semibold block">Story name {errors.storyname && <span className="text-amber-200">*</span>}</label>
                <input {...register("storyname", { required: true })} className="rounded-md bg-slate-50 text-amber-900 my-2 p-2 font-medium focus:outline-none focus:ring focus:ring-amber-800" />
                    
            </div>
            <div className="sm:px-10 px-4 pb-2">
                <label className="font-semibold block">Round length (in min) {errors.roundlength && <span className="text-amber-200">*</span>}</label>
                <input type="number" defaultValue={10} {...register("roundlength", { required: true })} className="rounded-md bg-slate-50 text-amber-900 my-2 p-2 font-medium focus:outline-none focus:ring focus:ring-amber-800" />
            </div>

            <div className="text-center sm:text-right">
                <button type="submit" className="bg-amber-50 px-4 py-2 rounded-md text-amber-700 mt-6 font-semibold hover:bg-amber-100 text-lg border-2 border-amber-800">Create a Story</button>
            </div>
        </form>
    </div>
    )
}