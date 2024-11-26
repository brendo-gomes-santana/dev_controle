import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type"
import { FiTrash2, FiFile } from "react-icons/fi"

interface TicketItemProps {
    ticket:  TicketProps;
    customer?: CustomerProps
}


export default function TicketItem({ ticket, customer }: TicketItemProps) {
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
                        <FiTrash2 size={24} color="#ef4444" />
                    </button>
                    <button>
                        <FiFile size={24} color="#3b82f6" />
                    </button>
                </td>
            </tr>
        </>
    )
}