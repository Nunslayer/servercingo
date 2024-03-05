import { Button } from '@/components/custom/button'
import { BoxIcon, CheckboxIcon } from '@radix-ui/react-icons'
// import { Checkbox } from '@/components/custom/checkbox'
import { Blockquote } from 'flowbite-react';
import * as Form from '@radix-ui/react-form'
import * as Collapsible from '@radix-ui/react-collapsible'
import { motion } from 'framer-motion'
import React from 'react'
import { model } from '@@/go/models'
import { useAppDispatch } from '@/store/hooks'
import { createDatabase } from '@/store/slices/auth/auth.thunks'
export function DatabaseCreationForm(props: {
    closeForm: () => void
}) {
    const [isDefault, setIsDefault] = React.useState(false)
    const [dbName, setDbName] = React.useState("")
    const [name, setName] = React.useState("")
    const [fileName, setFileName] = React.useState("")
    const [size, setSize] = React.useState(4)
    const [maxSize, setMaxSize] = React.useState(8)
    const [logName, setLogName] = React.useState("")
    const [logFileName, setLogFileName] = React.useState("")
    const [logSize, setLogSize] = React.useState(4)
    const [logMaxSize, setLogMaxSize] = React.useState(8)
    const dispatch = useAppDispatch()
    const handleCreateDatabaseForm = async () => {
        const newDb = {
            dbName,
            isDefault,
            dbFiles: [
                {
                    logicalName: name,
                    fileName,
                    sizeMB: size,
                    maxSizeMB: maxSize,
                },
                {
                    logicalName: logName,
                    fileName: logFileName,
                    sizeMB: logSize,
                    maxSizeMB: logMaxSize,
                }
            ]
        } as model.CreateDatabase
        dispatch(createDatabase(newDb))
        props.closeForm()
    }
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.125 }}
                className='flex h-full w-full flex-col gap-5 justify-self-center overflow-x-visible overflow-y-scroll px-5 pb-4 pt-2  bg-[rgba(3,5,19,0.2)] rounded-[15px]'
            >
                <Collapsible.Root className='flex flex-col h-full' open={isDefault} onOpenChange={setIsDefault}>
                    <h3 className='text-xl text-center  text-[#3DB8D5]'>Nueva Base de Datos</h3>
                    <Form.Root
                        className='h-full flex flex-col justify-between'
                    >
                        <div
                            className='flex flex-row justify-between mt-5'
                        >

                            <Form.Field className="grid mb-[7px]" name="nombre">
                                <div className="flex w-full items-baseline justify-between">
                                    <Form.Label className="text-[15px] font-medium leading-[10px] text-white">Nombre</Form.Label>
                                    <Form.Message className="text-[13px] text-red-400 opacity-[0.8]" match="valueMissing">
                                        Por favor ingresa un nombre
                                    </Form.Message>
                                </div>
                                <Form.Control asChild>
                                    <input
                                        className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-4 pb-1 pr-0 pt-2 text-md text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                        type={'text'}
                                        placeholder={'Ej: BDProyecto'}
                                        value={dbName}
                                        onChange={(e) => setDbName(e.target.value)}
                                        required
                                    />
                                </Form.Control>
                            </Form.Field>

                            <div className='grib mb-[7px]'>
                                <div className="flex w-full items-baseline justify-between">

                                    <div className="text-[15px] font-medium leading-[10px] text-white">Configuracion</div>
                                </div>
                                <div
                                    className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-4 pb-1 pr-14 pt-2 text-md text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparen'
                                // style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                >
                                    <span className="text-white text-[15px] leading-[25px]" style={{ color: 'white' }}>
                                        Predeterminado
                                    </span>
                                    <Collapsible.Trigger asChild>
                                        <button
                                            className="h-[30px] w-[30px] inline-flex items-center px-0 py-0 justify-center text-white-900 text-xl outline-none data-[state=closed]:bg-transparent data-[state=open]:bg-transparent "
                                        >
                                            {isDefault ? <BoxIcon /> : <CheckboxIcon />}
                                        </button>
                                    </Collapsible.Trigger>
                                </div>
                            </div>
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
                                            value={name}
                                            placeholder={'BDProyecto_Data'}
                                            onChange={(e) => setName(e.target.value)}
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
                                            value={fileName}
                                            placeholder={`C:/BDs/BDProyecto_Data.fmd`}
                                            onChange={(e) => setFileName(e.target.value)}
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
                                            value={size}
                                            defaultValue={size}
                                            onChange={(e) => setSize(Number(e.target.value))}
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
                                            value={maxSize}
                                            defaultValue={maxSize}
                                            onChange={(e) => setMaxSize(Number(e.target.value))}
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
                                            placeholder={'BDProyecto_Log'}
                                            value={logName}
                                            onChange={(e) => setLogName(e.target.value)}
                                        />
                                    </div>
                                    <div
                                        className='flex flex-row w-full pr-0 pb-1'
                                    >
                                        <div className="w-[62px] text-[11px] font-medium text-white align-text-bottom pt-2">FILENAME</div>
                                        <input
                                            className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-1 pb-1 pr-0 pt-1 text-sm text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                            type={'text'}
                                            placeholder={`C:/BDs/BDProyecto_Log.lmd`}
                                            value={logFileName}
                                            onChange={(e) => setLogFileName(e.target.value)}
                                        />
                                    </div>
                                    <div
                                        className='flex flex-row w-full pr-0 pb-1'
                                    >
                                        <div className="w-[62px] text-[11px] font-medium text-white align-text-bottom pt-2">SIZE</div>
                                        <input
                                            className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-1 pb-1 pr-0 pt-1 text-sm text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                            type={'number'}
                                            defaultValue={logSize}
                                            value={logSize}
                                            onChange={(e) => setLogSize(Number(e.target.value))}
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
                                            defaultValue={logMaxSize}
                                            value={logMaxSize}
                                            onChange={(e) => setLogMaxSize(Number(e.target.value))}
                                            required
                                        />
                                    </div>
                                </div>

                            </div>
                        </Collapsible.Content>

                        {
                            !isDefault ? <Blockquote className="pb-5 text-gray-400 text-light">
                                Recomendamos optar por una configuracion personalizada para poder decidir el destino de los archivos ROWS y LOG de de la Base de Datos, asi como personalizar el nombre y espacio.
                            </Blockquote>
                                : null
                        }
                        <Form.Submit asChild>
                            <Button type='button' style={{ filter: 'hue-rotate(-120deg)' }} className='items-center text-center justify-center w-[50%] mx-auto' onClick={() => handleCreateDatabaseForm()}>
                                {'Crear'}
                            </Button>
                        </Form.Submit>
                    </Form.Root>
                </Collapsible.Root>
            </motion.div>
        </>
    )
}

                            // className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]"
                            // <input
                            //     className='block w-full border-0 border-b-2 border-b-[rgba(255,255,255,0.275)] bg-transparent px-4 pb-3 pr-12 pt-0 text-md text-gray-300 outline-none transi




