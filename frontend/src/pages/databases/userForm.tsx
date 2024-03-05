import { Button } from '@/components/custom/button'
// import { BoxIcon, CheckboxIcon } from '@radix-ui/react-icons'
// import { Checkbox } from '@/components/custom/checkbox'
import {  Label, Select, TextInput } from 'flowbite-react';
import * as Form from '@radix-ui/react-form'
import * as Collapsible from '@radix-ui/react-collapsible'
import { motion } from 'framer-motion'
import React from 'react'
import { model } from '@@/go/models'
import { useAppDispatch } from '@/store/hooks'
// import { createDatabase } from '@/store/slices/auth/auth.thunks'
import { RoleSelect } from './roleSelect';
import { createUserForLogin } from '@/store/slices/auth/auth.thunks';
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
export type RolesAvailable = Record<string, boolean>

const defaultRoles: RolesAvailable = {
    db_owner: false,
    db_securityadmin: false,
    db_accessadmin: false,
    db_backupoperator: false,
    db_ddladmin:false,
    db_datawriter:true,
    db_datareader:true,
    db_denydatawriter:false,
    db_denydatareader:false
}
export function UserCreateForm() {
    const [isDefault, setIsDefault] = React.useState(false)
    const [roles, setRoles] = React.useState(defaultRoles)
    const [dbName, setDbName] = React.useState("")
    const [name, setName] = React.useState("")
    const [loginName, setLoginName] = React.useState("")
    const dispatch = useAppDispatch()
    console.log(loginName)
    const handleCreateDatabaseForm = async () => {
        const newRoles:string[]=[]
        for (const [key,value]of Object.entries(roles)){
            if(value === true) {
                newRoles.push(key)
            }
        }
        const newUser:model.CreateUserForLogin={
            dbName,
            userName:name,
            loginName,
            roles:newRoles,
        }
        dispatch(createUserForLogin(newUser))
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
                    <h3 className='text-xl text-center  text-[#3DB8D5]'>Crear User y Roles</h3>
                    <Form.Root
                        className='h-full flex flex-col justify-between'
                    >
                        <div
                            className='flex flex-row justify-between mt-5'
                        >

                            <div className='grib mb-[7px]'>
                                <div className=" text-gray">
                                    <div className="mb-2 block">
                                        <Label htmlFor="server" value="Nombre del User" className="cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white" color="gray" />
                                    </div>
                                    <TextInput
                                        id="server"
                                        placeholder="estudiante"
                                        value={name}
                                        // icon={HiUser}
                                        color="gray"
                                        onChange={(event) => setName(event.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="databases" value="Base de Datos" className="cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white" color="gray" />
                                    </div>
                                    <Select id="databases" onChange={(e)=>setDbName(e.target.value) } required>
                                    {DDBB.map((db)=>{
                                        return(
                                        <option value={db}>{db}</option>
                                        )
                                        })}
                                    </Select>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="logins" value="Login" className="cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white" color="gray" />
                                    </div>
                                    <Select id="logins" onChange={(e)=>setLoginName(e.target.value) } required>
                                    {LLGG.map((lg)=>{
                                        return(
                                        <option key={lg.loginName}value={lg.loginName}>{lg.loginName}</option>
                                        )
                                        })}
                                    </Select>
                                </div>
                            </div>

                            <div className='grib mb-[7px]'>
                                <div className="flex w-full items-baseline justify-between">

                                    <div className="text-[15px] font-medium leading-[10px] text-white">Roles</div>
                                </div>
                                <div
                                    className='block w-full border-0  bg-transparent px-4 pb-1 pr-14 pt-2 text-md text-gray-300 outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparen'
                                // style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                >
                                <RoleSelect
                                    roles={roles}
                                    onSelect={(opt,checked) => setRoles({ ...roles, [opt]:checked})}
                                />
                                </div>
                            </div>
                        </div>

                        <Form.Submit asChild>
                            <Button type='button' style={{ filter: 'hue-rotate(-120deg)' }} className='items-center text-center justify-center w-[50%] mx-auto' onClick={() => handleCreateDatabaseForm()}>
                                {'Crear User'}
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




