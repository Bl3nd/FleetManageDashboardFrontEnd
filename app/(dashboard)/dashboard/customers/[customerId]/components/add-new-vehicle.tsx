"use client";

import React from "react";
import {useParams, useRouter} from "next/navigation";

export const AddNewVehicle = () => {
	const router = useRouter();
	const {customerId} = useParams();
	return (
		<button
			type='button'
			className='block rounded-md bg-blue-300 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
			onClick={() => router.push(`${customerId}/new`)}
		>
			Add Vehicle
		</button>
	)
};