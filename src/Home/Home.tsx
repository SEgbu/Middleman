import { Query } from "./Query";
import { QueryInput } from "./QueryInput";

import supabase from "../../config/Supabase";
import { useEffect, useState } from "react";
import { SignOut } from "../components/SignOut";
import { User } from "@supabase/supabase-js";

export const Home = () => {
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [queries, setQueries] = useState<any[]>([]);
	const [user, setUser] = useState<User | null>(null);

	// fetch query data
	useEffect(() => {
		const fetchFromDatabase = async () => {
			const { data, error } = await supabase
			.from("queries")
			.select()
			.order("created_at", { ascending: true });
			
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
		
		fetchFromDatabase();
	}, []);

	useEffect(() => {
		console.log(user);
	}, [user]);
	
	// checking for signing in and out
	supabase.auth.onAuthStateChange( async (event) => {
		if(event != "SIGNED_OUT"){
			if (!user){
				const getUserData = async () => {
					await supabase.auth.getUser().then(value => {
						if (value.data?.user){
							setUser(value.data.user);
						}
					})
				} 
				getUserData();
		}
		}
		else {
			setUser(null);
		}
	})

	// handling deletion of query before refresh
	const handleRemove = (id: number) => {
		setQueries(currentQueries => {
			return currentQueries.filter(q => q.id !== id);
		})
	}

	return (
		<div>
			{
				<>
					{errorMessage && <p>{errorMessage}</p>}
					{queries && queries.map((q) => {
						return <Query key={q.id} data={q} onRemove={handleRemove} userId={user?.id}/>
					})}

					<QueryInput userId={user?.id}/>
					<SignOut />
				</>
			}
		</div>
	);
}
