import React from "react";
import DashboardSidebarLayout from "./dashboard/components/dashboard-sidebar";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";

export default async function RootLayout({children,}: { children: React.ReactNode }) {
	const session = await getServerSession(options);
	if (!session) {
		redirect('/auth/signin')
	}
	return (
		<div>
			<DashboardSidebarLayout user={session?.user}/>
			{children}
		</div>
	);
};