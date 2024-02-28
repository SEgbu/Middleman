import { Query } from "./Query";
import { QueryInput } from "./QueryInput";

import supabase from "../../config/Supabase";
import { useEffect, useState } from "react";

export const Home = () => {
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [queries, setQueries] = useState<any[]>([]);
	
	// fetch query data
	useEffect(() => {
		const fetchFromDatabase = async () => {
			const {data, error} = await supabase
										.from("queries")
										.select()
										.order("id", {ascending: true});

			if (error){
				setErrorMessage("Couldn't fetch from queries");
				setQueries([]);
				console.log(errorMessage + ": " + error.message);
			}
			else if (data){
				setErrorMessage("");
				setQueries(data);
			}
		} 
		fetchFromDatabase();
	}, []);	

	return (
		<div>
			{errorMessage && <p>{errorMessage}</p>}
			{queries && queries.map((q) => {
				return <Query key={q.id} data={q} />
			})}
			
			<QueryInput />
		</div>
	);
}
