'use client'

import { FiCheckSquare, FiFile } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type"
import api from "@/lib/api";
import { ModalContext } from "@/providers/modal";

interface TicketItemProps {
    ticket:  TicketProps;
    customer?: CustomerProps | null
}

export default function TicketItem({ ticket, customer }: TicketItemProps) {
    const { handleModalVisible, setDetailTicket } = useContext(ModalContext)
    const router = useRouter()

    async function handleChangeStatus(){
        try{

            const r = await api.patch('/api/ticket', { id: ticket.id })
            router.refresh();
        }catch(err){
            console.log(err);
        }
    }

    function handleOpenModal(){
        handleModalVisible()
        setDetailTicket({
            customer,
            ticket
        })
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
                    <button onClick={handleOpenModal}>
                        <FiFile size={24} color="#3b82f6" />
                    </button>
                </td>
            </tr>
        </>
    )
}