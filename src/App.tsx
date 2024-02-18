import { Query } from "./Query";
import { QueryInput } from "./QueryInput";
import { v4 as isUuid } from "is-uuid";

export const App = () => {
	return (
		<div>
			{Object.keys(sessionStorage).map((id) => {
				return (
					<div key={id}>
						{isUuid(id) ? <Query id={id} data={sessionStorage.getItem(id) as string} /> : null}
					</div>
				)
			})}


			<QueryInput />
		</div>
	);
}

export default App;
