import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOprions } from "@/lib/auth";
import prisma from "@/lib/prisma";



// ATUALIZAR O TICKET PARA CONCLUIDO
export async function PATCH(req: Request){
    const session = await getServerSession(AuthOprions);
    if(!session || !session.user){
        return NextResponse.json({ error: "Not authorized" }, { status:  401 })
    }

    const { id } = await req.json();

    const findTicket = await prisma.ticket.findUnique({
        where: {
            id,
            status: "ABERTO"
        }
    })

    if(!findTicket){
        return NextResponse.json({ error: "Ticket not found" }, { status: 400 })
    }

    try{

        await prisma.ticket.update({
            where: {
                id
            },
            data: {
                status: 'FECHADO'
            }
        })

        return NextResponse.json({ message: 'ticket updated successfully' })

    }catch(err){
        console.log(err);
        return NextResponse.json({ error: "Filed updtade ticket" }, { status: 400 })
    }
}

// CADASTRAR UM TICKET
export async function POST(req: Request){
    const { customerId, name, description } = await req.json()

        if(!customerId || !name || !description){
            return NextResponse.json({ error: "Failed create new ticket" }, { status: 400 })
        }

    try{

        await prisma.ticket.create({
            data: {
                name,
                description,
                status: 'ABERTO',
                customerId
            }
        })

        return NextResponse.json({ message: "Ticket create sucess" })

    }catch(err){
        console.log(err)
        return NextResponse.json({ error: "Failed create new ticket" },{ status: 400 })
    }

}