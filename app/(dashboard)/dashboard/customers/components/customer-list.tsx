"use client";

import React, {useLayoutEffect, useRef, useState} from "react";
import {Customer} from "@prisma/client";
import AddNewButton from "./add-new-button";

export default function CustomerList({data}: { data: Customer[] | [] }) {
	return (
		<>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-base font-semibold leading-6 text-blue-700'>Customers</h1>
					<p className='mt-2 text-sm text-blue-500'>
						A list of all the companies in your account including their name, contact #, asset count, and
						added date.
					</p>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<AddNewButton/>
				</div>
			</div>
			<div className='mt-8 flow-root'>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<div className='relative'>
							<div
								className='overflow-hidden shadow ring-1 ring-neutral-950 ring-opacity-5 sm:rounded-lg'
							>
								<table className='min-w-full divide-y divide-neutral-300'>
									<thead className='bg-neutral-50'>
									<tr>
										<th
											scope='col'
											className='min-w-[12rem] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-blue-500 sm:pl-6'
										>
											Company Name
										</th>
										<th
											scope='col'
											className='hidden px-3 py-3.5 text-left text-sm font-semibold text-blue-500 lg:table-cell'
										>
											Contact #
										</th>
										<th
											scope='col'
											className='hidden px-3 py-3.5 text-left text-sm font-semibold text-blue-500 sm:table-cell'
										>
											Date
										</th>
										<th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
											<span className='sr-only'>Go to</span>
										</th>
									</tr>
									</thead>
									<tbody className='divide-y divide-neutral-200 bg-white'>
									{data.map((customer) => (
										<tr key={customer.name}>
											<td className='w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-blue-700 sm:w-auto sm:max-w-none sm:pl-6'>
												{customer.name}
												<dl className='font-normal lg:hidden'>
													<dt className='sr-only'>Contact #</dt>
													<dt className='mt-1 truncate text-blue-700 opacity-70'>{customer.contactNumber}</dt>
													<dt className='sr-only sm:hidden'>Date</dt>
													<dt className='mt-1 truncate text-blue-700 opacity-70 sm:hidden'>{customer.createdAt.toDateString()}</dt>
												</dl>
											</td>
											<td className='hidden px-3 py-4 text-sm text-blue-700 lg:table-cell'>{customer.contactNumber}</td>
											<td className='hidden px-3 py-4 text-sm text-blue-700 sm:table-cell'>{customer.createdAt.toDateString()}</td>
											<td className='py-4 pl-3 pr-4 text-sm font-medium sm:pr-0'>
												<a
													className='text-blue-300 hover:text-blue-100 truncate'
													href={`/dashboard/customers/${customer.id}`}
												>
													Go to<span className='sr-only'>, {customer.name}</span>
												</a>
											</td>
										</tr>
									))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
};