"use server";

import {connectToDB} from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import {revalidatePath} from "next/cache";

export async function fetchUser(userId: string) {
	try {
		connectToDB();
		return await User.findOne({id: userId});
	} catch (error: any) {
		throw new Error(`Failed to fetch user: ${error.message}`);
	}
}

interface Params {
	userId: string;
	name: string;
	path: string;
}

export async function updateUser({
	                                 userId,
	                                 name,
	                                 path,
                                 }: Params): Promise<void> {
	try {
		connectToDB();

		await User.findOneAndUpdate({id: userId}, {name, onboarded: true}, {upsert: true});

		if (path === "/profile/edit") {
			revalidatePath(path);
		}
	} catch (error: any) {
		throw new Error(`Failed to create/update user: ${error.message}`);
	}
}