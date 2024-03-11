import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect, FormEvent } from "react"
import supabase from "../../config/Supabase";

export const Edit = () => {
    let { state } = useLocation();
    const id = state.id;

    const [updateQueryError, setUpdateQueryError] = useState<string>("");

    const [queryInput, setQueryInput] = useState<string>("");
    const [descriptionInput, setDescriptionInput] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchQueryRecord = async () => {
            const {data, error} = await supabase
                                        .from("queries")
                                        .select()
                                        .eq("id", id)
                                        .single()

            if (error){
                console.log("Can't retrieve single record: " + error.message);

                setQueryInput("");
                setDescriptionInput("");
            }
            else if (data){
                setQueryInput(data.query);
                setDescriptionInput(data.description);
            }
        }   
        fetchQueryRecord();
    }, [])

    const handleSubmit = async (event : FormEvent) => {
        event?.preventDefault();

        const {error} = await supabase
                                .from("queries")
                                .update({query: queryInput, description: descriptionInput})
                                .eq("id", id);

        if (error){
            setUpdateQueryError("Couldn't update string");
            console.log(updateQueryError + ": " + error.message)
        }
        else {
            setUpdateQueryError("");
            console.log("navigating to home")
            navigate("/");
        }   
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p style={{color: "red"}}>{updateQueryError}</p>
                <label htmlFor="query">Query: </label>
                <input type="text" id="query" value={queryInput} onChange={(event) => setQueryInput(event?.target.value)}/>
                <br />
                <label htmlFor="description">Description: </label>
                <input type="text" id="description" value={descriptionInput} onChange={(event) => setDescriptionInput(event?.target.value)}/>
                <br />
                <input type="submit" />
                <Link to="/"><button>Cancel</button></Link>
            </form>
        </>
    )
}