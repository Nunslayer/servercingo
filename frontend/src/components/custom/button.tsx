import { cn } from '@/lib/utils'
import React from 'react'


export const Button = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>
>((props, ref) => {
  const { disabled, className, children, ...restProps } = props
  return (
    <button
      ref={ref}
      {...(disabled && {
        style: { filter: 'saturate(0)' }
      })}
      className={cn(
        'flex items-center justify-between',
        'text-md whitespace-nowrap font-semibold',
        'bg-[rgba(255,10,10,.1)] transition-colors hover:bg-[#FF3D51] active:bg-[#ff6474]',
        'rounded-[18px] border-[1px] border-[#FF3D51]',
        'px-5 py-3',
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  )
})
