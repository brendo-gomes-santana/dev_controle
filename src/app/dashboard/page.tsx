import Container from "@/components/container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthOprions } from "@/lib/auth";

export default async function Dashboard(){

  const session = await getServerSession(AuthOprions);

  if(!session || !session.user){
    redirect('/')
  }

  return(
    <Container>
      <h1>Página dashboard</h1>
    </Container>
  )
}