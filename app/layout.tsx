import { ColorSchemeScript, MantineProvider } from '@mantine/core'

import theme from '@/app/theme'

import '@mantine/core/styles.css'
import './globals.css'

export const metadata = {
  metadataBase: 'http://sherpahub',
  title: 'Sherpa hub',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}