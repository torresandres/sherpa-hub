import DiscordProvider, { DiscordProfile } from 'next-auth/providers/discord'

import type { NextAuthConfig } from 'next-auth'

import { db, Database } from '@/lib/kysely'

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
            id: profile?.id,
            username: profile?.username as string,
            avatar: profile?.avatar as string,
          })
          .executeTakeFirstOrThrow()
      } catch(error: any) {
        await db
          .updateTable('users')
          .set({
            //@ts-ignore
            username: profile?.username,
            avatar: profile?.avatar,
          })
          //@ts-ignore
          .where('id', '=', profile.id)
          .executeTakeFirst()
      }

      return true
    },
    jwt: async ({ token, profile }) => {
      if (profile) {
        token.profile = profile
      }

      return token
    },
    session: async ({ session, token }) => {
      const user = await db
        .selectFrom('users')
        .selectAll()
        //@ts-ignore
        .where('id', '=', token.profile.id)
        .executeTakeFirst()

      return {
        ...session,
        user: {
          ...session.user,
          ...user,
        }
      }
    },
  }
} satisfies NextAuthConfig