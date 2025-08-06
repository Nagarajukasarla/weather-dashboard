import React from "react";
import Header from "../layouts/Header";
import Content from "../layouts/Content";
import "../../assets/appLayout.css";

const AppLayout: React.FC = () => {
	return (
		<div className="dashboard-wrapper">
			<div className="dashboard-header">
				<Header />
			</div>
			<div className="dashboard-content">
				<Content />
			</div>
		</div>
	);
};

export default AppLayout;
