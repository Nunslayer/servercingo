import React from 'react'
import type { errorsx } from '@@/go/models'
import { useAnimate } from 'framer-motion'
import { cn } from '@/lib/utils'

type ErrorContextType = [
    error: errorsx.FormattedError | null,
    setError: React.Dispatch<errorsx.FormattedError>
]

const ErrorContext = React.createContext<ErrorContextType | null>(null)
export const useErrorPopup = () => React.useContext(ErrorContext)![1]

export const DefaultErrorMessage: Record<number, string> = {
    401: 'errUnauthorized',
    404: 'errNotFound',
    500: 'errInternalServerError'
}

export function ErrorPopupProvider(props: React.PropsWithChildren) {
    const [scope, animate] = useAnimate()
    const [error, setError] = React.useState<errorsx.FormattedError | null>(null)

    React.useEffect(() => {
        if (error === null) {
            return
        }
        animate('#error-message', { opacity: [0, 1] }).then(() => {
            animate('#error-message', { opacity: [1, 0] }, { delay: 3.5 }).then(() => setError(null))
        })
    }, [error])

    return (
        <ErrorContext.Provider value={[error, setError]}>
            <div ref={scope} className='absolute flex w-full justify-end'>
                <div
                    id='error-message'
                    className={cn(
                        'flex items-center justify-around gap-6',
                        'fixed z-50 mx-auto',
                        'pointer-events-none rounded-bl-xl px-8 py-3 text-xl backdrop-blur-sm',
                        'bg-gradient-to-r from-[#870e65] to-[#6c086d] text-white'
                    )}
                    style={{ opacity: 0 }}
                >
                    {error && (
                        <span>
                            {error?.code && DefaultErrorMessage[error.code]
                                ? DefaultErrorMessage[error.code]
                                : error.message}
                        </span>
                    )}
                </div>
            </div>
            {props.children}
        </ErrorContext.Provider>
    )
}
