import { useEffect, useState } from "react";
import supabase from "../../config/Supabase";
import { QueryWindow } from "./QueryWindow";

export interface queryDataType {
	query?: string; 
	description?: string;
	maxPeople?: number; 
	reward?: number;
};

// BUG: Submitting the description from a text area doesn't keep its format when viewing query description

export const QueryInput = () => {
	const [queryData, setQueryData] = useState<queryDataType>({});

	const [formError, setFormError] = useState<string>("");

	const [isQueryWindowOpen, setQueryWindowOpen] = useState<boolean>(false);

	useEffect(() => {
		if (queryData.reward == null || queryData.reward === undefined) {
			setQueryData(qd => ({...qd, reward: 5}));
		}
	}, [])

	const handleSubmit = async () => {
		event?.preventDefault();

		if (queryData.query != ("" || null) ) {
			const { error } = await supabase
				.from("queries")
				.insert([{ query: queryData.query , description: queryData.description, maxPeople: queryData.maxPeople, reward: queryData.reward }]);

			if (error) {
				console.log(error.message);
			}

			setFormError("");
			setQueryData({});

			window.location.reload();

		}
		else {
			setFormError("Please fill out query");
		}
		
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<p>Quick Queries: </p>
				<p style={{ color: "red" }}>{formError}</p>
				<label htmlFor="query">Query: </label>
				<input type="text" id="query" onChange={(e) => setQueryData(qd => ({...qd, query: e.target.value}))} />
				<br />
				<input type="submit" />
			</form>
			<div>
				<p>Full Queries: </p>
				<button onClick={() => { setQueryWindowOpen(!isQueryWindowOpen) }}>Open</button>
				{isQueryWindowOpen && <QueryWindow setQueryData={setQueryData} handleSubmit={handleSubmit}/>}
			</div>
		</div>
	)
}