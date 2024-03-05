import React from 'react'
import { motion } from 'framer-motion'

import * as Page from '@/components/custom/page'


// import { model } from '@@/go/models'

import { Label, Select } from 'flowbite-react'
import { CreateTableForm } from './tbForm'

// import { ThemeSelect } from './theme-select'
// import { StatSelect } from './stat-select'

export const DDBB = ["DBCENSO", "BDAEROPUERTO", "BDEvaluacion02", "BDPractica1"]

export function OutputPage() {
    const [dbName, setDbName] = React.useState("")
    console.log(dbName)
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
                    className='grid w-full min-h-[250px] gap-4 border-b-[1px] border-solid border-b-[rgba(255,255,255,.125)] px-8 py-6 pb-2'
                >
                    <div className='flex items-center justify-between gap-8'>
                        <div className='flex flex-col h-full w-[300px] justify-between gap-4 '>
                            <div className='h-full  rounded-[15px]'>
                                <div className="mb-2 block">
                                    <Label htmlFor="databases" value="Seleccione Base de datos" className="cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white" color="gray" />
                                </div>
                                <Select id="databases" onChange={(e) => setDbName(e.target.value)} required >
                                    {DDBB.map((db) => {
                                        return (
                                            <option value={db}>{db}</option>
                                        )
                                    })}
                                </Select>

                            </div>
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
                </motion.section>
            </div>
        </Page.Root>
    )
}
