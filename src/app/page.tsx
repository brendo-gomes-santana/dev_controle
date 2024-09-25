import Image from "next/image";
import heroImage from '@/assets/hero.svg';

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
      <h1 className="font-medium text-2xl mb-2">Gerencie sua empresa</h1>
      <h2 className="font-bold text-3xl mb-8 text-blue-600 md:text-4xl">Atendimento, clientes</h2>
      <Image
        src={heroImage}
        width={600}
        alt="Imagem herp dp dev controle"

        className="max-w-sm md:max-w-xl"
      />
    </main>
  );
}
