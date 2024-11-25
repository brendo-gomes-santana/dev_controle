import Container from "@/components/container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { AuthOprions } from "@/lib/auth";
import TicketItem from "./components/ticket";
export default async function Dashboard() {

  const session = await getServerSession(AuthOprions);

  if (!session || !session.user) {
    redirect('/')
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <section className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link href="/dashboard/new" className="bg-blue-500 px-4 py-1 rounded text-white">Abrir chamado</Link>
        </section>

        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font-medium text-left pl-1">CLIENTE</th>
              <th className="font-medium text-left pl-1">DATA CADASTRO</th>
              <th className="font-medium text-left pl-1">STATUS</th>
              <th className="font-medium text-left pl-1">#</th>
            </tr>
          </thead>
          <tbody>
            <TicketItem />
          </tbody>
        </table>

      </main>
    </Container>
  )
}