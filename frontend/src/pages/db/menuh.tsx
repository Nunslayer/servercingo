import React from 'react'
import { Icon } from '@iconify/react'
import { useLocation, Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

const NavItems = [
  {
    icons: ['noto-v1:letter-f', 'tabler:letter-f'],
    href: 'Funciones'
  },
  {
    icons: ['material-symbols:database-outline', 'material-symbols:database'],
    href: 'Base de Datos'
  },
  {
    icons: ['material-symbols:database-outline', 'material-symbols:database'],
    href: 'Base de Datos'
  },
  {
    icons: ['clarity:sign-out-line', 'clarity:sign-out-solid'],
    href: 'Stored Procedure'
  }
] as const

export function MenuH() {
  const location = useLocation()
  return (
    <nav >
      {NavItems.map(({ href, icons }) => (
        <NavItem key={href} href={href} icons={icons} selected={location.pathname.includes(href)} />
      ))}
    </nav>
  )
}

function NavItem(
  props: {
    icons: readonly [string, string]
    href: string
    selected?: boolean
  } & React.PropsWithChildren
) {

  return (
    <Link
      to={props.href}
      className={cn(
        'flex items-center justify-between no-wrap',
        'group flex items-center justify-between',
        'transition-colors hover:bg-slate-50 hover:bg-opacity-5 hover:!text-white active:bg-[rgba(255,255,255,.075)]',
        'rounded px-1 py-2 text-lg text-[#bfbcff] text-opacity-80'
      )}
      style={{
        fontWeight: props.selected ? '600' : '200',
        color: props.selected ? '#d6d4ff' : '#bfbcff'
      }}
    >
      <div className='flex items-center justify-between'>
        <Icon
          icon={props.selected ? props.icons[1] : props.icons[0]}
          className='mr-1 h-7 w-10 text-[#3DB8D5] transition-colors'
        />
        <span className='whitespace-nowrap'>{props.href}</span>
      </div>
    </Link>
  )
}
