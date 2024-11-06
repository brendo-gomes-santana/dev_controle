'use client'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const Schema = z.object({
    name: z.string().min(1, 'O campo nom é obrigatório'),
    email: z.string().email('Digite um email válido').min(1, 'O email é obrigatório'),
    phone: z.string().refine(value =>{
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
        message: "o numero de telefone dever esta (DD) 999999999"
    }),
    address: z.string().optional()
})

type formData = z.infer<typeof Schema>

export default function NewCustomerForm(){

    const { register, handleSubmit, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(Schema)
    })

    return(
        <form>
            <label>Nome completo</label>
            <input 
            placeholder="Digite o nome completo..."
            type="text" />
        </form>
    )
}