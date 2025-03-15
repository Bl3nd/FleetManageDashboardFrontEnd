import '../globals.css'
import React from "react";
import Footer from "@/app/(root)/components/footer";
import HomeHeader from "@/app/(root)/components/header";

export default async function RootLayout({
	                                         children,
                                         }: {
	children: React.ReactNode
}) {
	return (
		<div className='bg-white'>
			<HomeHeader/>
			{children}
			<Footer/>
		</div>
	);
};
