"use client";
import Image from "next/image";
import logo from "@/images/logo.png";
import {
	ArrowRightOnRectangleIcon,
	Bars3Icon,
	Cog6ToothIcon,
	HomeIcon,
	UserIcon,
	XMarkIcon
} from "@heroicons/react/24/solid";
import {Dialog, Popover, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";
import {ChevronDownIcon} from "@heroicons/react/24/outline";

const navigation = [
	{name: 'Home', href: '/'},
	{name: 'About Us', href: '/about-us'},
	{name: 'Pricing', href: '/pricing'},
];

const accountNavigation = [
	{name: 'Dashboard', description: 'Go to your dashboard', href: '/dashboard', icon: HomeIcon},
	{name: 'My Account', description: 'Go to your account.', href: '#', icon: UserIcon},
	{
		name: 'Sign Out',
		description: 'Sign out of your account.',
		href: '/api/auth/signout?callbackUrl=/',
		icon: ArrowRightOnRectangleIcon
	}
];

type User = {
	name?: string | null | undefined;
	email?: string | null | undefined;
	image?: string | null | undefined;
} | undefined;

type Props = {
	user: User;
}

export default function HomeHeader({user}: Props) {
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
							{user ? (
								<Popover className='relative'>
									<Popover.Button
										className='flex items-center gap-x-1 text-sm font-semibold leading-6 text-blue-700 hover:text-blue-300'>
										Account
										<ChevronDownIcon
											className='h-5 w-5 flex-none text-blue-700'
											aria-hidden='true'
										/>
									</Popover.Button>
									<Transition
										as={Fragment}
										enter='transition ease-out duration-200'
										enterFrom='opacity-0 translate-y-1'
										enterTo='opacity-100 translate-y-0'
										leave='transition ease-in duration-150'
										leaveFrom='opacity-100 translate-y-0'
										leaveTo='opacity-0 translate-y-1'
									>
										<Popover.Panel
											className='absolute -left-8 top-full z-10 mt-3 w-80 rounded-3xl bg-white p-2 shadow-lg ring-1 ring-blue-800/5'
										>
											<div className='p-4'>
												{accountNavigation.map((item) => (
													<div
														key={item.name}
														className='group relative flex gap-x-4 rounded-lg p-4 text-sm leading-6 hover:bg-blue-100'
													>
														<div
															className='mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg'
														>
															<item.icon
																className='h-6 w-6 text-blue-700 group-hover:text-white'
																aria-hidden='true'
															/>
														</div>
														<div className='flex-auto'>
															<a href={item.href}
															   className='block font-semibold text-blue-700 group-hover:text-white'
															>
																{item.name}
																<span className='absolute inset-0'/>
															</a>
															<p className='mt-1 text-sm text-blue-700 group-hover:text-white'>{item.description}</p>
														</div>
													</div>
												))}
											</div>
										</Popover.Panel>
									</Transition>
								</Popover>
							) : (
								<a
									className='text-sm font-semibold leading-6 text-blue-700 cursor-pointer hover:text-blue-300'
									onClick={() => handleNavigate('/auth/signin')}
								>
									Log In
								</a>
							)}
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
								{user ? (
									<a
										href='#'
										className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-blue-700 hover:bg-blue-300 hover:text-white'
										onClick={() => signOut()}
									>
										Log Out
									</a>
								) : (
									<a
										href='#'
										className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-blue-700 hover:bg-blue-300 hover:text-white'
										onClick={() => handleNavigate('/api/auth/signin?callbackUrl=/')}
									>
										Log In
									</a>
								)}
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	)
}