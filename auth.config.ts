import DiscordProvider from 'next-auth/providers/discord'

import type { NextAuthConfig } from 'next-auth'

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
    signIn: async ({ user, profile }) => {
      console.log('signIn', { user, profile })
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
          name: session.user.name || '',
          email: session.user.email || '',
          image: session.user.image || '',
          ...token.profile,
        }
      }

      return session
    },
  }
} satisfies NextAuthConfig