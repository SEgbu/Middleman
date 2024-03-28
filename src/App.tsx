import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { Edit } from "./Edit/Edit";
import { SignIn } from "./SignIn/SignIn";
import { myQueries } from "./myQueries/myQueries";

const App = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" Component={Home} ></Route>
				<Route path="/edit" Component={Edit}></Route>
				<Route path="/signin" Component={SignIn}></Route>
				<Route path="/myqueries" Component={myQueries}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

