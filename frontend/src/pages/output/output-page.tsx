import React from 'react'
import { motion } from 'framer-motion'
import * as Page from '@/components/custom/page'
import { Button, Label, Select } from 'flowbite-react'
import { CreateTableForm } from './tbForm'
import { RowDisplay } from './tableCast'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setIsLoading, setTable } from '@/store/slices/auth/auth.slice'
import { GetAllFromTable, GetTablesByDatabase, InsertN, InsertNCrypto } from '@@/go/core/CommandHandler'
import { cn } from '@/lib/utils'
import { model } from '@@/go/models'

export const DDBB = ["DBCENSO", "BDAEROPUERTO", "BDEvaluacion02", "BDPractica1"]

export function OutputPage() {
    const [dbName, setDbName] = React.useState("")
    const [tbs, setTbs] = React.useState<string[]>([])
    const [num, setNum] = React.useState(0)
    const [numCrypto, setNumCrypto] = React.useState(0)
    const [data, setData] = React.useState<model.RowTable[]>([])
    const { dbs, table } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    console.log(dbName)
    const handleGetAllFromTable = async () => {
        if (table === null) return
        try {
            const ga: model.GetAll = {
                dbName,
                tableName: table
            } as model.GetAll
            dispatch(setIsLoading(true))
            const res = await GetAllFromTable(ga)
            setData(res)
            dispatch(setIsLoading(false))
        } catch (error) {
            console.log(error)
            dispatch(setIsLoading(false))
        }
    }
    const handleInsertCrypto=async()=>{
        try {
            dispatch(setIsLoading(true))
            await InsertNCrypto(numCrypto)
            dispatch(setIsLoading(false))
        } catch (error) {
            console.log(error)
            dispatch(setIsLoading(false))
        }
    }
    const handleInsert=async()=>{
        try {
            dispatch(setIsLoading(true))
            await InsertN(num)
            dispatch(setIsLoading(false))
        } catch (error) {
            console.log(error)
            dispatch(setIsLoading(false))
        }
    }
    React.useEffect(() => {
        ; (async function () {
            if (dbName != "") {
                try {
                    dispatch(setIsLoading(true))
                    const res = await GetTablesByDatabase(dbName)
                    setTbs(res)
                    dispatch(setIsLoading(false))
                } catch (error) {
                    console.log(error)
                    dispatch(setIsLoading(false))
                }

            }
        })()
    }, [dbName])
    React.useEffect(() => {
        dispatch(setTable(null))
    }, [])
    return (
        <Page.Root>
            <Page.Header>
                <Page.Title>{'TABLAS'} </Page.Title>

                <CreateTableForm />
            </Page.Header>

            <div className='z-40 h-full w-full overflow-y-scroll'>
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.125 }}
                    className='flex flex-row justify-between w-full min-h-[250px] gap-4 border-b-[1px] border-solid border-b-[rgba(255,255,255,.125)] px-8 py-6 pb-2 overflow-y-scroll'
                >
                    <div className='flex items-center justify-between gap-8'>
                        <div className='flex flex-col h-full w-[300px] justify-between gap-4 '>
                            <div className='h-full  rounded-[15px]'>
                                <div className="mb-2 block">
                                    <Label htmlFor="databases" value="Seleccione Base de datos" className="cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white" color="gray" />
                                </div>
                                <Select
                                    id="databases"
                                    onChange={(e) => {
                                        setDbName(e.target.value)
                                        dispatch(setTable(null))
                                    }}
                                    sizing="sm"
                                    required
                                >
                                    {dbs.map((db) => {
                                        return (
                                            <option value={db}>{db}</option>
                                        )
                                    })}
                                </Select>
                                <ul>

                                    {tbs?.map((m) => {
                                        return (
                                            <ListTable key={m} value={m} selected={m === table} />
                                        )
                                    })}
                                </ul>
                            </div>

                        </div>
                        <div className='flex flex-col gap-4'>

                        </div>
                    </div>
                    {
                        table !== null ?
                            <div className='flex items-top justify-top gap-8'>
                                {table}
                                <Button
                                    onClick={() => handleGetAllFromTable()}
                                    size="sm"
                                    className='h-[40px]'
                                >
                                    Traer todo
                                </Button>
                                {
                                    table === "PFALUMNOS" ? (
                                        <>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="num" value="Cantidad" className="cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white" color="gray" />
                                            </div>
                                            <input
                                                id='num'
                                                className='block w-full border-0 bg-transparent px-0 pb-0 pr-0 pt-0 text-sm text-center outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                                type={'number'}
                                                value={num}
                                                onChange={(e) => setNum(Number(e.target.value))}
                                            />
                                            <Button
                                                onClick={() => handleInsert()}
                                                size="sm"
                                                className='h-[40px]'
                                            >
                                                + 200
                                            </Button>
                                        </div>
                                        <div>
                                        <div className="mb-2 block">
                                                <Label htmlFor="num" value="Cantidad" className="cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white" color="gray" />
                                            </div>
                                            <input
                                                id='num'
                                                className='block w-full border-0 bg-transparent px-0 pb-0 pr-0 pt-0 text-sm text-center outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                                type={'number'}
                                                value={numCrypto}
                                                onChange={(e) => setNumCrypto(Number(e.target.value))}
                                            />
                                            <Button
                                                onClick={() => handleInsertCrypto()}
                                                size="sm"
                                                className='h-[40px]'
                                            >
                                                + 200 encriptados
                                            </Button>
                                        </div>
                                            
                                            
                                            <Button
                                                onClick={() => handleGetAllFromTable()}
                                                size="sm"
                                                className='h-[40px]'
                                            >
                                                Dañar
                                            </Button>
                                        </>
                                    ) : null
                                }
                            </div> : null
                    }
                </motion.section>
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.125 }}
                    className='flex flex-col w-full items-center justify-between gap-8 px-8 py-6'
                >
                    <RowDisplay data={data} />
                </motion.section>
            </div>
        </Page.Root>
    )
}

function ListTable(
    props: {
        value: string
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
            onClick={() => dispatch(setTable(props.value))}
        >
            <div className='flex items-center justify-between'>
                <span>{props.value}</span>
            </div>
        </li>
    )
}
