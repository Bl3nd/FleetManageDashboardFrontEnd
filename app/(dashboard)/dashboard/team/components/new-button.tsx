"use client";
import {useRouter} from "next/navigation";

export default function AddNewButton() {
	const router = useRouter();
	return (
		<button
			type='button'
			className='block rounded-md bg-blue-200 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
			onClick={() => router.push('team-member/new')}
		>
			Add Team Member
		</button>
	)
};