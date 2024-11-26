"use client"

import { useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiSearch, FiX } from "react-icons/fi";


import Input from "@/components/input"
import FormTicket from "./components/FormTicket";

const schema = z.object({
    email: z.string().email('Digite o email do cliente para localizar').min(1, 'Campo obrigatório')
})

interface CustomerDataInfor {
    id: string;
    name: string;
}

type FormData = z.infer<typeof schema>

export default function OpenTicket() {

    const [customer, setCustomer] = useState<CustomerDataInfor | null>({ id: '1', name: 'João' });

    const { handleSubmit, register, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    function handleClearCustomer() {
        setCustomer(null);
        setValue("email", "")
    }

    return (
        <section className="w-full max-w-2xl mx-auto px-2 ">
            <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>

            <article className="flex flex-col mt-4 mb-2">
                {customer ? (
                    <div className="bg-slate-200 py-6 px-4 rounded border-2 flex items-center justify-between">
                        <p className="text-lg">
                            <strong>Cliente Selecionado: </strong> {customer.name}
                        </p>
                        <button className="h-11 px-2 items-center justify-center rounded" onClick={handleClearCustomer}>
                            <FiX size={30} color="#ff2929" />
                        </button>
                    </div>
                ) : (
                    <form className="bg-slate-200 py-6 px-2 rounded border-2">
                        <div className="flex flex-col gap-3">
                            <Input
                                error={errors.email?.message}
                                placeholder="Digite o email do cliente"
                                name="email"
                                register={register}
                                type="text" />

                            <button className="bg-blue-500 flex flex-row gap-3 px-2 h-11 items-center justify-center text-white font-bold rounded">
                                Procurar cliente
                                <FiSearch size={24} color="#fff" />
                            </button>
                        </div>
                    </form>
                )}
                {customer !== null && (
                    <FormTicket />
                )}

            </article>

        </section>
    )
}