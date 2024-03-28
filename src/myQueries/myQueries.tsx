import { useEffect, useState } from "react";
import supabase from "../../config/Supabase";
import { User } from "@supabase/supabase-js";
import { Query } from "../Home/Query";
import { useNavigate } from "react-router-dom";

export const myQueries = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [queries, setQueries] = useState<any[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    // fetch query data
    useEffect(() => {
        if (!user) {
            const getUserData = async () => {
                await supabase.auth.getUser().then(value => {
                    if (value.data?.user) {
                        setUser(value.data.user);
                    }
                })
            }
            getUserData();
        }

    } ,[]);

    useEffect(() => {
        const fetchFromDatabase = async () => {
            const { data, error } = await supabase
                .from("queries")
                .select()
                .order("created_at", { ascending: true })
                .eq("userId", user?.id);

            if (error) {
                setErrorMessage("Couldn't fetch from queries");
                setQueries([]);
                console.log(errorMessage + ": " + error.message);
            }
            else if (data) {
                setErrorMessage("");
                setQueries(data);
            }
        }

        if (user)
            fetchFromDatabase();
    }, [user]);


    const handleRemove = (id: number) => {
        setQueries(currentQueries => {
            return currentQueries.filter(q => q.id !== id);
        })
    }

    return (
        <>
            {queries.map((q) => {
                return <Query key={q.id} data={q} onRemove={handleRemove} userId={user?.id} />
            })}
            <button onClick={() => navigate("/")}>Back</button>
        </>
    )
}