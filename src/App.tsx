import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import Error from "./pages/Error";
import Home from "./pages/Home";
import Join from "./pages/Join";
import InvestorRegistration from "./pages/InvestorRegistration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import Projects from "./pages/Projects";

// components
import NavBarController from "./components/NavBarController";

function App() {
	return (
		<Router>
			<NavBarController />

			<div className="addPadding60">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/join" element={<Join />} />
					<Route path="/login" element={<Login />} />
					<Route path="/marketplace" element={<Marketplace />} />
					<Route
						path="/projects/:projectName/:projectId"
						element={<Projects />}
					/>
					<Route
						path="/users/registration/investor"
						element={<InvestorRegistration />}
					/>
					<Route path="/dashboard" element={<Dashboard />} />
					{/* all paths that are not found */}
					<Route path="*" element={<Error />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
