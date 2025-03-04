import prismadb from "@/lib/prismadb";
import {getServerSession} from "next-auth";
import {CustomerCard} from "@/app/(dashboard)/dashboard/customers/[customerId]/components/contact-card";
import {VehicleList} from "@/app/(dashboard)/dashboard/customers/[customerId]/components/vehicle-list";
import {TrashIcon} from "@heroicons/react/24/outline";
import React from "react";

const CustomerPage = async ({params}: { params: { customerId: string; }; }) => {
	const customer = await prismadb.customer.findUnique({
		where: {
			id: params.customerId,
		},
	});

	const vehicles = await prismadb.vehicle.findMany({
		where: {
			customerId: params.customerId,
		},
	});

	return (
		<div>
			<CustomerCard data={customer}/>
			<VehicleList vehicles={vehicles}/>
		</div>
	);
};

export default CustomerPage;