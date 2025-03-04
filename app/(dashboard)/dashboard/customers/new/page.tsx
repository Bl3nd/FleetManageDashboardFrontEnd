import NewCustomerForm from "@/app/(dashboard)/dashboard/customers/new/components/new-customer-form";
import {getServerSession} from "next-auth";
import prismadb from "@/lib/prismadb";

export default async function NewCustomerPage() {
	const session = await getServerSession();
	const user = await prismadb.user.findFirst({
		where: {
			email: session?.user?.email,
		}
	});

	return (
		<NewCustomerForm user={user?.id}/>
	);
};