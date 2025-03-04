import type {NextAuthOptions} from "next-auth";
import GitHubProvider, {GithubProfile} from "next-auth/providers/github";
import GoogleProvider, {GoogleProfile} from "next-auth/providers/google";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prismadb from "@/lib/prismadb";

export const options: NextAuthOptions = {
	adapter: PrismaAdapter(prismadb),
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
	],
	callbacks: {
		async jwt({token, account, user}) {
			if (account) {
				token.accessToken = account.access_token;
				token.id = user.id;
			}

			return token;
		},
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
		updateAge: 24 * 60 * 60,
	},
	debug: process.env.NODE_ENV === 'development',
	secret: process.env.NEXTAUTH_SECRET,
}