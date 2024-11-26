"use client"

import { createContext, ReactNode, useState } from "react"
import { TicketProps } from "@/utils/ticket.type"
import { CustomerProps } from "@/utils/customer.type"
import ModalTicket from "@/components/modal";

interface ModalContextData {
    visible: boolean;
    handleModalVisible: () => void;
    ticket: TicketInfor | undefined
}

interface TicketInfor {
    ticket: TicketProps;
    customer: CustomerProps | null
}

export const ModalContext = createContext({} as ModalContextData);

export default function ModalProvider({ children }: { children: ReactNode }){

    const [visible, setVisible] = useState<boolean>(false);
    const [ticket, setTicket] = useState<TicketInfor>();

    function handleModalVisible(){
        setVisible(!visible)
    }

    return(
        <ModalContext.Provider
            value={{
                visible,
                handleModalVisible,
                ticket
            }}
        >
            {visible && ( <ModalTicket/> )}
            {children}
        </ModalContext.Provider>
    )
}