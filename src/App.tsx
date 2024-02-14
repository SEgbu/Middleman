import { useRef } from "react";
import { v4 as uuid} from "uuid";
import { Query } from "./Query";

export const App = () => {
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
		<div>
			{Object.keys(sessionStorage).map((id) => {
				return (
					<Query key={id} id={id} content={sessionStorage.getItem(id) as string}/>
				)
			})}

			<form onSubmit={handleSubmit}>
				<input type="text" ref={inputRef}/>
				<button onClick={handleClear}>Clear</button>
				<input type="submit"/>
			</form>
		</div>
	);
}

export default App;
