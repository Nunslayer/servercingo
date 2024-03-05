import { errorsx } from '@@/go/models'
import React from 'react'
import { useRouteError } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DefaultErrorMessage } from '../error-popup'
import { AppTitleBar } from './app-titlebar'
import * as Page from '@/components/custom/page'
export function AppErrorBoundary() {
    const err = useFormattedError()
    return (
        <ErrorWrapper err={err}>
            <AppTitleBar />
        </ErrorWrapper>
    )
}
export function PageErrorBoundary() {
  const err = useFormattedError()
  if (!err?.code) {
    return null
  }
  return (
    <ErrorWrapper err={err}>
      <Page.Header>
        <Page.Title>{DefaultErrorMessage[err!.code!]}</Page.Title>
      </Page.Header>
    </ErrorWrapper>
  )
}
const isFormattedError = (error: unknown) => error instanceof Object && 'message' in error && 'code' in error

function useFormattedError() {
    const thrownError = useRouteError()
    const [err, setErr] = React.useState<errorsx.FormattedError>()

    React.useEffect(() => {
        console.log(thrownError)
        if (thrownError instanceof Error) {
            setErr({ code: 500, message: thrownError.message })
        } else if (isFormattedError(thrownError)) {
            setErr(thrownError as errorsx.FormattedError)
        }
    }, [thrownError])
    return err
}

function ErrorWrapper(props: React.PropsWithChildren & { err?: errorsx.FormattedError }) {
    if (!props.err?.code) {
        return null
    }
    return (
        <motion.section
            className='h-screen w-full text-white'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.125 }}
        >
            {props.children}
            <div className='mt-8 flex w-full flex-col items-center justify-center rounded-md pb-16 text-center'>
                <h1 className='text-center text-2xl font-bold'>
                    {DefaultErrorMessage[props.err.code]}
                </h1>
                <p>{props.err.message}</p>
            </div>
        </motion.section>
    )
}
