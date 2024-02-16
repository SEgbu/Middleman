import { useRef } from "react";
import { v4 as uuid } from "uuid";

export const QueryInput = () => {
    const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = () => {
		if (inputRef.current){
			let value = inputRef.current.value;

			if (value != "")
				sessionStorage.setItem(uuid(), value);

			inputRef.current.value = "";
		}
		else 
			alert("error");
	}

	const handleClear = () => {
		sessionStorage.clear();
	}

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={inputRef}/>
            <button onClick={handleClear}>Clear</button>
            <input type="submit"/>
        </form>
    )
}