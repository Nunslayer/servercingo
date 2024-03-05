import { useAppDispatch } from '@/store/hooks';
import { connectEngine } from '@/store/slices/auth/auth.thunks';
import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { HiServer, HiEyeOff, HiTerminal,HiUser } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
export function ConnectForm() {
    const [server, setServer] = useState('localhost');
    const [port, setPort] = useState(1433);
    const [login, setLogin] = useState('sa');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleConnectEngine=async()=>{
         dispatch(connectEngine(server,login,password,port))
        navigate(`/Databases`)
    }

    return (
        <div
            className="relative flex h-full w-full rounded-[15px] max-w-[400px] flex-col gap-5 justify-self-center overflow-x-visible overflow-y-scroll px-5 pb-4 pt-2  bg-[rgba(3,5,19,0.2)] shadow-xl"
        >
            <h2 className="text-xl text-center text-[#3DB8D5]">LOGIN</h2>
            <div className=" text-gray">
                <div className="mb-2 block">
                    <Label htmlFor="server" value="Servidor/Host" className="cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white" color="gray" />
                </div>
                <TextInput
                    id="server"
                    placeholder="localhost"
                    value={server}
                    icon={HiServer}
                    color="gray"
                    onChange={(event) => setServer(event.target.value)}
                    required
                />
            </div>
            <div className="flex justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="port" value="Puerto" className="cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white"/>
                    <TextInput id="port" type="number" required icon={HiTerminal} value={port} onChange={(event) => setPort(Number(event.target.value))} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="login" value="Login" className="cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white"/>
                    <TextInput id="login" required value={login}  icon={HiUser} onChange={(event) => setLogin(event.target.value)} />
                </div>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="Contraseña" className="cursor-pointer text-md text-gray-300 transition-colors group-hover:text-white"/>
                </div>
                <TextInput id="password" type="password" required icon={HiEyeOff} value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className="w-full flex justify-center">
                <Button onClick={() => handleConnectEngine()} size="lg" className="w-full">Conectar</Button>
            </div>
        </div>
    );
}
