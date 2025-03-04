"use client";

import {Fragment, useState} from "react";
import Image from "next/image";
import {Dialog, Disclosure, Menu, Transition} from "@headlessui/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid";
import {
	BellIcon,
	ChartPieIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	Cog6ToothIcon,
	HomeIcon,
	UserGroupIcon,
	UsersIcon
} from "@heroicons/react/24/outline";
import logo from "@/images/logo.png";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

type User = {
	name?: string | null | undefined;
	email?: string | null | undefined;
	image?: string | null | undefined;
} | undefined;

type UserProps = {
	user: User;
}

export default function DashboardSidebarLayout({user}: UserProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	const mainNavigation = [
		{name: 'Dashboard', href: '/dashboard', current: pathname == '/dashboard', icon: HomeIcon},
		{name: 'Team', href: '/dashboard/team', current: pathname == '/dashboard/team', icon: UsersIcon},
		{
			name: 'Customers',
			current: false,
			icon: UserGroupIcon,
			children: [
				{name: 'Overview', current: pathname == '/dashboard/customers', href: '/dashboard/customers'}
			],
		},
		{name: 'Reports', href: '/dashboard/#', current: pathname == '/dashboard/reports', icon: ChartPieIcon}
	];

	const userNavigation = [
		{name: 'Your profile', href: '/dashboard/#'},
		{name: 'Sign out', href: '/api/auth/signout?callbackUrl=/'},
	];

	return (
		<div>
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog as='div' className='relative z-50 lg:hidden' onClose={setSidebarOpen}>
					<Transition.Child
						as={Fragment}
						enter='transition-opacity ease-linear duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='transition-opacity ease-linear duration-300'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-blue-800/80'/>
					</Transition.Child>

					<div className='fixed inset-0 flex'>
						<Transition.Child
							as={Fragment}
							enter='transition ease-in-out duration-300 transform'
							enterFrom='-translate-x-full'
							enterTo='translate-x-0'
							leave='transition ease-in-out duration-300 transform'
							leaveFrom='translate-x-0'
							leaveTo='-translate-x-full'
						>
							<Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
								<Transition.Child
									as={Fragment}
									enter='ease-in-out duration-300'
									enterFrom='opacity-0'
									enterTo='opacity-100'
									leave='ease-in-out duration-300'
									leaveFrom='opacity-100'
									leaveTo='opacity-0'
								>
									<div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
										<button
											type='button'
											className='-m-2.5 p-2.5'
											onClick={() => setSidebarOpen(false)}
										>
											<span className='sr-only'>Close sidebar</span>
											<XMarkIcon className='h-6 w-6 text-white' aria-hidden='true'/>
										</button>
									</div>
								</Transition.Child>
								{/*	Mobile Sidebar component. I can replace this if wanted... */}
								<div className='flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4'>
									<div className='flex h-16 shrink-0 items-center'>
										<Image style={{height: '2rem', width: 'auto', cursor: 'pointer'}}
										       src={logo}
										       alt='Company Logo'
										       priority={false}
										/>
									</div>
									<nav className='flex flex-1 flex-col'>
										<ul role='list' className='flex flex-1 flex-col gap-y-7'>
											<li>
												<ul role='list' className='-mx-2 space-y-1'>
													{mainNavigation.map((item) => (
														<li key={item.name}>
															{!item.children ? (
																<Link href={item.href}
																      className={classNames(item.current ? 'bg-blue-300 text-white' : 'text-blue-700 hover:text-white hover:bg-blue-100',
																	      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold')}
																>
																	<item.icon
																		className={classNames(item.current ? 'text-white' : 'text-blue-700 group-hover:text-white hover:bg-blue-100',
																			'h-6 w-6 shrink-0')}
																		aria-hidden='true'
																	/>
																	{item.name}
																</Link>
															) : (
																<Disclosure as='div'>
																	{({open}) => (
																		<>
																			<Disclosure.Button
																				className={classNames(item.current ? 'bg-blue-300 text-white' : 'text-blue-700 hover:text-white hover:bg-blue-100',
																					'flex group items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-blue-700')}
																			>
																				<item.icon
																					className={classNames(item.current ? 'text-white' : 'text-blue-700 group-hover:text-white',
																						'h-6 w-6 shrink-0')}
																					aria-hidden='true'/>
																				{item.name}
																				<ChevronRightIcon
																					className={classNames(open ? 'rotate-90 text-blue-700' : 'text-blue-700 group-hover:text-white',
																						'ml-auto h-5 w-5 shrink-0')}
																				/>
																			</Disclosure.Button>
																			<Disclosure.Panel
																				as='ul'
																				className='mt-1 px-2'
																			>
																				{item.children.map((subItem) => (
																					<li key={subItem.name}>
																						<Disclosure.Button
																							as='a'
																							href={subItem.href}
																							className={classNames(subItem.current ? 'bg-blue-300 text-white' : 'text-blue-700 hover:text-white hover:bg-blue-100',
																								'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-blue-700')}
																						>
																							{subItem.name}
																						</Disclosure.Button>
																					</li>
																				))}
																			</Disclosure.Panel>
																		</>
																	)}
																</Disclosure>
															)}
														</li>
													))}
												</ul>
											</li>
										</ul>
									</nav>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			{/*	Static sidebar for desktop */}
			<div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
				<div
					className='flex grow flex-col gap-y-5 rounded-md overflow-y-auto border-r border-neutral-200 bg-white px-6 pb-4'
				>
					<div className='flex h-16 shrink-0 items-center'>
						<Image
							height={32}
							width={32}
							src={logo}
							alt='Company Logo'
							onClick={() => router.push('/')}
							className='cursor-pointer'
							priority={false}
						/>
					</div>
					<nav className='flex flex-1 flex-col'>
						<ul role='list' className='flex flex-1 flex-col gap-y-7'>
							<li>
								<ul role='list' className='-mx-2 space-y-1'>
									{mainNavigation.map((item) => (
										<li key={item.name}>
											{!item.children ? (
												<Link
													href={item.href}
													className={classNames(item.current ? 'bg-blue-300 text-white' : 'text-blue-700 hover:text-white hover:bg-blue-100',
														'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold')}
													onClick={() => router.push(item.href)}
												>
													<item.icon
														className={classNames(item.current ? 'text-white' : 'text-blue-700 group-hover:text-white hover:bg-blue-100',
															'h-6 w-6 shrink-0')}
														aria-hidden='true'
													/>
													{item.name}
												</Link>
											) : (
												<Disclosure as='div'>
													{({open}) => (
														<>
															<Disclosure.Button
																className={classNames(item.current ? 'bg-blue-300 text-white' : 'text-blue-700 hover:text-white hover:bg-blue-100',
																	'flex group items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-blue-700')}
															>
																<item.icon
																	className={classNames(item.current ? 'text-white' : 'text-blue-700 group-hover:text-white hover:bg-blue-100',
																		'h-6 w-6 shrink-0')}
																	aria-hidden='true'
																/>
																{item.name}
																<ChevronRightIcon
																	className={classNames(open ? 'rotate-90 text-blue-700' : 'text-blue-700',
																		'ml-auto h-5 w-5 shrink-0 group-hover:text-white')}
																/>
															</Disclosure.Button>
															<Disclosure.Panel as='ul' className='mt-1 px-2'>
																{item.children.map((subItem) => (
																	<li key={subItem.name}>
																		<Disclosure.Button
																			as='a'
																			href={subItem.href}
																			className={classNames(subItem.current ? 'bg-blue-300 text-white' : 'text-blue-700 hover:text-white hover:bg-blue-100',
																				'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-blue-700')}
																			onClick={() => router.push(subItem.href)}
																		>
																			{subItem.name}
																		</Disclosure.Button>
																	</li>
																))}
															</Disclosure.Panel>
														</>
													)}
												</Disclosure>
											)}
										</li>
									))}
								</ul>
							</li>
							<li className='mt-auto'>
								<a
									href='#'
									className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-blue-700 hover:bg-blue-100 hover:text-white'
								>
									<Cog6ToothIcon
										className='h-6 w-6 shrink-0 text-blue-700 group-hover:text-white'
										aria-hidden='true'
									/>
									Settings
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>

			{/*	Header */}
			<div className='lg:pl-72'>
				<div
					className='sticky top-0 z-40 rounded-md flex h-16 shrink-0 items-center gap-x-4 border-b border-neutral-200 bg-white px-4 shadow-md sm:gap-x-6 sm:px-6 lg:px-8'
				>
					<button
						type='button'
						className='-m-2.5 p-2.5 text-blue-700 lg:hidden'
						onClick={() => setSidebarOpen(true)}
					>
						<span className='sr-only'>Open sidebar</span>
						<Bars3Icon className='h-6 w-6' aria-hidden='true'/>
					</button>

					<div className='h-6 w-px bg-blue-100 lg:hidden' aria-hidden='true'/>

					<div className='flex flex-1 justify-end gap-x-4 lg:gap-x-6'>
						<div className='flex items-center gap-x-4 lg:gap-x-6'>
							<button type='button' className='-m-2.5 p-2.5 text-blue-700 hover:text-blue-400'>
								<span className='sr-only'>View notifications</span>
								<BellIcon className='h-6 w-6' aria-hidden='true'/>
							</button>

							<div className='hidden lg:block lg:h-6 lg:w-px lg:bg-blue-100' aria-hidden='true'/>

							{/*	Profile dropdown */}
							<Menu as='div' className='relative'>
								<Menu.Button className='-m-1.5 flex items-center p-1.5'>
									<span className='sr-only'>Open user menu</span>
									<Image
										height={32}
										width={32}
										className='rounded-full bg-blue-100'
										src={`${user?.image}`}
										alt=''
										priority={false}
									/>
									<span className='hidden lg:flex lg:items-center'>
										<span
											className='ml-4 text-sm font-bold leading-6 text-blue-300'
											aria-hidden='true'
										>
											{user?.name}
										</span>
										<ChevronDownIcon className='ml-2 h-5 w-5 text-blue-400' aria-hidden='true'/>
									</span>
								</Menu.Button>
								<Transition
									as={Fragment}
									enter='transition ease-out duration-100'
									enterFrom='transform opacity-0 scale-95'
									enterTo='transform opacity-100 scale-100'
									leave='transition ease-in duration-75'
									leaveFrom='transform opacity-100 scale-100'
									leaveTo='transform opacity-0 scale-95'
								>
									<Menu.Items
										className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-blue-700/5 focus:outline-none'
									>
										{userNavigation.map((item) => (
											<Menu.Item key={item.name}>
												{({active}) => (
													<Link
														href={item.href}
														className={classNames(active ? 'bg-blue-200 text-white rounded-md' : '', 'block px-3 py-1 text-sm leading-6 text-blue-700')}
													>
														{item.name}
													</Link>
												)}
											</Menu.Item>
										))}
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};