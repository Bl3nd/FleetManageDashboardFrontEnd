import * as z from "zod";

export const UserValidation = z.object({
	name: z.string().min(3, {message: "Minimum of 3 characters."}).max(30, {message: "Maximum of 30 characters."}),
})