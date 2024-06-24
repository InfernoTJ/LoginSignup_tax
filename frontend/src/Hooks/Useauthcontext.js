import { useContext } from "react";
import { Authcontext } from "../Context/Authcontext";

export const useAuthContext =()=>
{
    const context = useContext(Authcontext)

    if(!context)
        {
            throw Error('UseWorkoutContext must be used inside a AuthContextProvider')
        }

return context

}