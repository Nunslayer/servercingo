import React from 'react'
import { Icon } from '@iconify/react'
import { useLocation, Link } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'

import { ConfigContext } from '@/app/config'
import { cn } from '@/lib/utils'

const NavItems = [
    {
        icons: ['material-symbols:home-outline', 'material-symbols:home'],
        href: 'Inicio'
    },
    {
        icons: ['material-symbols:database-outline', 'material-symbols:database'],
        href: 'Databases'
    },
    {
        icons: ['clarity:sign-out-line', 'clarity:sign-out-solid'],
        href: 'Tablas'
    }
] as const

export function Nav() {
    const location = useLocation()
    const { isConnected } = useAppSelector((state) => state.auth)
    return (
        <nav>
            {/*
            {NavItems.map(({ href, icons }) => (
                <NavItem key={href} href={href} icons={icons} selected={location.pathname.includes(href)} disabled={href != 'Inicio' && !isConnected ? true : false} />
            ))}
            */}
            <NavItem href={NavItems[0].href} icons={NavItems[0].icons} selected={location.pathname.includes(NavItems[0].href)} disabled={false} />
            <NavItem href={NavItems[1].href} icons={NavItems[1].icons} selected={location.pathname.includes(NavItems[1].href)} disabled={!isConnected} />
            <NavItem href={NavItems[2].href} icons={NavItems[2].icons} selected={location.pathname.includes(NavItems[2].href)} disabled={!isConnected} />
        </nav>
    )
}

function NavItem(
    props: {
        icons: readonly [string, string]
        href: string
        selected?: boolean
        disabled?: boolean
    } & React.PropsWithChildren
) {
    const [cfg] = React.useContext(ConfigContext)

    return (
        <Link
            to={props.href}
            className={cn(
                'flex items-center justify-between',
                'group flex items-center justify-between',
                'transition-colors hover:bg-slate-50 hover:bg-opacity-5 hover:!text-white active:bg-[rgba(255,255,255,.075)]',
                'rounded px-1 py-2 text-lg text-[#bfbcff] text-opacity-80'
            )}
            style={{
                fontWeight: props.selected ? '600' : '200',
                color: props.selected ? '#d6d4ff' : '#bfbcff',
                pointerEvents: props.disabled ? 'none' : 'all'
            }}
        >
            <div className='flex items-center justify-between'>
                <Icon
                    icon={props.selected ? props.icons[1] : props.icons[0]}
                    className='mr-1 h-7 w-10 text-[#3DB8D5] transition-colors'
                />
                <span>{props.href.includes('Databases') ? 'Base de Datos' : props.href}</span>
            </div>
            {!cfg.sidebarMinized && (
                <Icon
                    icon='fa6-solid:chevron-left'
                    className='h-3 w-3 rotate-180 opacity-0 transition-opacity group-hover:opacity-100'
                />
            )}
        </Link>
    )
}
