import { useRef } from "react";
import { useState } from "react";
import supabase from "../config/Supabase";

export const QueryInput = () => {
    const queryRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLInputElement>(null);

	const [formError, setFormError] = useState<string>("");

	const handleSubmit = async () => {		
		if (queryRef.current && descriptionRef.current){

			let query = queryRef.current.value;
			let description = descriptionRef.current.value;

			const {error} = await supabase
										.from("queries")
										.insert([{query, description}]);

			if (queryRef.current.value != ""){
				queryRef.current.value = "";
				setFormError("");
				descriptionRef.current.value = "";
			}
			else {
				if (error) {
					console.log(error);
				}
				setFormError("Please fill out query");
			}
		}
		else 
			alert("error");
	}


    return (
        <form onSubmit={handleSubmit}>
			<p>{formError}</p>
            <input type="text" ref={queryRef}/>
			<input type="text" ref={descriptionRef} />
            <input type="submit"/>
        </form>
    )
}