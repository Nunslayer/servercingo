import { useAppDispatch } from '@/store/hooks';
import { setIsLoading } from '@/store/slices/auth/auth.slice';
import { CreateTable } from '@@/go/core/CommandHandler';
import { model } from '@@/go/models';
import { Button, Checkbox, Label, Modal, Select, Table, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { HiPlus, HiTrash } from 'react-icons/hi';

export const DDBB = ["DBCENSO", "BDAEROPUERTO", "BDEvaluacion02", "BDPractica1"]
export const TYPESCOL = ["VARCHAR", "NVARCHAR", "INT", "BIGINT", "DATE", "BOOLEAN"]
export function CreateTableForm() {
    const [columns, setColumns] = React.useState<model.TableColumnReq[]>([])
    const [openModal, setOpenModal] = useState(false);
    const [dbName, setDbName] = useState('');
    const [tableName, setTableName] = useState('');
    const dispatch = useAppDispatch()
    const addColumn = () => {
        const newColumn: model.TableColumnReq = {
            columnName: '',
            dataType: '',
            maxLength: null,
            isNullable: 'YES',
            defaultValue: null,
            isIdentity: 'No',
            isPrimaryKey: 'No'
        } as model.TableColumn
        setColumns([...columns, newColumn])
    }
    const handlerChangeColumn = (i: number, field: keyof model.TableColumnReq, v: string | number | null) => {
        const nCs = [...columns]
        nCs[i][field] = v
        setColumns(nCs)
    }
    function onCloseModal() {
        setColumns([])
        setOpenModal(false);
    }

    const handleCreateTable = async () => {
        dispatch(setIsLoading(true))
        try {
            const newTable: model.CreateTableReq = {
                dbName,
                tableName,
                columns: columns,
            } as model.CreateTableReq
            await CreateTable(newTable)
            dispatch(setIsLoading(false))
            setColumns([])
            setOpenModal(false)
        } catch (error) {
            console.log(error)
            dispatch(setIsLoading(false))

        }
    }
    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Crear Tabla</Button>
            <Modal show={openModal} size="4xl" onClose={onCloseModal} popup >
                <Modal.Header className='h-full bg-cyan-900' />
                <Modal.Body className='h-full bg-cyan-900'>
                    <div className="space-y-2 ">

                        <div
                            className='flex flex-row justify-between mt-0'
                        >
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="databases" value="Seleccione Base de datos" className="cursor-pointer text-md text-white transition-colors group-hover:text-white" color="gray" />
                                </div>
                                <Select id="databases" sizing="sm" onChange={(e) => setDbName(e.target.value)} required >
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
                                    sizing="sm"
                                    // icon={HiUser}
                                    color="gray"
                                    onChange={(event) => setTableName(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-row justify-between gap-2">

                                <Button size="md" onClick={() => addColumn()} className="h-[3em] "><HiPlus className="text-white text-[18px]" /></Button>
                                <Button size="md" onClick={() => setColumns([])} className="h-[3em] bg-red-500"><HiTrash className="text-red-800 text-[18px]" /></Button>
                            </div>
                        </div>
                        <div className="h-[300px] overflow-x-auto bg-gray-300 rounded-[12px]">
                            <Table className="bg-transparent">
                                <Table.Head className="bg-[rgba(3,5,19,0.9)]">
                                    <Table.HeadCell className="bg-transparent text-cyan-400 text-md w-[18px] max-w-[20px]">{"º"}</Table.HeadCell>
                                    <Table.HeadCell className="bg-transparent text-cyan-400 text-center text-[14px]">Nombre</Table.HeadCell>
                                    <Table.HeadCell className="bg-transparent text-cyan-400 text-center text-[14px]">Tipo</Table.HeadCell>
                                    <Table.HeadCell className="bg-transparent text-cyan-400 text-center text-[14px]">Max</Table.HeadCell>
                                    <Table.HeadCell className="bg-transparent text-cyan-400 text-center text-[14px]">Nulo</Table.HeadCell>
                                    <Table.HeadCell className="bg-transparent text-cyan-400 text-center text-[14px]">Default</Table.HeadCell>
                                    <Table.HeadCell className="bg-transparent text-cyan-400 text-center text-[14px]">P.K.</Table.HeadCell>
                                    <Table.HeadCell className="bg-transparent text-cyan-400 text-center text-[14px]">Identidad</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {
                                        columns.map((c, i) => {
                                            return (

                                                <Table.Row key={i} className="bg-cyan-700 dark:border-gray-700 px-0 py-0">
                                                    <Table.Cell className="max-w-[20px] px-0 py-0 font-sm text-[12px] text-white text-center dark:text-white overflow-x-scroll border-solid border-r-2 border-r-[rgba(255,255,255,0.275)]">
                                                        {i + 1}
                                                    </Table.Cell>
                                                    <Table.Cell className="max-w-[150px] px-0 py-0 font-sm text-[12px] text-white text-center dark:text-white overflow-x-scroll border-solid border-r-2 border-r-[rgba(255,255,255,0.275)]">
                                                        <input
                                                            className='block w-full border-0 bg-transparent px-0 pb-0 pr-0 pt-0 text-sm text-center outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                                            type={'text'}
                                                            value={c.columnName}
                                                            onChange={(e) => handlerChangeColumn(i, "columnName", e.target.value)}
                                                            required
                                                        />
                                                    </Table.Cell>
                                                    <Table.Cell className="max-w-[120px] px-0 py-0 font-sm text-[12px] text-white text-center dark:text-white overflow-x-scroll border-solid border-r-2 border-r-[rgba(255,255,255,0.275)]">
                                                        <select
                                                            onChange={(e) => {
                                                                if (e.target.value === "INT" || e.target.value === "BIGINT" || e.target.value === "DATE" || e.target.value === "BOOLEAN") handlerChangeColumn(i, "maxLength", null)
                                                                handlerChangeColumn(i, "dataType", e.target.value)
                                                            }}
                                                            className="bg-transparent outline-none border-0 text-white text-center h-[16px] mx-1 my-0 px-0 py-0 text-[12px]"
                                                            required
                                                        >
                                                            {TYPESCOL.map((tp, i) => {
                                                                return (
                                                                    <option key={tp + i} value={tp}>{tp}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </Table.Cell>
                                                    <Table.Cell className="max-w-[40px] px-0 py-0 font-sm text-[12px] text-white dark:text-white overflow-x-scroll border-solid border-r-2 border-r-[rgba(255,255,255,0.275)]">
                                                        <input
                                                            className='block w-full border-0 bg-transparent px-0 pb-0 pr-0 pt-0 text-sm text-center outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                                            type={'number'}
                                                            value={c.maxLength}
                                                            onChange={(e) => handlerChangeColumn(i, "maxLength", Number(e.target.value))}
                                                            disabled={c.dataType !== "INT" ? c.dataType !== "BIGINT" ? c.dataType !== "DATE" ? c.dataType !== "BOOLEAN" ? false : true : true : true : true}

                                                        />
                                                    </Table.Cell>
                                                    <Table.Cell className="max-w-[30px] px-0 py-0 font-sm text-[12px] text-white dark:text-white overflow-x-scroll text-center border-solid border-r-2 border-r-[rgba(255,255,255,0.275)]">
                                                        <Checkbox checked={c.isNullable === "YES"} onChange={(e) => handlerChangeColumn(i, "isNullable", e.target.checked ? "YES" : "NO")} />
                                                    </Table.Cell>
                                                    <Table.Cell className="max-w-[100px] px-0 py-0 font-sm text-[12px] text-white dark:text-white text-center overflow-x-scroll border-solid border-r-2 border-r-[rgba(255,255,255,0.275)]">
                                                        <input
                                                            className='block w-full border-0 bg-transparent px-0 pb-0 pr-0 pt-0 text-sm text-center outline-none transition-colors hover:border-white hover:text-white focus:border-white focus:outline-none focus:ring-transparent focus:ring-offset-transparent'
                                                            type={'text'}
                                                            placeholder={"getDate()"}
                                                            value={c.defaultValue}
                                                            onChange={(e) => handlerChangeColumn(i, "defaultValue", e.target.value)}
                                                            required
                                                        />
                                                    </Table.Cell>
                                                    <Table.Cell className="max-w-[120px] px-0 py-0 font-sm text-[12px] text-center text-white dark:text-white overflow-x-scroll border-solid border-r-2 border-r-[rgba(255,255,255,0.275)]">
                                                        <Checkbox
                                                            checked={c.isPrimaryKey === "Yes"}
                                                            onChange={(e) => {
                                                                handlerChangeColumn(i, "isPrimaryKey", e.target.checked ? "Yes" : "No")
                                                            }}
                                                        />
                                                    </Table.Cell>
                                                    <Table.Cell className="w-[90px] px-0 py-0 font-sm text-[12px] text-center text-white dark:text-white overflow-x-scroll border-solid border-r-2 border-r-[rgba(255,255,255,0.275)]">
                                                        <Checkbox checked={c.isIdentity === "Yes"} onChange={(e) => handlerChangeColumn(i, "isIdentity", e.target.checked ? "Yes" : "No")} />
                                                    </Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                        <div
                            className="flex w-full"
                        >
                            <Button
                                size="md"
                                onClick={() => handleCreateTable()}
                                className="w-[30%] mx-auto h-[3em] "
                            >
                                <HiPlus className="text-white text-[18px]" /><span className="text-lg">Crear Tabla</span>
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
