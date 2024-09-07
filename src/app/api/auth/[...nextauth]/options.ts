import { getServerSession, type NextAuthOptions} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/utils/auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt-ts"

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/signin',  // Displays signin form
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({ where: { email: credentials?.email } })
        if (!user) {
            return null
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(credentials?.password as string, user.password as string);
        if (isPasswordValid) {
          return user; // Return user if password matches
        } else {
          return null; // Return null if password doesn't match
        }
      }
    })
  ], 
}

export const getAuthSession = () => getServerSession(options)