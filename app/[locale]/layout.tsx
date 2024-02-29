import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'

import { auth } from '@/auth'
import theme from '@/app/theme'

import '@mantine/core/styles.css'
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
      <NextIntlClientProvider locale={locale} messages={messages}>
        <MantineProvider theme={theme}>
          {children}
          <pre>{JSON.stringify(locale, null, 2)}</pre>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </MantineProvider>
      </NextIntlClientProvider>
      </body>
    </html>
  );
}