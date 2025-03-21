import {getServerSession} from "next-auth";
import Image from "next/image";
import React from "react";

import prismadb from "@/lib/prismadb";
import AddNewButton from "./new-button";
import {EnvelopeIcon, PhoneIcon} from "@heroicons/react/24/outline";

const team = [
	{
		id: "1",
		name: "Ab Sven",
		position: "Supervisor",
		role: "Admin",
		contactNumber: "888-888-8888",
		email: "supervisor1@gmail.com",
	},
	{
		id: "2",
		name: "Dee Lee",
		position: "Mechanic",
		role: "Mechanic",
		contactNumber: "355-555-8888",
		email: "deeleemechanic1@gmail.com",
	},
	{
		id: "3",
		name: "Lane Parker",
		position: "Mechanic",
		role: "Mechanic",
		contactNumber: "379-555-9978",
		email: "laneparker3@gmail.com",
	}
]

/*id            String    @id @default(auto()) @map("_id") @db.ObjectId
  name          String
  position      String
  role          String
  contactNumber String?
  email         String
  image         String?
  userId        String    @db.ObjectId
  user          User      @relation(fields: [userId], references: [id])
  workOrder     WorkOrder @relation(fields: [workOrderId], references: [id])
  workOrderId   String    @db.ObjectId*/

export default async function TeamList() {
	return (
		<>
			<div>
				<div className='sm:flex sm:items-center'>
					<div className='sm:flex-auto'>
						<h1 className='text-base font-semibold leading-6 text-blue-700'>Team</h1>
						<p className='mt-2 text-sm text-blue-500'>
							A list of your team members. This list includs their company position, data role, email,
							and contact number.
						</p>
					</div>
					<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
						<AddNewButton/>
					</div>
				</div>
				<ul role='list' className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					{team.map((person) => (
						<li
							key={person.name}
							className='col-span-1 flex flex-col divide-y divide-neutral-200 rounded-lg bg-white text-center shadow'
						>
							<div className='flex flex-1 flex-col p-8'>
								<h3 className='mt-6 text-sm font-medium text-blue-700'>{person.name}</h3>
								<dl className='mt-1 flex flex-grow flex-col justify-between'>
									<dt className='sr-only'>Position</dt>
									<dd className='text-sm text-blue-400'>{person.position}</dd>
									<dt className='sr-only'>Role</dt>
									<dd className='mt-3'>
											<span
												className='inline-flex items-center rounded-full bg-light-blue-300 px-2 py-1 text-xs font-medium text-light-blue-600 ring-1 ring-inset ring-light-blue-500/20'
											>
												{person.role}
											</span>
									</dd>
								</dl>
							</div>
							<div>
								<div className='-mt-px flex divide-x divide-neutral-200'>
									<div className='flex w-0 flex-1'>
										<a
											href={"#"}
											className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-blue-700'
										>
											<EnvelopeIcon className='h-5 w-5 text-blue-400' aria-hidden='true'/>
											Email
										</a>
									</div>
									<div className='-ml-px flex w-0 flex-1'>
										<a
											href={"#"}
											className='relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-blue-700'
										>
											<PhoneIcon className='h-5 w-5 text-blue-400' aria-hidden='true'/>
											Call
										</a>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};
