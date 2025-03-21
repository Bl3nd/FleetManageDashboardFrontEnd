import './globals.css'
import {Inter} from 'next/font/google'
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata = {
	title: "Fleet Manage",
	description: "Manage your fleet",
};
export default async function RootLayout({children,}: { children: React.ReactNode }) {
	return (
		<html lang="en" className='h-full'>
		<body className={`${inter.className} h-full`}>
		{children}
		</body>
		</html>
	);
};
