import Container from '@/components/container';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { AuthOprions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
export default async function NewTicket() {

    const session = await getServerSession(AuthOprions)

    if (!session || !session.user) {
        redirect('/')
    }

    const ListCostumer = await prisma.customer.findMany({
        where: {
            userId: session.user.id
        }
    })

    return (
        <Container>
            <main className='mt-9 mb-2'>
                <div className='flex items-center gap-3'>
                    <Link href="/dashboard" className='text-white px-4 py-1 rounded bg-gray-900'>Voltar</Link>
                    <h1 className='text-3xl font-bold'>Novo Chamados</h1>
                </div>
                <form className='flex flex-col mt-6'>
                    <label className='mb-1 font-medium text-lg'>Nome do Chamado</label>
                    <input
                        className='w-full border-2 rounded-md px-2 mb-2 h-11'
                        type="text"
                        placeholder='Digite o nome do chamado' required />
                    <label className='mb-1 font-medium text-lg'>Descreva o problema</label>
                    <textarea
                        className='w-full border-2 rounded-md px-2 mb-2 h-24 resize-none'
                        placeholder='Descreva o problema...' required></textarea>
                    {ListCostumer.length !== 0 && (
                        <>
                            <label className='mb-1 font-medium text-lg'>Selecione o cliente</label>
                            <select className='w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white'>
                                {ListCostumer.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </>
                    )}

                    <button 
                    type='submit'
                    className='bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed'
                    disabled={ListCostumer.length === 0}>Cadastrar</button>

                </form>
            </main>
        </Container>
    )
}