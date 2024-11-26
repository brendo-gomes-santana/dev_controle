'use client'
import { useContext, useRef, MouseEvent } from "react"
import { ModalContext } from "@/providers/modal"
export default function ModalTicket() {

    const { handleModalVisible } = useContext(ModalContext)
    const modalRef = useRef<HTMLDivElement | null>(null);

    function handleModalCliCk(event: MouseEvent<HTMLDivElement>){
        
        //ESTOU VERIFICANDO SE EXISTE UMA REFERÊNCIA NO MODALREDF E DEPOIS VERIFICO SE VOCÊ NÃO CLICOU DENTRO DO MODALREF
        if(modalRef.current && !modalRef.current.contains(event.target as Node)){
            handleModalVisible()
        }
    }

    return (
        <section className="absolute bg-gray-900/80 w-full min-h-screen" onClick={handleModalCliCk}>
            <article className="absolute inset-0 flex items-center justify-center">

                <div ref={modalRef} className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded">
                    <div className="flex items-center justify-between">
                        <h1 className="font-bold text-lg md:text-2xl">Detalhes do chamado</h1>
                        <button className="bg-red-500 p-1 px-2 text-white rounded" onClick={handleModalVisible}>Fechar</button>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Nome:</h2>
                        <p>Problema no pc</p>
                    </div>

                    <div className="flex flex-wrap flex-col gap-1 mb-2">
                        <h2 className="font-bold">Descrição</h2>
                        <p>text aqui da descrição</p>
                    </div>

                    <div className="w-full border-t-[1.5px] my-4">
                        <h1 className="font-bold text-lg mb-4">Detalhe do cliente</h1>

                        <div className="flex flex-wrap gap-1 mb-2">
                            <h2 className="font-bold">Nome:</h2>
                            <p>Mercadinho</p>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                            <h2 className="font-bold">Telefone:</h2>
                            <p>00000000000</p>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                            <h2 className="font-bold">Email:</h2>
                            <p>test@gmail.com</p>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                            <h2 className="font-bold">Endereço:</h2>
                            <p>Rua Teste</p>
                        </div>

                    </div>
                </div>
            </article>
        </section>
    )
}