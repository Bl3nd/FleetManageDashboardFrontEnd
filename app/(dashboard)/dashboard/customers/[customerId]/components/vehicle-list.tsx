import {Vehicle, WorkOrder} from "@prisma/client";
import React, {useLayoutEffect, useRef, useState} from "react";
import Link from "next/link";
import {AddNewVehicle} from "@/app/(dashboard)/dashboard/customers/[customerId]/components/add-new-vehicle";
import {TrashIcon} from "@heroicons/react/24/outline";

interface VehicleProps {
	vehicles: Vehicle[] | undefined | null;
}

export const VehicleList: React.FC<VehicleProps> = ({vehicles}) => {
	return (
		<div className='mt-12 px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-blue-700'>Vehicles</h1>
					<p className='mt-2 text-sm text-blue-500'>
						A list of the vehicles under the customers account.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<AddNewVehicle/>
				</div>
			</div>
			<div className='mt-8 flow-root'>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<table className='min-w-full divide-y divide-neutral-300'>
							<thead>
							<tr>
								<th
									scope='col'
									className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-blue-700 sm:pl-0'
								>
									Plate Number
								</th>
								<th
									scope='col'
									className='px-3 py-3.5 text-left text-sm font-semibold text-blue-700'
								>
									VIN Number
								</th>
								<th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
									<span className='sr-only'>Go to</span>
								</th>
							</tr>
							</thead>
							<tbody className='divide-y divide-neutral-300 bg-white'>
							{vehicles?.map((vehicle) => (
								<tr key={vehicle.id}>
									<td className='whitespace-nowrap px-3 py-5 text-sm text-blue-700'>
										{vehicle.plateNumber}
									</td>
									<td className='whitespace-nowrap px-3 py-5 text-sm text-blue-700'>
										{vehicle.vinNumber}
									</td>
									<td className='relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
										<Link href='#' className='text-blue-300 hover:text-blue-100 truncate'>
											Go to<span className='sr-only'>, {vehicle.plateNumber}</span>
										</Link>
									</td>
								</tr>
							))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}