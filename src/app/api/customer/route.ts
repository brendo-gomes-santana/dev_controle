import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import prisma from '@/lib/prisma';
import { AuthOprions } from '@/lib/auth';

//ROTA PARA CADASTRAR CLIENTE
export async function POST(request: Request) {

    const session = getServerSession(AuthOprions)

    if (!session) {
        return NextResponse.json({ error: 'not authorized' }, { status: 401 })
    }

    const data = await request.json()

    try {
        await prisma.customer.create({
            data: data
        })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'Failed crete new cutomer' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Rota de cadastro' })
}

export async function DELETE(req: Request) {

    const session = getServerSession(AuthOprions)

    if (!session) {
        return NextResponse.json({ error: 'not authorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    try {
        await prisma.customer.delete({
            where: {
                id: userId as string
            }
        })

        return NextResponse.json({ ok: true });
        
    } catch (err) {
        return NextResponse.json({ error: 'Failed delete cutomer' }, { status: 400 })
    }
}