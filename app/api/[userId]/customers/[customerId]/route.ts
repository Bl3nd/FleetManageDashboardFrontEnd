import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request, {params}: { params: { customerId: string; }; }) {
	try {
		if (!params.customerId) {
			return new NextResponse('Customer id is required', {status: 400});
		}

		const customer = await prismadb.customer.findUnique({
			where: {
				id: params.customerId,
			},
		});

		return NextResponse.json(customer);
	} catch (error) {
		console.log('[CUSTOMER_GET]', error);
		return new NextResponse('Internal Error', {status: 500});
	}
}