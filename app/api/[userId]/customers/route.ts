import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, {params}: { params: { userId: string; }; }) {
	try {
		const body = await req.json();
		console.log(body);
		const {companyName, contactNumber, email} = body;
		if (!companyName) {
			return new NextResponse('Company Name is required', {status: 400});
		}

		if (!contactNumber) {
			return new NextResponse('Company Number is required', {status: 400});
		}

		if (!email) {
			return new NextResponse('Company Email is required', {status: 400});
		}

		if (!params.userId) {
			return new NextResponse('User id is required', {status: 400});
		}

		const customer = await prismadb.customer.create({
			data: {
				name: companyName,
				contactNumber,
				email,
				userId: params.userId,
			},
		});

		return NextResponse.json(customer);
	} catch (error) {
		console.log('[CUSTOMERS_POST]', error);
		return new NextResponse('Internal Error', {status: 500});
	}
}

export async function GET(req: Request, {params}: { params: { userId: string; }; }) {
	try {
		if (!params.userId) {
			return new NextResponse('User id is required', {status: 400});
		}

		const customers = await prismadb.customer.findMany({
			where: {
				userId: params.userId,
			},
		});

		return NextResponse.json(customers);
	} catch (error) {
		console.log('[CUSTOMERS_GET]', error);
		return new NextResponse('Internal Error', {status: 500});
	}
}