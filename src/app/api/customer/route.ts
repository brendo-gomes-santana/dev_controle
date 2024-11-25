import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import prisma from '@/lib/prisma';
import { AuthOprions } from '@/lib/auth';

export async function POST(request: Request){

    const session = getServerSession(AuthOprions)

    if(!session){
        return NextResponse.json({ error: 'not authorized' }, { status: 401 })
    }

    const data = await request.json()

    try{
        await prisma.customer.create({
            data: data
        })
    }catch(err){
        console.log(err);
        return NextResponse.json({ error: 'Failed crete new cutomer' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Rota de cadastro' })
}