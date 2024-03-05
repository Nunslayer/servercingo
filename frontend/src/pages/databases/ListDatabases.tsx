import React from 'react'
import { cn } from '@/lib/utils'
import { useAppDispatch } from '@/store/hooks'
import { setDatabase } from '@/store/slices/auth/auth.slice'


export function ListDB(
    props: {
        value: string
        closeForm: () => void
        selected?: boolean
        disabled?: boolean
    } & React.PropsWithChildren
) {
    const dispatch = useAppDispatch()
    return (
        <li
            className={cn(
                'flex items-center justify-between',
                'group flex items-center justify-between',
                'transition-colors hover:bg-slate-50 hover:bg-opacity-5 hover:!text-white active:bg-[rgba(255,255,255,.075)]',
                'rounded px-1 py-1 text-md text-[#bfbcff] text-opacity-80'
            )}
            style={{
                fontWeight: props.selected ? '600' : '200',
                color: props.selected ? '#d6d4ff' : '#bfbcff',
                background: props.selected ? "rgba(255,255,255,.075)" : "transparent",
                pointerEvents: props.disabled ? 'none' : 'all',
                cursor: "pointer"
            }}
            onClick={() => {
                dispatch(setDatabase(props.value))
                props.closeForm()
            }}
        >
            <div className='flex items-center justify-between'>
                <span>{props.value.includes('Databases') ? 'Base de Datos' : props.value}</span>
            </div>
        </li>
    )
}
