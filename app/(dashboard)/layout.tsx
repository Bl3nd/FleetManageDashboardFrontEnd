import React from "react";
import DashboardSidebarLayout from "./dashboard/components/dashboard-sidebar";

export default async function RootLayout({children,}: { children: React.ReactNode }) {
	return (
		<div>
			<DashboardSidebarLayout/>
			{children}
		</div>
	);
};