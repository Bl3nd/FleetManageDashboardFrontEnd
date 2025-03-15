import React from "react";
import CustomerList from "@/app/(dashboard)/dashboard/customers/components/customer-list";

const customerData = [
	{
		id: "1",
		name: "John Doe Company",
		contactNumber: "333-333-3333",
		email: "john@example.com",
		createdAt: "2021-03-03T00:00:00.000Z",
		updatedAt: "2021-03-03T00:00:00.000Z",
	},
	{
		id: "2",
		name: "Ill Company",
		contactNumber: "111-222-3333",
		email: "john@example.com",
		createdAt: "2019-02-03T00:00:00.000Z",
		updatedAt: "2021-07-03T00:00:00.000Z",
	}
];

export default async function CustomerPage() {
	return (
		<CustomerList data={customerData}/>
	)
};