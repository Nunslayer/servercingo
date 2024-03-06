import { model } from '@@/go/models';
import { Checkbox, Table } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import React from 'react';
const customTheme: CustomFlowbiteTheme['table'] = {
    root: {
        base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
        shadow: "absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
        wrapper: "relative"
    },
    body: {
        base: "group/body",
        cell: {
            base: "group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg px-6 py-4"
        }
    },
    head: {
        base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
        cell: {
            base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3"
        }
    },
    row: {
        base: "group/row",
        hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
        striped: "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
    }
}
export const TYPESCOL = ["VARCHAR", "NVARCHAR", "INT", "BIGINT", "DATE", "BOOLEAN"]
export function FormularioColumnas() {
    const [columns, setColumns] = React.useState<model.TableColumn[]>([])
    const addColumn = () => {
        const newColumn: model.TableColumn = {
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
    const handlerChangeColumn = (i: number, field: keyof model.TableColumn, v: string | number | null) => {
        const nCs = [...columns]
        nCs[i][field] = v
        setColumns(nCs)
    }
    // const firstColumn:model.TableColumn= {
    //         columnName: '',
    //         dataType: 'INT',
    //         maxLength: null,
    //         isNullable: 'NO',
    //         defaultValue: null,
    //         isIdentity: 'Yes',
    //         isPrimaryKey: 'Yes'
    // } as model.TableColumn
    return (
        <>
            <button onClick={addColumn}>+ Columna</button>
            <div className="h-[300px] overflow-x-auto bg-gray-300 rounded-[12px]">
                <Table theme={customTheme} className="bg-transparent">
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
        </>
    );
}
