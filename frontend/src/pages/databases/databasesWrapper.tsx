import * as Page from '@/components/custom/page'
import { Icon } from '@iconify/react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { motion } from 'framer-motion'
// import React from 'react'
// import { ListGroup } from 'flowbite-react';
import { Outlet } from 'react-router-dom'
import { Button } from '@/components/custom/button'
import { model } from '@@/go/models'
import { DatabaseCreationForm } from './dbForm'
import { ListDB } from './ListDatabases'
// import { ListLogin } from './listLogins'
import React from 'react'
import { setLogin } from '@/store/slices/auth/auth.slice'
import { DbInfo } from './dbInfo'
import { LgForm } from './lgForm'
import { UserCreateForm } from './userForm'
export const DDBB = ["DBCENSO", "BDAEROPUERTO", "BDEvaluacion02", "BDPractica1"]
export const LLGG: model.Login[] = [
    {
        loginName: "sa",
        password: "",
        isSysAdmin: true
    },
    {
        loginName: "milo",
        password: "",
        isSysAdmin: false
    },
    {
        loginName: "inge",
        password: "",
        isSysAdmin: true
    },
    {
        loginName: "jorge",
        password: "",
        isSysAdmin: false
    },
    {
        loginName: "andres",
        password: "",
        isSysAdmin: true
    },
]
export function DatabasesWrapper() {
    const { database, dbs } = useAppSelector((state) => state.auth)
    // const { dbs } = useAppSelector((state) => state.database)
    // const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [createDb, setCreateDb] = React.useState(false)
    const closeForm = () => {
        setCreateDb(false)
    }
    // const getDatabases = async () => {
    //     try {
    //         const r = await GetDatabasesByEngineId(engineId as number)
    //         dispatch(setArrayDatabases(r))
    //     }catch(error){
    //         console.log(error)
    //     }
    // }
    return (
        <>
            <Page.Root>
                <Page.Header>
                    <Page.Title>{'Usuarios y bases de datos'}</Page.Title>
                </Page.Header>
                <div className='z-40 h-full w-full overflow-y-scroll'>
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.125 }}
                        className='grid w-full min-h-[400px] gap-4 border-b-[1px] border-solid border-b-[rgba(255,255,255,.125)] px-8 py-6 pb-2'
                    >
                        <div className='flex items-center justify-between gap-8'>
                            <div className='flex flex-col h-full w-[300px] justify-between gap-4 '>
                                {DDBB?.length === 0 ?
                                    <div className='h-full bg-[rgba(3,50,28,0.20)]'>
                                        <h2 className="text-xl text-center text-[#3DB8D5]">{`Bases de Datos (${dbs.length})`}</h2>
                                        <p className='my-4 max-w-[340px] pl-3'>
                                            No existen bases de datos disponibles
                                        </p>
                                    </div> :
                                    <div className='flex flex-col justify-between h-full rounded-[15px] bg-[rgba(3,5,19,0.2)]'>
                                        <h2 className="text-xl text-center text-[#3DB8D5]">{`Bases de Datos (${dbs.length})`}</h2>
                                        <ul className='mt-4 h-50 overflow-y-scroll'>
                                            {
                                                dbs.map((db) => {
                                                    return (
                                                        <ListDB key={db} value={db} selected={db === database} disabled={false} closeForm={closeForm} />
                                                    )
                                                })
                                            }
                                        </ul>
                                        <Button onClick={() => {
                                            setCreateDb(true)
                                            dispatch(setLogin(null))
                                        }} style={{ filter: 'hue-rotate(-120deg)' }} className='items-center text-center justify-center mx-2 mb-2 '>
                                            <Icon icon='mdi:plus' className='mr-3 h-6 w-6' />
                                            {'Añadir'}
                                        </Button>
                                    </div>
                                }
                            </div>
                            <div className='flex flex-col w-full h-full gap-4'>
                                {createDb ?
                                    <DatabaseCreationForm
                                        closeForm={closeForm}
                                    /> :
                                    <DbInfo />
                                }
                            </div>
                        </div>
                    </motion.section>
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.125 }}
                        className='grid w-full min-h-[400px] gap-4 border-b-[1px] border-solid border-b-[rgba(255,255,255,.125)] px-8 py-6 pb-2'
                    >

                        <div className='flex items-center justify-between gap-8'>
                            <div className='flex flex-col h-full w-[300px] justify-between gap-4 '>
                                {/*
                                <h2 className='text-2xl font-bold'>{`Logins (${LLGG?.length})`}</h2>
                                {LLGG?.length === 0 ?
                                    <div className='h-full rounded-[15px] bg-[rgba(3,50,28,0.20)]'>
                                        <p className='my-4 max-w-[340px] pl-3'>
                                            No hay logins creados
                                        </p>
                                    </div> :
                                    <div className='h-full rounded-[15px] bg-[rgba(3,50,28,0.20)]'>
                                        <ul className='mt-4 h-50 overflow-y-scroll'>
                                            {
                                                LLGG.map((lg) => {
                                                    return (
                                                        <ListLogin key={lg.loginName} value={lg} selected={lg.loginName === login} disabled={false} />
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                }
                                */}
                                <div className='h-full rounded-[15px] bg-[rgba(3,5,19,0.005)]'>
                                    <LgForm />
                                </div>

                            </div>
                            <div className='flex flex-col w-full h-full gap-4'>
                                <UserCreateForm />
                            </div>
                        </div>
                    </motion.section>
                </div>
                <Outlet />
            </Page.Root>
        </>
    )
}
