"use client";
import React, {Fragment, useState} from "react";
import logo from '../../images/logo.png';
import Image from "next/image";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Bars3Icon, UserCircleIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {useRouter} from "next/navigation";

type User = {
	name?: string | null | undefined;
	email?: string | null | undefined;
	image?: string | null | undefined;
} | undefined;

type Props = {
	user: User;
}

const navigation = [
	{name: 'Home', href: '/', current: false},
	{name: 'About Us', href: '/about-us', current: false},
	{name: 'Pricing', href: '#', current: false},
];

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(' ');
}

export function Navbar({user}: Props) {
	const [navItems, setNavItems] = useState(navigation);
	const router = useRouter();

	const userImage = user?.image ? (
		<Image width={8} height={8} src={user?.image} alt={user?.name ?? 'Profile Pic'} priority={true}/>
	) : <UserCircleIcon className={'h-8 w-8 rounded-full text-blue-500'}/>;

	// @ts-ignore
	return (
		<Disclosure as={'nav'} className={'bg-light-blue-100 shadow shadow-light-blue-200'}>
			{({open}) => (
				<>
					<div className={'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'}>
						<div className={'flex h-16 justify-between'}>
							<div className={'flex'}>
								<div className={'flex flex-shrink-0 items-center'}>
									<Image className={'h-8 w-auto'} src={logo} alt={'Your Company'} priority={false}/>
								</div>
								<div className={'hidden sm:ml-6 sm:flex sm:space-x-8'} aria-label={'Global'}>
									{navItems.map((item) => (
										<a key={item.name}
										   aria-current={item.current ? 'page' : undefined}
										   className={classNames(item.current ? 'border-blue-600 text-blue-500' : 'border-transparent text-blue-500 hover:border-blue-300 hover:text-blue-300',
											   'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium cursor-pointer')}
										   onClick={() => {
											   router.push(item.href)
										   }}
										>
											{item.name}
										</a>
									))}
								</div>
							</div>
							<div className={'hidden sm:ml-6 sm:flex sm:items-center'}>
								<Menu as={'div'} className={'relative ml-3'}>
									<div>
										<Menu.Button
											className={'relative flex rounded-full bg-light-blue-100 text-sm focus:outline-none'}>
											<span className={'absolute -inset-1.5'}/>
											<span className={'sr-only'}>Open user menu</span>
											{userImage}
										</Menu.Button>
									</div>
									<Transition as={Fragment}
									            enter="transition ease-out duration-200"
									            enterFrom="transform opacity-0 scale-95"
									            enterTo="transform opacity-100 scale-100"
									            leave="transition ease-in duration-75"
									            leaveFrom="transform opacity-100 scale-100"
									            leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items
											className={'absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-neutral-50 py-1 shadow-lg ring-1 ring-blue-300 ring-opacity-5 focus:outline-none'}>
											{user ? (
												<>
													<Menu.Item>
														{({active}) => (
															<a href={'#'}
															   className={classNames(active ? 'bg-light-blue-100 text-blue-300' : 'text-blue-500', 'block px-4 py-2 text-sm')}>
																Your Profile
															</a>
														)}
													</Menu.Item>
													<Menu.Item>
														{({active}) => (
															<a href={'#'}
															   className={classNames(active ? 'bg-light-blue-100 text-blue-300' : 'text-blue-500', 'block px-4 py-2 text-sm')}>
																Settings
															</a>
														)}
													</Menu.Item>
													<Menu.Item>
														{({active}) => (
															<a href={'#'}
															   className={classNames(active ? 'bg-light-blue-100 text-blue-300' : 'text-blue-500', 'block px-4 py-2 text-sm')}>
																Logout
															</a>
														)}
													</Menu.Item>
												</>
											) : (
												<Menu.Item>
													{({active}) => (
														<a className={classNames(active ? 'bg-light-blue-100 text-blue-300' : 'text-blue-500', 'block px-4 py-2 text-sm')}
															/*onClick={() => router.push('/api/auth/signin?callbackUrl=/')}*/
														>
															Log In
														</a>
													)}
												</Menu.Item>
											)}
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
							<div className={'-mr-2 flex items-center sm:hidden'}>
								{/* Mobile Menu Button */}
								<Disclosure.Button
									className={'relative inline-flex items-center justify-center rounded-md p-2 text-blue-300'}>
									<span className={'absolute -inset-0.5'}/>
									<span className={'sr-only'}>Open main menu</span>
									{open ? (
										<XMarkIcon className={'block h-6 w-6'} aria-hidden={'true'}/>
									) : (
										<Bars3Icon className={'block h-6 w-6'} aria-hidden={'true'}/>
									)}
								</Disclosure.Button>
							</div>
						</div>
					</div>
					<Disclosure.Panel className={'sm:hidden'}>
						{navItems.map((item) => (
							<Disclosure.Button key={item.name} aria-label={'Global'}
							                   aria-current={item.current ? 'page' : undefined} as={'a'}
							                   href={item.href}
							                   className={classNames(item.current ? 'border-blue-600 bg-blue-200 text-blue-500' : 'border-transparent text-blue-400 hover:border-blue-300 hover:bg-blue-100',
								                   'block border-l-4 py-2 pl-3 pr-4 text-base font-medium')}
							>
								{item.name}
							</Disclosure.Button>
						))}
						{/*<Disclosure.Button as={'a'} href={'#'}
						                   className={'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'}
						>
							Home
						</Disclosure.Button>
						<Disclosure.Button as={'a'} href={'#'}
						                   className={'block border-l-4 py-2 pl-3 pr-4 text-base font-medium '}
						>
							About Us
						</Disclosure.Button>
						<Disclosure.Button as={'a'} href={'#'}
						                   className={'block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-blue-500 hover:border-blue-300 hover:bg-blue-100'}
						>
							Pricing
						</Disclosure.Button>*/}
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}