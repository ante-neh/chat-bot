"use client"
import { FC, ReactNode } from "react" 
import { Provider } from "react-redux" 
import { store } from "./store" 


interface ProvidersProps {
    children: ReactNode;
  }

export const Providers:FC<ProvidersProps> = ({children})=>{
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}