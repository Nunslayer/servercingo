import { Button } from '@/components/custom/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setArrayDatabases } from '@/store/slices/databases/databases.slice'
import { setConnectedStatus } from '@/store/slices/engines/engines.slice'
import { setArrayLogins, setLogin } from '@/store/slices/logins/logins.slice'
import { GetDatabasesByEngineId } from '@@/go/core/CommandHandler'
import { model } from '@@/go/models'
import { motion } from 'framer-motion'
import React, { ChangeEvent } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
export function LoginEngineForm() {
    const users = (useLoaderData() ?? []) as model.User[]
    const navigate = useNavigate()
    const [passwordInput, setPasswordInput] = React.useState("")
    // const [nameInput, setNameInput] = React.useState("")
    const [loginSelect, setLoginSelect] = React.useState(users[0].id)
    const { id, name, port } = useAppSelector((state) => state.engine)
    const { loginId } = useAppSelector((state) => state.login)
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        dispatch(setArrayLogins(users))
    }, [])
    async function connectEngine() {
        try {
            console.log(loginId)
            // await SelectEngine(id as number, loginName as string, passwordInput)
            dispatch(setConnectedStatus(true))
            const r = await GetDatabasesByEngineId(id as number)
            dispatch(setArrayDatabases(r))
            navigate('/Databases')

        } catch (error) {
            console.log(error)
        }
    }
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const log = users.find((a) => a.id == Number(e.target.value))
        log ? dispatch(setLogin(log)) : console.log(log)
        setLoginSelect(Number(e.target.value))
    }
    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.125 }}
            className='relative flex h-full w-full flex-col gap-5 justify-self-center overflow-x-visible overflow-y-scroll px-5 pb-4 pt-2  bg-[rgba(3,50,28,0.20)]'
        >
            <h3 className='text-xl text-center mb-0 pb-0 text-[#3DB8D5]'>Conectar Engine SQL Server</h3>
            <h5 className='h-1 text-sm text-center mt-0 pt-0 text-gray-300 '>{name}:{port}</h5>
            <div className='relative'>

                <label
                    htmlFor="login"
                    className='cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white mb-1'
                >
                    Seleccione un usuario
                </label>
                <select
                    id="login"
                    value={loginSelect}
                    onChange={handleSelectChange}
                    className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-4 pb-3 pr-12 pt-0 text-lg text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                >
                    {users.map((us) => {
                        return (
                            <option key={us.id} value={us.id}> {us.name} </option>
                        )
                    })}
                </select>
                <label
                    htmlFor="login-pass"
                    className='cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white mb-1'
                >
                    Contraseña
                </label>
                <input
                    id="login-pass"
                    type="password"
                    onChange={e => setPasswordInput(e.target.value)}
                    placeholder={'Ingresa tu contraseña'}
                    className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-4 pb-3 pr-12 pt-0 text-lg text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                    value={passwordInput}
                />
            </div>
            <Button type='button' onClick={() => connectEngine()} style={{ filter: 'hue-rotate(-65deg)' }} className='items-center w-full text-center justify-center'>
                {'Conectar'}
            </Button>
        </motion.form>
    )
}
