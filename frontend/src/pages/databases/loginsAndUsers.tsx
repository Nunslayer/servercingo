import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Button } from '@/components/custom/button'
export function LoginsAndUsers() {
    return (
        <div className='z-40 h-full w-full overflow-y-scroll'>
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.125 }}
                className='grid w-full gap-4 border-b-[1px] border-solid border-b-[rgba(255,255,255,.125)] px-8 py-6'
            >
                <div className='flex items-center justify-between gap-8'>
                    <div>
                        <h2 className='text-2xl font-bold'>{'Lista de logins y usuarios'}</h2>
                        <p className='my-4 max-w-[340px]'>
                            Ui para manejar Logins y Usuarios dependiendo de los roles del login logeado
                            <i className='whitespace-nowrap'>SOLO USUARIOS SA TIENEN SYSADMIN</i>.Crear UI.
                        </p>
                        <div className='relative'>
                            <Icon
                                icon='twemoji:ok-hand'
                                width={45}
                                id='ok'
                                className='absolute right-7 top-0 opacity-0'
                            />
                        </div>
                        <Button onClick={() => console.log("copy")} style={{ filter: 'hue-rotate(-120deg)' }}>
                            <Icon icon='mdi:people' className='mr-3 h-6 w-6' />
                            {'copyBrowserSourceLink'}
                        </Button>
                    </div>
                    <div className='flex flex-col gap-4'>
                    </div>
                </div>
            </motion.section>
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.125 }}
                className='flex w-full items-center justify-between gap-8 px-8 py-6'
            >
                <header>
                    <h2 className='text-xl font-bold'>{'importFiles'}</h2>
                    <p className='mt-2 max-w-[420px]'>
                        If you want to customize through OBS, you can use
                        <i>Text Labels</i> and add the text files in the results folder as sources
                    </p>
                </header>
                <Button
                    onClick={() => console.log('open results directory')}
                    style={{ filter: 'hue-rotate(-120deg)' }}
                    className='mx-auto'
                >
                    <Icon icon='fa6-solid:folder-open' className='mr-3 h-6 w-6' />
                    {'files'}
                </Button>
            </motion.section>
        </div>
    )
}
