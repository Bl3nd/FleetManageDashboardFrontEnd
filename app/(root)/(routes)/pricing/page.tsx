"use client";
import {CheckIcon} from "@heroicons/react/24/solid";
import {useState} from "react";
import {RadioGroup} from "@headlessui/react";

const frequencies = [
	{value: 'monthly', label: 'Monthly', priceSuffix: '/month'},
	{value: 'annually', label: 'Annually', priceSuffix: '/year'}
];

const tiers = [
	{
		name: 'Starter',
		id: 'tier-starter',
		href: '#',
		featured: true,
		description: 'All your essential management, taken care of.',
		price: {monthly: '$4', annually: '$48'},
		mainFeatures: ['Up to 5 customers', 'Work order tracking', 'Inspection tracking and scheduling', 'Limited reports'],
	},
	{
		name: 'Advanced',
		id: 'tier-advanced',
		href: '#',
		featured: false,
		description: 'The best customer fleet management for you.',
		price: {monthly: '$6', annually: '$72'},
		mainFeatures: ['Includes all Starter features plus more', 'Unlimited customers', 'Unlimited reports'],
	},
];

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

export default function PricingPage() {
	const [frequency, setFrequency] = useState(frequencies[0]);
	return (
		<div className='relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8'>
			<div
				className='absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl'
				aria-hidden='true'
			>
				<div
					className='mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30'
					style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}
				/>
			</div>
			<div className='mx-auto max-w-2xl text-center lg:max-w-4xl'>
				<h2 className='text-base font-semibold leading-7 text-blue-600'>Pricing</h2>
				<p className='mt-2 text-4xl font-bold tracking-tight text-blue-500 sm:text-5xl'>
					The right price for you
				</p>
			</div>
			<p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-blue-400'>
				Choose an affordable plan that is packed with the best features for your needs.
			</p>
			<div className='mt-16 flex justify-center'>
				<RadioGroup
					value={frequency}
					onChange={setFrequency}
					className='grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-blue-300'
				>
					<RadioGroup.Label className='sr-only'>Payment frequency</RadioGroup.Label>
					{frequencies.map((option) => (
						<RadioGroup.Option
							key={option.value}
							value={option}
							className={({checked}) => classNames(checked ? 'bg-blue-500 text-white' : 'text-blue-400', 'cursor-pointer rounded-full px-2.5 py-1')}
						>
							<span>{option.label}</span>
						</RadioGroup.Option>
					))}
				</RadioGroup>
			</div>
			<div
				className='mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2'
			>
				{tiers.map((tier, tierIdx) => (
					<div
						key={tier.id}
						className={classNames(
							tier.featured ? 'relative bg-white shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
							tier.featured ? '' : tierIdx === 0 ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl' : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
							'rounded-3xl p-8 ring-1 ring-blue-800/10 sm:p-10')}
					>
						<h3 id={tier.id} className='text-base font-semibold leading-7 text-blue-500'>
							{tier.name}
						</h3>
						<p className='mt-4 flex items-baseline gap-x-1'>
								<span className='text-5xl font-bold tracking-tight text-blue-300'>
									{tier.price[frequency.value as keyof typeof tier.price]}
								</span>
							<span className='text-base text-blue-400'>{frequency.priceSuffix}</span>
						</p>
						<p className='mt-6 text-base leading-7 text-blue-700'>{tier.description}</p>
						<ul role='list' className='mt-8 space-y-3 text-sm leading-6 text-blue-200 sm:mt-10'>
							{tier.mainFeatures.map((feature) => (
								<li key={feature} className='flex gap-x-3'>
									<CheckIcon className='h-6 w-5 flex-none text-blue-200' aria-hidden='true'/>
									{feature}
								</li>
							))}
						</ul>
						<a
							href={tier.href}
							aria-describedby={tier.id}
							className={classNames(tier.featured ? 'bg-blue-200 text-white shadow hover:bg-blue-100' : 'text-blue-500 ring-1 ring-inset ring-blue-400 hover:ring-blue-300',
								'mt-8 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:mt-10')}
						>
							Get started today
						</a>
					</div>
				))}
			</div>
		</div>
	)
};