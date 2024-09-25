import { ReactNode } from "react"

interface Tipagem {
  children: ReactNode
}

export default function Container({children}: Tipagem){
  return(
    <div className="w-full max-w-7xl mx-auto px-2">
      {children}
    </div>
  )
}