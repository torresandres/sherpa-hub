import DiscordProvider from 'next-auth/providers/discord'

import type { NextAuthConfig, Profile } from 'next-auth'

import { db } from '@/lib/kysely'

export default {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: { params: { scope: 'identify email' } },
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    signIn: async ({ profile }) => {
      try {
        await db
          .insertInto('users')
          .values({
            //@ts-ignore
            discord_uid: profile.id,
            //@ts-ignore
            discord_username: profile.username,
          })
          .executeTakeFirstOrThrow()
      } catch(error: any) {
        // User exists, do nothing
      }

      return true
    },
    jwt: async ({ token, account, profile }) => {
      if (account) {
        token.accessToken = account.access_token
        token.profile = profile
      }

      return token
    },
    session: async ({ session, token }) => {
      if (session?.user && token.profile) {
        session.user = {
          ...session.user,
          name: session.user.name || '',
          email: session.user.email || '',
          image_url: session.user.image_url || '',
          ...token.profile,
        }
      }

      return session
    },
  }
} satisfies NextAuthConfig