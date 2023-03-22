import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import Error from "./pages/Error";
import Home from "./pages/Home";
import Join from "./pages/Join";
import InvestorRegistration from "./pages/InvestorRegistration";
import Login from "./pages/Login";

// components
import NavBar from "./components/NavBar";

function App() {
	return (
		<Router>
			<NavBar />
			<div className="addPadding60">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/join" element={<Join />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/users/registration/investor"
						element={<InvestorRegistration />}
					/>
					{/* all paths that are not found */}
					<Route path="*" element={<Error />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
