import { createContext, useContext } from "react";

const TestContex=createContext();

export default function TestProvider({children}){

    return(
        <TestContex.Provider >
            {children}
        </TestContex.Provider>
    );
}

export function useTestContext(){
    let context=useContext(TestContex);
    if(!context){
        throw new Error("useTestContext must be used within TestProvider");
    }
    return context;
}