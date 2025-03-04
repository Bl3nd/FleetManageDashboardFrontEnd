import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, {params}: { params: { userId: string, customerId: string; }; }) {
	try {
		if (!params.userId) {
			return new NextResponse('User ID is required', {status: 400});
		}

		if (!params.customerId) {
			return new NextResponse('Customer ID is required', {status: 400});
		}

		const body = await req.json();
		const {location, plateNumber, vin} = body;
		if (!location) {
			return new NextResponse('Plate State is required', {status: 400});
		}

		if (!plateNumber) {
			return new NextResponse('Plate number is required', {status: 400});
		}

		if (!vin) {
			return new NextResponse('Vehicle Identification Number is required', {status: 400});
		}

		const vehicle = await prismadb.vehicle.create({
			data: {
				plateNumber,
				state: location,
				vinNumber: vin,
				customerId: params.customerId,
			},
		});

		return NextResponse.json(vehicle);
	} catch (error) {
		console.log('[VEHICLES_POST]', error);
		return new NextResponse('Internal Error', {status: 500});
	}
}