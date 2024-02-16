import { Query } from "./Query";
import { QueryInput } from "./QueryInput";
import { v4 as isUuid } from "is-uuid";

export const App = () => {
    return ( 
		<div>
			{Object.keys(sessionStorage).map((id) => {
				return (
					<>
						{isUuid(id) ? <Query key={id} id={id} content={sessionStorage.getItem(id) as string}/> : null}
					</>
				)
			})}
			

			<QueryInput/>
		</div>
	);
}

export default App;
