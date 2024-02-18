import { useRef } from "react";
import { v4 as uuid } from "uuid";

export const QueryInput = () => {
    const inputRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLInputElement>(null);

	const handleSubmit = () => {
		if (inputRef.current){
			let data = {query: inputRef.current.value, description: descriptionRef.current?.value};

			if (data.query != "")
				sessionStorage.setItem(uuid(), JSON.stringify(data));

			inputRef.current.value = "";
			
			if (descriptionRef.current)
				descriptionRef.current.value = "";
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
			<input type="text" ref={descriptionRef} />
            <button onClick={handleClear}>Clear</button>
            <input type="submit"/>
        </form>
    )
}