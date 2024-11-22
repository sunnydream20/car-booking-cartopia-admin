import { Provider } from "react-redux";
import store from './store/store';
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Car from "./components/Main/cars";
import Signup from "./components/Singup";
import Login from "./components/Login";
import HomeSlider from "./components/Main/homeSlider";
import HomeBanner from "./components/Main/homeBanner";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Provider store={store}>
			<Routes>
				{user && <Route path="/" exact element={<Main />} />}
				{user && <Route path="/cars" exact element={<Car />} />}
				{user && <Route path="/homesliders" exact element={<HomeSlider />} />}
				{user && <Route path="/homebanners" exact element={<HomeBanner />} />}
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/" element={<Navigate replace to="/login" />} />
				<Route path="/cars" element={<Navigate replace to="/login" />} />
				<Route path="/homesliders" element={<Navigate replace to="/login" />} />
				<Route path="/homebanners" element={<Navigate replace to="/login" />} />
			</Routes>
		</Provider>
	);
}

export default App;
