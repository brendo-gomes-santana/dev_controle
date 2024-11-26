'use client'

import { FiCheckSquare, FiFile } from "react-icons/fi"
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type"
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface TicketItemProps {
    ticket:  TicketProps;
    customer?: CustomerProps
}

export default function TicketItem({ ticket, customer }: TicketItemProps) {

    const router = useRouter()

    async function handleChangeStatus(){
        try{

            const r = await api.patch('/api/ticket', { id: ticket.id })
            router.refresh();
        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-50 hover:bg-gra-200 duration-200">
                <td className="text-left">{customer?.name}</td>
                <td className="text-left">{ticket.created_at?.toLocaleDateString('pt-br')}</td>
                <td className="text-left">
                    <span className="bg-green-500 px-2 py-1 rounded">{ticket.status}</span>
                </td>
                <td className="text-left">
                    <button>
                        <FiCheckSquare size={24} color="#131313" onClick={handleChangeStatus}/>
                    </button>
                    <button>
                        <FiFile size={24} color="#3b82f6" />
                    </button>
                </td>
            </tr>
        </>
    )
}