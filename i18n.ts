import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import createIntlMiddleware from 'next-intl/middleware'

const locales = ['en', 'es']

export const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: 'as-needed',
  defaultLocale: 'en'
})

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) {
    notFound()
  }

  return {
    messages: (await import(`@/locale/${locale}.json`)).default
  }
})