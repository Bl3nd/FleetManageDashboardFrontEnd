import {getServerSession} from "next-auth";
import prismadb from "@/lib/prismadb";
import React from "react";
import CustomerList from "@/app/(dashboard)/dashboard/customers/components/customer-list";

export default async function CustomerPage() {
	const session = await getServerSession();
	const user = await prismadb.user.findFirst({
		where: {
			email: session?.user?.email,
		},
	});

	const customers = await prismadb.customer.findMany({
		where: {
			userId: user?.id,
		},
	});

	return (
		<CustomerList data={customers}/>
	)
};