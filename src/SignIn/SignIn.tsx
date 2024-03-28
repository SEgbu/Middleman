import supabase from "../../config/Supabase"


export const SignIn = () => {

    const signInWithGoogle = async () => {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: "google",
        })
        
        if (error){
            console.log(error);
        }
        else if (data) {
            console.log(data); 
        }
    }


    return (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
    )
}