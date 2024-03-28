import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect, FormEvent } from "react"
import supabase from "../../config/Supabase";
import { queryDataType } from "../Home/QueryInput";

export const Edit = () => {


    let { state } = useLocation();
    const { id } = state;

    const [updateQueryError, setUpdateQueryError] = useState<string>("");
    const [newQueryData, setNewQueryData] = useState<queryDataType>({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQueryRecord = async () => {
            const { data, error } = await supabase
                .from("queries")
                .select()
                .eq("id", id)
                .single()

            if (error) {
                console.log("Can't retrieve single record: " + error.message);

                setNewQueryData({})
            }
            else if (data) {
                setNewQueryData({ query: data.query, description: data.description, maxPeople: data.maxPeople, reward: data.reward })
            }
        }
        fetchQueryRecord();
    }, []);

    const handleSubmit = async (event: FormEvent) => {
        event?.preventDefault();

        const { error } = await supabase
            .from("queries")
            .update({ query: newQueryData.query, description: newQueryData.description, maxPeople: newQueryData.maxPeople, reward: newQueryData.reward })
            .eq("id", id);

        if (error) {
            setUpdateQueryError("Couldn't update string");
            console.log(updateQueryError + ": " + error.message)
        }
        else {
            setUpdateQueryError("");
            navigate("/myqueries")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p style={{ color: "red" }}>{updateQueryError}</p>
                <label htmlFor="query">Query: </label>
                <input type="text" id="query" value={(newQueryData.query == null) ? "" : newQueryData.query} onChange={(event) => setNewQueryData(qd => ({ ...qd, query: event.target.value }))} />
                <br />
                <label htmlFor="description">Description: </label>
                <textarea id="description" value={(newQueryData.description == null) ? "" : newQueryData.description} onChange={(event) => setNewQueryData(qd => ({ ...qd, description: event.target.value }))} />
                <br />
                <label htmlFor="maxPeople">Max People: </label>
                <input type="number" id="maxPeople" value={(newQueryData.maxPeople == null) ? 0 : newQueryData.maxPeople} onChange={(event) => setNewQueryData(qd => ({ ...qd, maxPeople: (Number(event.target.value) < 0) ? 0 : Number(event.target.value) }))} />
                <br />
                <label htmlFor="reward">Reward: </label>
                <input type="number" id="reward" value={(newQueryData.reward == null) ? "" : newQueryData.reward} onChange={(event) => setNewQueryData(qd => ({ ...qd, reward: (Number(event.target.value) < 0) ? 0 : Number(event.target.value) }))} />
                <br />
                <input type="submit" />
                <Link to="/"><button>Go Back Home</button></Link>
                <Link to="/myqueries"><button>Go to My Queries</button></Link>

            </form>
        </>
    )
}