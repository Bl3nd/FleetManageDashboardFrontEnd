"use client";
import {useRef, useState} from "react";
import axios from "axios";

import * as z from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";

const formSchema = z.object({
	companyName: z.string().min(1, "Company Name is required"),
	contactNumber: z.string().min(10, "Contact Number is required"),
	email: z.string().min(1, "Contact Email is required"),
});

type CustomerFormType = z.infer<typeof formSchema>;

const NewCustomerForm = ({user}: { user: string | undefined; }) => {
	const [open, setOpen] = useState(true);
	const [isAddAnother, setIsAddAnother] = useState(false);
	const cancelButtonRef = useRef(null);
	const router = useRouter();

	const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<CustomerFormType>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit: SubmitHandler<CustomerFormType> = async (data) => {
		try {
			await axios.post(`/api/${user}/customers`, data);
			if (!isAddAnother) {
				router.refresh();
				router.push('/dashboard/customers');
			} else {
				router.refresh();
				reset();
			}
			console.log("Success");
		} catch (error) {
			throw new Error("Something went wrong.");
		}
	};

	return (
		<div className='space-y-10 divide-y divide-neutral-800/10'>
			<div className='grid grid-cols-1 gap-x-8 pt-8 md:grid-cols-3'>
				<div className='px-4 sm:px-0'>
					<h2 className='text-base font-semibold leading-7 text-blue-700'>Customer Information</h2>
					<p className='mt-1 text-sm leading-6 text-blue-700 opacity-80'>Please enter the information.</p>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className='bg-white shadow-sm ring-1 ring-blue-800/5 sm:rounded-xl md:col-span-2'
				>
					<div className='px-4 py-6 sm:p-8'>
						<div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
							<div className='sm:col-span-3'>
								<label
									htmlFor='companyName'
									className='block text-sm font-medium leading-6 text-blue-700'
								>
									Company Name
								</label>
								<div className='mt-2'>
									<input
										type='text'
										id='companyName'
										className='block w-full rounded-md border-0 py-1.5 text-blue-800 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
										{...register('companyName')}
									/>
									{errors.companyName && (
										<span className='text-red block text-sm font-medium mt-2'>
											{errors.companyName?.message}
										</span>
									)}
								</div>
							</div>

							<div className='sm:col-span-3'>
								<label
									htmlFor='contactNumber'
									className='block text-sm font-medium leading-6 text-blue-700'
								>
									Contact Number
								</label>
								<div className='mt-2'>
									<input
										type='tel'
										pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
										placeholder='000-000-0000'
										id='contactNumber'
										className='block w-full rounded-md border-0 py-1.5 text-blue-800 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
										{...register('contactNumber')}
									/>
									{errors.contactNumber && (
										<span className='text-red block text-sm font-medium mt-2'>
											{errors.contactNumber?.message}
										</span>
									)}
								</div>
							</div>

							<div className='sm:col-span-5'>
								<label
									htmlFor='email'
									className='block text-sm font-medium leading-6 text-blue-700'
								>
									Email
								</label>
								<div className='mt-2'>
									<input
										type='email'
										id='email'
										placeholder='an-email@domain.com'
										className='block w-full rounded-md border-0 py-1.5 text-blue-800 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
										{...register('email')}
									/>
									{errors.email && (
										<span className='text-red block text-sm font-medium mt-2'>
											{errors.email?.message}
										</span>
									)}
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
						>
							Cancel
						</button>
						<button
							type='submit'
							className='rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
							disabled={isSubmitting}
							onClick={() => setIsAddAnother(false)}
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
};

export default NewCustomerForm;