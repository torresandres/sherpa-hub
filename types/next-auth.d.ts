import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      name: string,
      email: string,
      image: string,
      id: number,
      username: string,
      avatar: string,
      discriminator: number,
      public_flags: number,
      premium_type: number,
      flags: number,
      banner: string,
      accent_color: number,
      global_name: string,
      avatar_decoration_data: {
        asset: string,
        sku_id: number
      },
      banner_color: string,
      mfa_enabled: boolean,
      locale: string,
      verified: boolean,
      image_url: string
    }
  }
}