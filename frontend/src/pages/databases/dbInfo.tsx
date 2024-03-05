// import { Button } from '@/components/custom/button'
// import { BoxIcon, CheckboxIcon } from '@radix-ui/react-icons'
// import { Checkbox } from '@/components/custom/checkbox'
import * as Form from '@radix-ui/react-form'
import * as Collapsible from '@radix-ui/react-collapsible'
import { motion } from 'framer-motion'
import { Blockquote } from 'flowbite-react';
import React from 'react'
import { model } from '@@/go/models'
import { useAppSelector } from '@/store/hooks'
// import { createDatabase } from '@/store/slices/auth/auth.thunks'
import { GetDatabaseInfo } from '@@/go/core/CommandHandler';
import { useErrorPopup } from '@/app/error-popup';
const INFODDBB: model.DatabaseFileDetail[] = [
    {
        fileName: "C:/BDs/BdExample_data.fmd",
        logicalName: "BdExample_data",
        sizeMB: 5,
        maxSizeMB: 10
    },
    {
        fileName: "C:/BDs/BdExample_log.lmd",
        logicalName: "BdExample_log",
        sizeMB: 2,
        maxSizeMB: 10
    }
]
export function DbInfo() {
    const [fileDetail, setFileDetail] = React.useState<model.DatabaseFileDetail[]>([])
    const [isDefault, setIsDefault] = React.useState(true)
    // const [dbName, setDbName] = React.useState("")
    // const dispatch = useAppDispatch()
    const { database } = useAppSelector((state) => state.auth)
    const setError = useErrorPopup()
    // const handleCreateDatabaseForm = async () => {
    //     // const newDb={
    //     //     dbName,
    //     //     isDefault,
    //     //     dbFiles:[
    //     //         {
    //     //             logicalName: name,
    //     //             fileName,
    //     //             sizeMB:size,
    //     //             maxSizeMB: maxSize,
    //     //         },
    //     //         {
    //     //             logicalName: logName,
    //     //             fileName: logFileName,
    //     //             sizeMB: logSize,
    //     //             maxSizeMB: logMaxSize,
    //     //         }
    //     //     ]
    //     // } as model.CreateDatabase
    //     // dispatch(createDatabase(newDb))
    //     props.closeForm()
    // }

    React.useEffect(() => {
        if (database === null) return
        GetDatabaseInfo(database).then(setFileDetail).catch(setError)
        // GetThemes().then(setThemes).catch(setError)
    }, [database])
    console.log(fileDetail)
    return (
        <>
            {database === null ? <EmptyInfo /> :
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.125 }}
                    className='flex h-full w-full flex-col gap-5 justify-self-center overflow-x-visible overflow-y-scroll px-5 pb-4 pt-2  bg-[rgba(3,5,19,0.2)] rounded-[15px]'
                >
                    <Collapsible.Root className='flex flex-col h-full' open={isDefault} onOpenChange={setIsDefault}>
                        <h3 className='text-xl text-center  text-[#3DB8D5]'>{database ? database : "hola"}</h3>
                        <Form.Root
                            className='h-full flex flex-col justify-between'
                        >
                            <div
                                className='flex flex-row justify-between mt-5'
                            >
                            </div>
                            <Collapsible.Content
                                className='flex flex-col h-full justify-between mt-0'
                            >
                                <div
                                    className='flex flex-row h-full justify-between mt-1'
                                >
                                    <div className='flex flex-col w-full border-0  bg-transparent  pb-1 pr-0 pt-1 text-md text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'>
                                        <h3 className='text-md text-center  text-[#3DB8D5]'> Archivo data </h3>
                                        <div
                                            className='flex flex-row w-full pr-3 pb-1'
                                        >
                                            <div className="w-[62px] text-[11px] font-medium text-white align-text-bottom pt-2">NAME</div>
                                            <input
                                                className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-1 pb-1 pr-0 pt-1 text-sm text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                                type={'text'}
                                                readOnly
                                                value={INFODDBB[0].logicalName}
                                                placeholder={'BDProyecto_Data'}
                                                required
                                            />
                                        </div>
                                        <div
                                            className='flex flex-row w-full pr-3 pb-1'
                                        >
                                            <div className="w-[62px] text-[11px] font-medium text-white align-text-bottom pt-2">FILENAME</div>
                                            <input
                                                className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-1 pb-1 pr-0 pt-1 text-sm text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                                type={'text'}
                                                readOnly
                                                value={INFODDBB[0].fileName}
                                                required
                                            />
                                        </div>
                                        <div
                                            className='flex flex-row w-full pr-3 pb-1'
                                        >
                                            <div className="w-[62px] text-[11px] font-medium text-white align-text-bottom pt-2">SIZE</div>
                                            <input
                                                className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-1 pb-1 pr-0 pt-1 text-sm text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                                type={'number'}
                                                readOnly
                                                value={INFODDBB[0].sizeMB}
                                                required
                                            />
                                        </div>
                                        <div
                                            className='flex flex-row w-full pr-3 pb-1'
                                        >
                                            <div className="w-[62px] text-[11px] font-medium text-white align-text-bottom pt-2">MAXSIZE</div>
                                            <input
                                                className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-1 pb-1 pr-0 pt-1 text-sm text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                                type={'number'}
                                                readOnly
                                                value={INFODDBB[0].maxSizeMB}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-full border-0  bg-transparent  pb-1 pr-0 pt-1 text-md text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'>
                                        <h3 className='text-md text-center  text-[#3DB8D5]'> Archivo log </h3>
                                        <div
                                            className='flex flex-row w-full pr-0 pb-1'
                                        >
                                            <div className="w-[62px] text-[11px] font-medium text-white align-text-bottom pt-2">NAME</div>
                                            <input
                                                className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-1 pb-1 pr-0 pt-1 text-sm text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                                type={'text'}
                                                readOnly
                                                value={INFODDBB[1].logicalName}
                                            />
                                        </div>
                                        <div
                                            className='flex flex-row w-full pr-0 pb-1'
                                        >
                                            <div className="w-[62px] text-[11px] font-medium text-white align-text-bottom pt-2">FILENAME</div>
                                            <input
                                                className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-1 pb-1 pr-0 pt-1 text-sm text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                                type={'text'}
                                                readOnly
                                                value={INFODDBB[1].fileName}
                                            />
                                        </div>
                                        <div
                                            className='flex flex-row w-full pr-0 pb-1'
                                        >
                                            <div className="w-[62px] text-[11px] font-medium text-white align-text-bottom pt-2">SIZE</div>
                                            <input
                                                className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-1 pb-1 pr-0 pt-1 text-sm text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                                type={'number'}
                                                readOnly
                                                value={INFODDBB[1].sizeMB}
                                                required
                                            />
                                        </div>
                                        <div
                                            className='flex flex-row w-full pr-0 pb-1'
                                        >
                                            <div className="w-[62px] text-[11px] font-medium text-white align-text-bottom pt-2">MAXSIZE</div>
                                            <input
                                                className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-1 pb-1 pr-0 pt-1 text-sm text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                                type={'number'}
                                                readOnly
                                                value={INFODDBB[1].maxSizeMB}
                                                required
                                            />
                                        </div>
                                    </div>

                                </div>
                            </Collapsible.Content>
                            <Form.Submit asChild>
                            </Form.Submit>
                        </Form.Root>
                    </Collapsible.Root>
                </motion.div>
            }</>
    )
}

function EmptyInfo() {
    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.125 }}
            className='flex h-full w-full flex-col gap-5 justify-self-center overflow-x-visible overflow-y-scroll px-5 pb-4 pt-2  bg-[rgba(3,50,28,0.20)] rounded-[15px] justify-center'
        >
            <Blockquote className="text-white">
                "En este bloque podras visualizar la informacion basica de una Base de Datos para lo cual deberas seleccionar una de la lista de la izquierda. Tambien crear una nueva Base de Datos presionando en el boton "+ Añadir"."
            </Blockquote>
        </motion.div>
    )
}
                            // className="box-border w-full
                            // text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]"
                            // <input
                            //     className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-4 pb-3 pr-12 pt-0 text-md text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                            //     type={'text'}
                            //     placeholder={'BDProyecto'}
                            //     required
                            //
