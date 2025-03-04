import {getServerSession} from "next-auth";
import prismadb from "@/lib/prismadb";
import NewVehicleForm from "./components/new-vehicle-form";

export default async function NewVehiclePage() {
	const session = await getServerSession();
	const user = await prismadb.user.findFirst({
		where: {
			email: session?.user?.email,
		}
	});

	return (
		<NewVehicleForm user={user?.id}/>
	);
};