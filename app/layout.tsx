import { ColorSchemeScript, MantineProvider } from '@mantine/core'

import { auth } from '@/auth'
import theme from '@/app/theme'

import '@mantine/core/styles.css'
import './globals.css'

export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL || process.env.NEXTAUTH_URL}`),
  title: 'Sherpa Hub',
  description: '',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          {children}
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </MantineProvider>
      </body>
    </html>
  );
}