'use client'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import Input from "@/components/input"
import api from "@/lib/api"
import { useRouter } from "next/navigation"

const Schema = z.object({
    name: z.string().min(1, 'O campo nom é obrigatório'),
    email: z.string().email('Digite um email válido').min(1, 'O email é obrigatório'),
    phone: z.string().refine(value => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
        message: "o numero de telefone dever esta (DD) 999999999"
    }),
    address: z.string().optional()
})

type formData = z.infer<typeof Schema>

export default function NewCustomerForm({ userId } : { userId: string }) {
    
    const router = useRouter()
    
    const { register, handleSubmit, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(Schema)
    })

    async function handleRegisterCostumer(form: formData) {

        const data = {
            ...form,
            userId
        }

        try {
            await api.post('/api/customer', data);
            router.replace('/dashboard/customer')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form className="flex flex-col m-6" onSubmit={handleSubmit(handleRegisterCostumer)}>
            <label className="mb-1 text-lg font-medium">Nome completo</label>
            <Input
                type="text"
                name="name"
                placeholder="Digite o nome completo"
                error={errors.name?.message}
                register={register} />
            <section className="flex gap-2 flex-col sm:flex-row">
                <article className="flex-1">
                    <label className="mb-1 text-lg font-medium">Telefone</label>
                    <Input
                        type="number"
                        name="phone"
                        placeholder="Digite o nome completo"
                        error={errors.phone?.message}
                        register={register} />
                </article>
                <article className="flex-1">
                    <label className="mb-1 text-lg font-medium">Email</label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Digite o email"
                        error={errors.email?.message}
                        register={register} />
                </article>
            </section>

            <label className="mb-1 text-lg font-medium">Endereço</label>
            <Input
                type="text"
                name="address"
                placeholder="Digite seu endereço completo"
                error={errors.address?.message}
                register={register} />

            <button type="submit" className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold">Cadastrar</button>
        </form>
    )
}