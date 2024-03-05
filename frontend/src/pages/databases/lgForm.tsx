import { useAppDispatch } from "@/store/hooks";
import { createLogin } from "@/store/slices/auth/auth.thunks";
import { model } from "@@/go/models";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React from "react";
import { HiUser, HiEyeOff } from 'react-icons/hi';

export function LgForm() {
    const [name, setName] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [isSysAdmin, setIsSysAdmin] = React.useState(true)
    const dispatch = useAppDispatch()
    const handleCreateLogin = async () => {
        const newLogin = {
            loginName: name,
            password: pass,
            isSysAdmin,
        } as model.Login
        dispatch(createLogin(newLogin))
    }
    return (
        <div className='h-full rounded-[15px] bg-[rgba(3,5,19,0.2)]'>
            <div
                className="relative flex h-full w-full rounded-[15px] max-w-[400px] flex-col gap-5 justify-self-center overflow-x-visible overflow-y-scroll px-5 pb-4 pt-2  bg-[rgba(3,5,19,0.2)] shadow-xl"
            >
                <h2 className="text-xl text-center text-[#3DB8D5]">Crear Login</h2>
                <div className=" text-gray">
                    <div className="mb-2 block">
                        <Label htmlFor="server" value="Nombre" className="cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white" color="gray" />
                    </div>
                    <TextInput
                        id="server"
                        placeholder="actividad4"
                        value={name}
                        icon={HiUser}
                        color="gray"
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Contraseña" className="cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white" />
                    </div>
                    <TextInput id="password" type="password" required icon={HiEyeOff} value={pass} onChange={(event) => setPass(event.target.value)} />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="sysAdmin" checked={isSysAdmin} onChange={() => setIsSysAdmin(!isSysAdmin)} />
                    <Label htmlFor="sysAdmin" className="text-white">sysAdmin</Label>
                </div>
                <div className="w-full flex justify-center">
                    <Button onClick={() => handleCreateLogin()} size="lg" className="w-full">Crear</Button>
                </div>
            </div>
        </div>
    )
}
