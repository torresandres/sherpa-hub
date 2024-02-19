import { getServerSession } from 'next-auth'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import theme from '@/app/theme'

import '@mantine/core/styles.css'
import './globals.css'

export const metadata = {
  metadataBase: 'http://sherpahub',
  title: 'Sherpa hub',
  description: '',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
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