"use client";
import Image from "next/image";
import truck from '@/images/trucks_0.jpg';
import {useRouter} from "next/navigation";

export default function HomeHero() {
	const router = useRouter();
	return (
		<div className='bg-white'>
			<div className='relative'>
				<div className='mx-auto max-w-7xl'>
					<div className='relative z-10 pt-14 lg:w-full lg:max-w-2xl'>
						<svg
							className='absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block'
							viewBox='0 0 100 100'
							preserveAspectRatio='none'
							aria-hidden='true'
						>
							<polygon points='0,0 90,0 50,100 0,100'/>
						</svg>

						<div className='relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0'>
							<div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-xl'>
								<div className='hidden sm:mb-10 sm:flex'>
									<div
										className='relative rounded-full px-3 py-1 text-sm leading-6 text-blue-700 ring-1 ring-blue-800/10 hover:ring-blue-800/20'
									>
										Check out what we are about.{' '}
										<a
											className='whitespace-nowrap font-semibold text-blue-200 cursor-pointer'
											onClick={() => router.push('/about-us')}
										>
											<span className='absolute inset-0' aria-hidden='true'/>
											Read more <span aria-hidden='true'>&rarr;</span>
										</a>
									</div>
								</div>
								<h1 className='text-4xl font-bold tracking-tight text-blue-600 sm:text-6xl'>
									Manage your fleet today!
								</h1>
								<p className='mt-6 text-lg leading-8 text-blue-400'>
									Wether you have a small or large asset fleet. We can help you manage it! Join us now
									to assist in the ease of managing your fleet.
								</p>
								<div className='mt-10 flex items-center gap-x-6'>
									<a
										href='/pricing'
										className='rounded-md bg-light-blue-300 px-3.5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm hover:bg-light-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-blue-400 cursor-pointer'
									>
										Get started
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='bg-white lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
					<Image
						src={truck}
						alt=''
						className='aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full'
						priority={true}
					/>
				</div>
			</div>
		</div>
	);
}