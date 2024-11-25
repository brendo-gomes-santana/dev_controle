'use client'

import { UseFormRegister, RegisterOptions } from "react-hook-form";
interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

export default function Input(props: InputProps) {
    return (
        <>
            <input
            className="w-full border-2 rounded-md h-11 px-2" 
            placeholder={props.placeholder} 
            type={props.type}
            {...props.register(props.name, props.rules)}
            id={props.name}
            />
            {props.error && (
                <p className="text-red-500 my-1">{props.error}</p>
            )}
        </>
    )
}