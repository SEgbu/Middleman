import { useNavigate } from "react-router-dom";
import supabase from "../../config/Supabase"

export const SignOut = () => {
    const navigate = useNavigate();

    const signOut = async () => {
        const {error} = await supabase.auth.signOut();
        

        if (error){
            console.log(error);
        }
        else {
            navigate("/signin");
        }
        
    }

    return (
        <button onClick={signOut}>Sign Out</button>
    )
}