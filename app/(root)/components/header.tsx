"use client";
import Image from "next/image";
import logo from "@/images/logo.png";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid";
import {Dialog, Popover} from "@headlessui/react";
import {useState} from "react";
import {useRouter} from "next/navigation";

const navigation = [
	{name: 'Home', href: '/'},
	{name: 'About Us', href: '/about-us'},
	{name: 'Pricing', href: '/pricing'},
];

export default function HomeHeader() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const router = useRouter();

	function handleNavigate(url: string) {
		router.push(url);
	}

	return (
		<header className='absolute inset-x-0 top-0 z-50'>
			<div className='mx-auto max-w-7xl'>
				<div className='px-6 pt-6 lg:max-w-2xl lg:pl-8 lg:pr-0'>
					<nav className='flex items-center justify-between lg:justify-start' aria-label='Global'>
						<div className="flex">
							<a href='/' className='-m-1.5 p-1.5'>
								<span className='sr-only'>Your Company</span>
								<Image src={logo} alt='Your company' className='h-10 w-auto' priority={false}/>
							</a>
						</div>
						<button
							type='button'
							className='-m-2.5 rounded-md p-2.5 text-blue-700 lg:hidden'
							onClick={() => setMobileMenuOpen(true)}
						>
							<span className='sr-only'>Open main menu</span>
							<Bars3Icon className='h-6 w-6' aria-hidden='true'/>
						</button>
						<Popover.Group className='hidden lg:ml-12 lg:flex lg:gap-x-14'>
							{navigation.map((item) => (
								<a
									key={item.name}
									className='text-sm font-semibold leading-6 text-blue-700 cursor-pointer hover:text-blue-300'
									onClick={() => handleNavigate(item.href)}
								>
									{item.name}
								</a>
							))}
							<a className='text-sm font-semibold leading-6 text-blue-700 cursor-pointer hover:text-blue-300'
							   onClick={() => handleNavigate('/dashboard')}>
								Dashboard
							</a>
						</Popover.Group>
					</nav>
				</div>
			</div>
			<Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
				<div className='fixed inset-0 z-50'/>
				<Dialog.Panel
					className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-blue-800/10'
				>
					<div className='flex items-center justify-between'>
						<a href='#' className='-m-1.5 p-1.5'>
							<span className='sr-only'>Your Company</span>
							<Image src={logo} alt='' className='h-8 w-auto' priority={false}/>
						</a>
						<button
							type='button'
							className='-m-2.5 rounded-md p-2.5 text-blue-700'
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className='sr-only'>Close menu</span>
							<XMarkIcon className='h-6 w-6' aria-hidden='true'/>
						</button>
					</div>
					<div className='mt-6 flow-root'>
						<div className='-my-6 divide-y divide-blue-400/10'>
							<div className='space-y-2 py-6'>
								{navigation.map((item) => (
									<a
										key={item.name}
										className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue-700 hover:bg-blue-300 cursor-pointer hover:text-white'
										onClick={() => handleNavigate(item.href)}
									>
										{item.name}
									</a>
								))}
							</div>
							<div className='py-6'>
								<a
									className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-blue-700 hover:bg-blue-300 hover:text-white'
									onClick={() => handleNavigate('/dashboard')}
								>
									Dashboard
								</a>
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	)
}