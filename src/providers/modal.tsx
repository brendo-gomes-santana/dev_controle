"use client"

import { createContext, ReactNode, useState } from "react"
import { TicketProps } from "@/utils/ticket.type"
import { CustomerProps } from "@/utils/customer.type"
import ModalTicket from "@/components/modal";

interface ModalContextData {
    visible: boolean;
    handleModalVisible: () => void;
    setDetailTicket: (detail: TicketInfor) => void;
    ticket: TicketInfor | undefined
}

interface TicketInfor {
    ticket: TicketProps;
    customer?: CustomerProps | null
}

export const ModalContext = createContext({} as ModalContextData);

export default function ModalProvider({ children }: { children: ReactNode }){

    const [visible, setVisible] = useState<boolean>(false);
    const [ticket, setTicket] = useState<TicketInfor>();

    function handleModalVisible(){
        setVisible(!visible)
    }


    function setDetailTicket(detail: TicketInfor){
        setTicket(detail)
    }
    return(
        <ModalContext.Provider
            value={{
                visible,
                ticket,
                handleModalVisible,
                setDetailTicket
            }}
        >
            {visible && ( <ModalTicket/> )}
            {children}
        </ModalContext.Provider>
    )
}