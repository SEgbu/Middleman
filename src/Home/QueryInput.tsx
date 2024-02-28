import { useRef } from "react";
import { useState } from "react";
import supabase from "../../config/Supabase";

export const QueryInput = () => {
    const queryRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLInputElement>(null);

	const [formError, setFormError] = useState<string>("");

	const handleSubmit = async () => {	
		event?.preventDefault();
		if (queryRef.current && descriptionRef.current){

			let query = queryRef.current.value;
			let description = descriptionRef.current.value;

			
			if (queryRef.current.value != ""){
				const {error} = await supabase
											.from("queries")
											.insert([{query, description}]);
											
				if (error) {
					console.log(error.message);
				}

				queryRef.current.value = "";
				descriptionRef.current.value = "";

				setFormError("");

				window.location.reload();
			}
			else {
				setFormError("Please fill out query");
			}
		}
	}


    return (
        <form onSubmit={handleSubmit}>
			<p style={{color: "red"}}>{formError}</p>
			<label htmlFor="query">Query: </label>
            <input type="text" id="query" ref={queryRef}/>
			<br />
			<label htmlFor="description">Description: </label>
			<input type="text" id="description" ref={descriptionRef} />
			<br />
            <input type="submit"/>
        </form>
    )
}