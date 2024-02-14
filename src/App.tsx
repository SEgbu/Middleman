import { Query } from "./Query";
import { QueryInput } from "./QueryInput";

export const App = () => {
    return ( 
		<div>
			{Object.keys(sessionStorage).map((id) => {
				return (
					<Query key={id} id={id} content={sessionStorage.getItem(id) as string}/>
				)
			})}
			

			<QueryInput/>
		</div>
	);
}

export default App;
