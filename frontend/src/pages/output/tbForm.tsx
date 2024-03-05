import { model } from '@@/go/models';
import { Button, Checkbox, Label, Modal, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';

export const DDBB = ["DBCENSO", "BDAEROPUERTO", "BDEvaluacion02", "BDPractica1"]
export function CreateTableForm() {
    const [openModal, setOpenModal] = useState(false);
    const [dbName, setDbName] = useState('');
    const [tableName, setTableName] = useState('');
    model.CreateTable
    model.TableColumn
    console.log(dbName)
    function onCloseModal() {
        setOpenModal(false);
    }

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Crear Tabla</Button>
            <Modal show={openModal} size="3xl" onClose={onCloseModal} popup className="bg-[rgba(255,255,255,.075)]">
                <Modal.Header className='h-full bg-[rgba(10,65,116,0.8)]' />
                <Modal.Body className='h-full bg-[rgba(10,65,116,0.8)]'>
                    <div className="space-y-6 ">

                        <div
                            className='flex flex-row justify-between mt-5'
                        >
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="databases" value="Seleccione Base de datos" className="cursor-pointer text-md text-white transition-colors group-hover:text-white" color="gray" />
                                </div>
                                <Select id="databases" onChange={(e) => setDbName(e.target.value)} required >
                                    {DDBB.map((db) => {
                                        return (
                                            <option value={db}>{db}</option>
                                        )
                                    })}
                                </Select>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="tableName" value="Nombre de la tabla" className="cursor-pointer text-md text-white transition-colors group-hover:text-white" color="gray" />
                                </div>
                                <TextInput
                                    id="tableName"
                                    placeholder="Ej. Materias"
                                    value={tableName}
                                    // icon={HiUser}
                                    color="gray"
                                    onChange={(event) => setTableName(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                            <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                                Lost Password?
                            </a>
                        </div>
                        <div className="w-full">
                            <Button>Log in to your account</Button>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?&nbsp;
                            <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                                Create account
                            </a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
