'use client'

import { useCallback } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Group, Button, Image, Text } from '@mantine/core'
import { IconBrandDiscordFilled, IconLogout } from '@tabler/icons-react'

import classes from './Header.module.css'
import { ActionIcon } from '@mantine/core'

export default function Header() {
  const { data: session } = useSession()
  const t = useTranslations()
  const login = useCallback(() => {
    signIn('discord', { callbackUrl: '/' })
  }, [])

  const logout = useCallback(() => {
    signOut({ callbackUrl: '/' })
  }, [])

  return (
    <Group component="header" className={classes.wrapper}>
      <Link className={classes.link} href="/" passHref>
        <Group gap="xs">
          <Image className={classes.logo} src="/images/sherpa.png" alt="" />
          <h1 className={classes.title}>{t('App.name')}</h1>
        </Group>
      </Link>
      <Group ml="auto">
      {session ? <>
        <Group gap="xs">
          <Text>{session.user.username}</Text>
          <Image className={classes.avatar} src={session.user.image_url} alt="" />
        </Group>
        <ActionIcon variant="subtle" onClick={logout} title={t('Header.logout')}>
          <IconLogout size={16} />
        </ActionIcon>
      </> : (
        <Button
          variant="light"
          leftSection={<IconBrandDiscordFilled size={16} />}
          onClick={login}
        >
          {t('Header.login')}
        </Button>
      )}
      </Group>
    </Group>
  )
}