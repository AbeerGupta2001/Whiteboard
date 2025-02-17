/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "convex/react";
import {  useState } from "react";



export const useMutionHook = (mutationFunction:any) =>{
   const [isLoading, setIsLoading] = useState(false);
   const apiMutation = useMutation(mutationFunction);
   const mutate = (payload:any) => {
    setIsLoading(true);
    return apiMutation(payload).finally(() => setIsLoading(false)).then((result)=> {return result}).catch((error)=> {throw error})
   }


   return { mutate, isLoading }
}