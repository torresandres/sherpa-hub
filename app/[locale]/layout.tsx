import { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'

import { auth } from '@/auth'
import theme from '@/app/theme'

import Header from '@/components/Header/Header'

import '@mantine/core/styles.layer.css'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: 'Sherpa Hub',
  description: '',
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  const session = await auth()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
      <SessionProvider session={session}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            <Header />
            {children}
          </MantineProvider>
        </NextIntlClientProvider>
      </SessionProvider>
      </body>
    </html>
  );
}