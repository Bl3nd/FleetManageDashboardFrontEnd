import './globals.css'
import {Inter} from 'next/font/google'
import React from "react";
import AuthProvider from "@/app/context/AuthProvider";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

const inter = Inter({subsets: ['latin']})

export const metadata = {
	title: "Fleet Manage",
	description: "Manage your fleet",
};
export default async function RootLayout({children,}: { children: React.ReactNode }) {
	const session = await getServerSession(options);
	return (
		<html lang="en" className='h-full'>
		<body className={`${inter.className} h-full`}>
		<AuthProvider session={session}>
			{children}
		</AuthProvider>
		</body>
		</html>
	);
};
