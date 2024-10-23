import Container from "@/components/container";
import { getServerSession } from "next-auth";
import { AuthOprions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Costumer(){

    const session = await getServerSession(AuthOprions);

    if(!session || !session.user){
      redirect('/')
    }

    return(
        <Container>
            <main>
                <div>
                    <h1>Meu clientes</h1>
                </div>
            </main>
        </Container>
    )
}