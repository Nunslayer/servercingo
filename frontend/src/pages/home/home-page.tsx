import { motion } from 'framer-motion'
import * as Page from '@/components/custom/page'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { AppStatusBar } from '@/app/app-layout/app-status'
import { Blockquote } from 'flowbite-react';
import { ConnectForm } from './connectForm'
import { Button } from 'flowbite-react'
import { closeConnection } from '@/store/slices/auth/auth.thunks'


export function HomeWrapper() {
    const { isConnected } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const handlerShutdownConnection = async () => {
        dispatch(closeConnection())
    }
    return (
        <Page.Root>
            <Page.Header>
                <Page.Title>{`Inicio`}</Page.Title>
                <AppStatusBar />
            </Page.Header>

            <div className='z-40 h-full w-full overflow-y-scroll'>
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.125 }}
                    className='grid h-[480px] w-full gap-4 border-b-[1px] border-solid border-b-[rgba(255,255,255,.125)] px-8 py-6'
                >
                    {
                        !!isConnected === true ?
                            <div
                                className="relative  w-[300px]  max-w-[400px] flex-col gap-5 justify-self-center overflow-x-visible overflow-y-scroll my-auto"
                            >
                                <Blockquote className="text-center">
                                    Gracias por usar el aplicativo
                                </Blockquote>
                                <div className="w-full flex justify-center mt-2">
                                    <Button onClick={() => handlerShutdownConnection()} size="lg" className="w-full bg-red-800" >Desconectar</Button>
                                </div>
                            </div> :
                            <ConnectForm />
                    }
                    {/*
                    <div className='flex items-center justify-between gap-8'>
                        <div className='flex flex-col h-full w-full justify-between gap-4 '>
                            <h2 className='text-2xl font-bold'>{`Engines (${engs.length})`}</h2>
                            {engs?.length === 0 ?
                                <div className='h-full bg-[rgba(3,50,28,0.20)]'>
                                    <p className='my-4 max-w-[340px]'>
                                        No existen servidores de SQL Server para poder conectar
                                    </p>
                                </div> :
                                <div className='h-full bg-[rgba(3,50,28,0.20)]'>
                                    <ul className='mt-4 h-50 overflow-y-scroll'>
                                        {engs?.map((engi) => {
                                            return (
                                                <li key={engi.id}>
                                                    <button
                                                        className='flex w-full cursor-pointer items-center px-2 py-1 text-lg hover:bg-[rgba(255,255,255,0.075)]'
                                                        onClick={() => {
                                                            dispatch(setEngine(engi))
                                                            navigate(`/Inicio/${engi.id}`)
                                                        }}
                                                    >
                                                        <span className='ml-2 cursor-pointer text-center capitalize'>{engi.server} puerto: {engi.port}</span>
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            }
                            <div className='relative' ref={scope}>
                                <Icon
                                    icon='twemoji:ok-hand'
                                    width={45}
                                    id='ok'
                                    className='absolute right-7 top-0 opacity-0'
                                />
                            </div>
                            <Button onClick={() => {
                                navigate(`/Inicio/crear`)
                            }} style={{ filter: 'hue-rotate(-120deg)' }} className='items-center text-center justify-center '>
                                <Icon icon='mdi:plus' className='mr-3 h-6 w-6' />
                                {'SQL Server'}
                            </Button>
                        </div>
                        <div className='flex flex-col w-full gap-4'>
                            <Outlet />
                        </div>
                    </div>
                    */}
                </motion.section>
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.125 }}
                    className='grid h-[150px] w-full gap-4  border-b-[rgba(255,255,255,.125)] px-8 py-0'
                >
                    <p
                        className="flex justify-center gap-1 items-end font-sans"
                    >
                        <span className="text-[100px] text-cyan-500 font-bold leading-none">SQL</span><span>{' '}</span><span className="text-[75px] leading-[1.10em] tracking-[0.10em] font-thin">ServerCingo</span>
                    </p>
                </motion.section>
            </div>
        </Page.Root>
    )
}
