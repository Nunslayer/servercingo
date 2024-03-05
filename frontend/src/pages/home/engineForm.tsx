import { Button } from '@/components/custom/button'
import { useAppDispatch } from '@/store/hooks'
import { setArrayEngines } from '@/store/slices/engines/engines.slice'
import { GetEngines, SaveEngine } from '@@/go/core/CommandHandler'
import { motion } from 'framer-motion'
import React from 'react'
export function CreateEngineForm() {
    const dispatch = useAppDispatch()
    const [serverInput, setServerInput] = React.useState("")
    const [portInput, setPortInput] = React.useState(1433)
    const [passwordInput, setPasswordInput] = React.useState("")
    const [nameInput, setNameInput] = React.useState("sa")
    function clearForm() {
        setPasswordInput("")
        setServerInput("")
        setPortInput(1433)
        setNameInput("sa")
    }
    async function onSubmit() {
        try {

            const res = await SaveEngine(serverInput, nameInput, passwordInput, portInput)
            console.log(res)
            const res1 = await GetEngines()
            dispatch(setArrayEngines(res1))
            clearForm()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.125 }}
            className='relative flex h-full w-full flex-col gap-5 justify-self-center overflow-x-visible overflow-y-scroll px-5 pb-4 pt-2  bg-[rgba(3,50,28,0.20)]'
        >
            <h3 className='text-xl text-center  text-[#3DB8D5]'>Registrar Engine SQL Server</h3>
            <div className='relative'>
                <label
                    htmlFor="server-name"
                    className='cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white mb-1'
                >
                    Nombre del host
                </label>
                <input
                    id="server-name"
                    type="text"
                    onChange={e => setServerInput(e.target.value)}
                    placeholder={'localhost'}
                    className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-4 pb-3 pr-12 pt-0 text-lg text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                    value={serverInput}
                />
                <label
                    htmlFor="port"
                    className='cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white mb-1'
                >
                    Puerto del host
                </label>
                <input
                    id="port"
                    type="text"
                    onChange={e => setPortInput(Number(e.target.value))}
                    placeholder={'1433'}
                    className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-4 pb-3 pr-12 pt-0 text-lg text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                    value={portInput}
                />
                <label
                    htmlFor="user-name"
                    className='cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white mb-1'
                >
                    Nombre del usuario
                </label>
                <input
                    id="user-name"
                    type="text"
                    onChange={e => setNameInput(e.target.value)}
                    placeholder={'input your name'}
                    className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-4 pb-3 pr-12 pt-0 text-lg text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                    value={nameInput}
                    readOnly={true}
                />
                <label
                    htmlFor="pass"
                    className='cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white mb-1'
                >
                    Contraseña
                </label>
                <input
                    id="pass"
                    type="password"
                    onChange={e => setPasswordInput(e.target.value)}
                    placeholder={'input your password'}
                    className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-4 pb-3 pr-12 pt-0 text-lg text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                    value={passwordInput}
                />
            </div>
            <Button type='button' onClick={() => onSubmit()} style={{ filter: 'hue-rotate(-120deg)' }} className='items-center text-center justify-center w-full'>
                {'Registrar'}
            </Button>
        </motion.form>
    )
}
