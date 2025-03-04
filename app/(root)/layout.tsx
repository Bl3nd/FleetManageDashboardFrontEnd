import '../globals.css'
import React from "react";
import Footer from "@/app/(root)/components/footer";
import HomeHeader from "@/app/(root)/components/header";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

export default async function RootLayout({
	                                         children,
                                         }: {
	children: React.ReactNode
}) {
	const session = await getServerSession(options);
	return (
		<div className='bg-white'>
			<HomeHeader user={session?.user}/>
			{children}
			<Footer/>
		</div>
	);
};
