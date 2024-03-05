// import React from 'react'
// import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

import * as Page from '@/components/custom/page'
import { SqlWrapper } from './sqlwrapper'

import { MenuH } from './menuh'
// import { Button } from '@/components/custom/button'
//
// import type { model } from '@@/go/models'
// import { GetEngines, SaveEngine } from '@@/go/core/CommandHandler'
// import { useLoaderData } from 'react-router-dom'


export function DbPage() {
    // const [session, setSession] = React.useState<model.Engine | null>(null)
    // const [scope] = useAnimate()
    // const totalEngines = (useLoaderData() ?? []) as model.Engine[]
    // const [engines, setEngines] = React.useState(totalEngines)
    // const [serverInput, setServerInput] = React.useState("")
    // const [portInput, setPortInput] = React.useState(1433)
    // const [passwordInput, setPasswordInput] = React.useState("")
    // const [nameInput, setNameInput] = React.useState("sa")
    // function clearForm  () {
    //     setPasswordInput("")
    //     setServerInput("")
    //     setPortInput(1433)
    //     setNameInput("sa")
    // }
    // async function onSubmit() {
    //     try {
    //
    //         const res = await SaveEngine(serverInput, nameInput, passwordInput, portInput)
    //         console.log(res)
    //         const res1 = await GetEngines()
    //         setEngines(res1)
    //         clearForm()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <Page.Root>
            <Page.Header>
                <Page.Title>{'Databases'}</Page.Title>
            </Page.Header>

            <div className='z-40 h-full w-full overflow-y-scroll'>
                <h2 className=' text-center text-2xl font-bold'>Databases</h2>
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.125 }}
                    className='grid w-full gap-4 border-b-[1px] border-solid border-b-[rgba(255,255,255,.125)] px-8 py-6'
                >
                    <div className='flex items-center justify-between gap-8'>
                        <div className='flex flex-col h-full w-full justify-between gap-4 '>
                            <MenuH />
                        </div>
                        <div className='flex flex-col w-full gap-4'>
                            <SqlWrapper />
                        </div>
                    </div>
                </motion.section>
            </div>
        </Page.Root>
    )
}
