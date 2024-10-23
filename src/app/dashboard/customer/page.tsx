import Container from "@/components/container";
import { getServerSession } from "next-auth";
import { AuthOprions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from 'next/link';

import CardCustomer from "./components/card";

export default async function Costumer(){

    const session = await getServerSession(AuthOprions);

    if(!session || !session.user){
      redirect('/')
    }

    return(
        <Container>
            <main className="mt-p mb-2">
                <div  className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Meu clientes</h1>
                    <Link href="/dashboard/customer/new" className="bg-blue-500 text-white ox-4 py-1 rounded">
                        Novo cliente
                    </Link>
                </div>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    <CardCustomer/>

                </section>
            </main>
        </Container>
    )
}