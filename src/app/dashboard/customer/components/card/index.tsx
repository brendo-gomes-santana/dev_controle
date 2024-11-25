import prisma from "@/lib/prisma";

interface CardCustomer {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export default function CardCustomer({ id, phone, email, name }: CardCustomer){

    async function handleDeleteCustomer(id_customer: string){
        try{
            await prisma.customer.delete({
                where: {
                    id: id_customer
                }
            })
        }catch(err){
            console.log(err)
        }
    }

    return(
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-200">
            <h2>
                <a className="font-bold">Nome: </a>{name}
            </h2>
            <p>
            <a className="font-bold">Email: </a> {email}
            </p>
            <p>
            <a className="font-bold">Telefone: </a> {phone}
            </p>

            <button 

                className="bg-red-500 px-4 rounded text-white mt-2 self-start">Deletar</button>
        </article>

    )
}