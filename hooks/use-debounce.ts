import { useEffect,useState } from "react";

export function useDebounce<T>(value:T,delay?:number){
    const [debouncedValue,setDebouncedValue] = useState<T>(value)

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebouncedValue(value)
        },delay || 500)

        return ()=>{
            clearTimeout(handler)
        }
    },[value,delay])

    return debouncedValue
}


// hathaya linput search 

//athaya kol 0.5 s y5dem ki ybda luser moush 9a3ed yktb 3al search input 3shan y5dem ldebounce