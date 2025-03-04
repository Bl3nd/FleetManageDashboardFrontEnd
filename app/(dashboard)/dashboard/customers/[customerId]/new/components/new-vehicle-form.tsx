"use client";

import {useParams, useRouter} from "next/navigation";

import * as z from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {useState} from "react";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;

const formSchema = z.object(
	{
		plateNumber: z.string().min(1, "*Required").max(9, "You have entered an invalid plate number"),
		vin: z.string().min(1, "*Required").max(17, "You have entered an invalid VIN"),
		location: z.string().min(1),
	}
);

const states = [
	{name: 'Alabama'},
	{name: 'Alaska'},
	{name: 'Arizona'},
	{name: 'Arkansas'},
	{name: 'California'},
	{name: 'Colorado'},
	{name: 'Connecticut'},
	{name: 'Delaware'},
	{name: 'Florida'},
	{name: 'Georgia'},
	{name: 'Hawaii'},
	{name: 'Idaho'},
	{name: 'Illinois'},
	{name: 'Indiana'},
	{name: 'Iowa'},
	{name: 'Kansas'},
	{name: 'Kentucky'},
	{name: 'Louisiana'},
	{name: 'Maine'},
	{name: 'Maryland'},
	{name: 'Massachusetts'},
	{name: 'Michigan'},
	{name: 'Minnesota'},
	{name: 'Mississippi'},
	{name: 'Missouri'},
	{name: 'Montana'},
	{name: 'Nebraska'},
	{name: 'Nevada'},
	{name: 'New Hampshire'},
	{name: 'New Jersey'},
	{name: 'New Mexico'},
	{name: 'New York'},
	{name: 'North Carolina'},
	{name: 'North Dakota'},
	{name: 'Ohio'},
	{name: 'Oklahoma'},
	{name: 'Oregon'},
	{name: 'Pennsylvania'},
	{name: 'Rhode Island'},
	{name: 'South Carolina'},
	{name: 'South Dakota'},
	{name: 'Tennessee'},
	{name: 'Texas'},
	{name: 'Utah'},
	{name: 'Vermont'},
	{name: 'Virginia'},
	{name: 'Washington'},
	{name: 'West Virginia'},
	{name: 'Wisconsin'},
	{name: 'Wyoming'},
]

type VehicleFormType = z.infer<typeof formSchema>;

const NewVehicleForm = ({
	                        user
                        }: {
	user: string | undefined;
}) => {
	const {customerId} = useParams();
	const router = useRouter();
	const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<VehicleFormType>({
		resolver: zodResolver(formSchema),
	});
	const [isAddAnother, setIsAddAnother] = useState(false);

	const onSubmit: SubmitHandler<VehicleFormType> = async (data) => {
		try {
			await axios.post(`/api/${user}/customers/${customerId}/vehicles`, data);
			if (!isAddAnother) {
				router.refresh();
				router.push(`/dashboard/customers/${customerId}`);
			} else {
				router.refresh();
				reset();
			}
			console.log("Success");
		} catch (error) {
			throw new Error('Something went wrong.')
		}
	}

	return (
		<div className='space-y-10 divide-y divide-neutral-900/10'>
			<div className='grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3'>
				<div className='px-4 sm:px-0'>
					<h2 className='text-base font-semibold leading-7 text-blue-700'>Vehicle Information</h2>
				</div>

				<form
					className='bg-white shadow-sm ring-1 ring-neutral-900/5 sm:rounded-xl md:col-span-2'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='px-4 py-6 sm:p-8'>
						<div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
							<div className='sm:col-span-2 sm:col-start-1'>
								<label
									htmlFor='plateNumber'
									className='block text-sm font-medium leading-6 text-blue-700'
								>
									Plate Number
								</label>
								<div className='mt-2'>
									<input
										type='text'
										id='plateNumber'
										{...register('plateNumber')}
										className='block w-full rounded-md border-0 py-1.5 text-blue-800 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
									/>
									{errors.plateNumber && (
										<span className='text-red block text-sm font-medium mt-2'>
											{errors.plateNumber?.message}
										</span>
									)}
								</div>
							</div>

							<div className='sm:col-span-2'>
								<label
									htmlFor='vin'
									className='block text-sm font-medium leading-6 text-blue-700'
								>
									VIN
								</label>
								<div className='mt-2'>
									<input
										type='text'
										id='vin'
										{...register('vin')}
										className='block w-full rounded-md border-0 py-1.5 text-blue-800 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
									/>
									{errors.vin && (
										<span className='text-red block text-sm font-medium mt-2'>
											{errors.vin?.message}
										</span>
									)}
								</div>
							</div>

							<div className='sm:col-span-2'>
								<label
									htmlFor='location'
									className='block text-sm font-medium leading-6 text-blue-700'
								>
									State
								</label>
								<div className='mt-2'>
									<select
										id='location'
										{...register('location')}
										className='block w-full rounded-md border-0 py-1.5 text-blue-800 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
										defaultValue='Idaho'
									>
										{states.map((state) => (
											<option key={state.name}>{state.name}</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>

					<div
						className='flex items-center justify-end gap-x-6 border-t border-blue-800/10 px-4 py-4 sm:px-8'
					>
						<button
							type='button'
							className='text-sm font-semibold leading-6 text-light-blue-700'
							onClick={() => router.push(`/dashboard/customers/${customerId}`)}
						>
							Cancel
						</button>
						<button
							type='submit'
							className='rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
							disabled={isSubmitting}
						>
							Save
						</button>
						<button
							type='submit'
							className='rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
							disabled={isSubmitting}
							onClick={() => setIsAddAnother(true)}
						>
							Add Another
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default NewVehicleForm;