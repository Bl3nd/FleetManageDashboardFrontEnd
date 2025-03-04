export default function AboutUs() {
	return (
		<div className='py-0'>
			<main className="isolate">
				<div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-blue-300/20 pt-14">
					<div
						className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-300 sm:-mr-80 lg:-mr-96"
						aria-hidden="true"
					/>
					<div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
						<div
							className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
							<h1 className="max-w-2xl text-4xl font-bold tracking-tight text-blue-600 sm:text-6xl lg:col-span-2 xl:col-auto">
								We’re a passionate group of people wanting to build the future of
								managing your fleet.
							</h1>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}