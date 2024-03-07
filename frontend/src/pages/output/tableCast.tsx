import { model } from '@@/go/models';
import { Table } from 'flowbite-react';
export function RowDisplay(props: {
    data: model.RowTable[]
}) {
    return (
        <>
            {
                props.data.length > 0 ? <h1>No existen datos</h1> :

                    <div className="space-y-2 ">

                        <div className="h-[300px] overflow-x-auto bg-gray-300 rounded-[12px]">
                            <Table className="bg-transparent">
                                <Table.Head className="bg-[rgba(3,5,19,0.9)]">
                                    <Table.HeadCell className="bg-transparent text-cyan-400 text-center text-[14px]">{"º"}</Table.HeadCell>
                                    {Object.keys(props.data[0].values).map((k) => {
                                        return (
                                            <Table.HeadCell key={k} className="bg-transparent text-cyan-400 text-center text-[14px]">{k}</Table.HeadCell>
                                        )
                                    })}
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {
                                        props.data.map((d, i) => {
                                            return (
                                                <Table.Row key={i} className="bg-cyan-700 dark:border-gray-700 px-0 py-0">
                                                    <Table.Cell className="max-w-[20px] px-0 py-0 font-sm text-[12px] text-white text-center dark:text-white overflow-x-scroll border-solid border-r-2 border-r-[rgba(255,255,255,0.275)]">
                                                        {i + 1}
                                                    </Table.Cell>
                                                    {
                                                        Object.entries(d).map(([fd, v]) => {
                                                            return (

                                                                <Table.Cell key={fd + v} className="max-w-[150px] px-0 py-0 font-sm text-[12px] text-white text-center dark:text-white overflow-x-scroll border-solid border-r-2 border-r-[rgba(255,255,255,0.275)]">
                                                                    {v}
                                                                </Table.Cell>
                                                            )
                                                        })
                                                    }
                                                </Table.Row>
                                            )
                                        })
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
            }
        </>
    );
}
