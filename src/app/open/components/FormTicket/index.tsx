'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import api from "@/lib/api";

import { CustomerDataInfor } from "../../page";
import Input from "@/components/input"

const schema = z.object({
    name: z.string().min(1, 'Campo obrigatório'),
    description: z.string().min(1, 'Campo obrigatório')
})

type FormData = z.infer<typeof schema>

export default function FormTicket({ customer }: { customer: CustomerDataInfor }) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })


    async function handlRegisterTicket(data: FormData){
        try{
            await api.post('/api/ticket', {
                name: data.name,
                description: data.description,
                customerId: customer.id
            })

            reset()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <form className="bg-slate-200 mt-6 px-4 py-6 rounded border-2" onSubmit={handleSubmit(handlRegisterTicket)}>
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <Input
                register={register}
                type="text"
                placeholder="Digite o nome do chamado"
                name="name"
                error={errors.name?.message}
            />

            <label className="mb-1 font-medium text-lg">Descreva o problema</label>
            <textarea 
                className="w-full border-2 rounded-md resize-none mb-2 px-2" 
                placeholder="Descreva o problema" 
                id="description" 
                {...register("description")}></textarea>
            {errors.description?.message && (
                <p className="text-red-500 my-1">{errors.description?.message}</p>
            )}

            <button type="submit" className="bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold">Cadastrar</button>
        </form>
    )
}