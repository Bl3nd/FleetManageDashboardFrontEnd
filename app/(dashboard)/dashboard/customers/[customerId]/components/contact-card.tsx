import {Customer} from "@prisma/client";
import React from "react";
import {EnvelopeIcon, PhoneIcon, TrashIcon} from "@heroicons/react/24/outline";

interface CustomerProps {
	data: Customer | null;
}

export const CustomerCard: React.FC<CustomerProps> = ({data}) => {
	return (
		<div className='grid grid-cols-3'>
			<div
				className='col-span-1 flex flex-col divide-y divide-neutral-300 rounded-lg bg-white text-center shadow'
			>
				<div className='flex flex-1 flex-col p-2'>
					<h2 className='text-base font-semibold text-blue-700'>{data?.name}</h2>
					<h3 className='mt-1 text-sm font-medium text-blue-400'>{data?.updatedAt.toDateString()}</h3>
				</div>
				<div>
					<div className='-mt-px flex divide-x divide-neutral-300'>
						<div className='flex w-0 flex-1'>
							<a
								href={`tel:${data?.contactNumber}`}
								className='relative gap-x-3 -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-blue-300'
							>
								<PhoneIcon className='h-5 w-5 text-blue-300' aria-hidden='true'/>
								Call
							</a>
						</div>
						<div className='-ml-px flex w-0 flex-1'>
							<a
								href={`mailto:${data?.email}`}
								className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-blue-300'
							>
								<EnvelopeIcon className='h-5 w-5 text-blue-300' aria-hidden='true'/>
								Email
							</a>
						</div>
						<div className='-ml-px flex w-0 flex-1'>
							<button
								type='button'
								className='inline-flex relative w-0 flex-1 items-center justify-center gap-x-1.5 rounded-md bg-red px-3 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md'
							>
								<TrashIcon className='h-5 w-5' aria-hidden='true'/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};