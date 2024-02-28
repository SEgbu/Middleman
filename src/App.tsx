import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { Edit } from "./Edit/Edit";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" Component={Home} ></Route>
				<Route path="/edit" Component={Edit}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

