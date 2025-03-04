import React from "react";

export default async function DashboardLayout({children,}: { children: React.ReactNode }) {
	return (
		<div className='lg:pl-72'>
			<main className='py-6 rounded-md'>
				<div className='px-4 sm:px-6 lg:px-8'>
					{children}
				</div>
			</main>
		</div>
	)
}