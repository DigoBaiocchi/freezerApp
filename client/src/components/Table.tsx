import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ApiCalls, type IndividualTables } from "../api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Input from "./Input";
import { useState } from "react";

export type IndiviualTable = {
    id: string;
    name: string;
};

export type IndividualTableData = IndiviualTable[];

type TableProps = {
    tableName: IndividualTables;
};

export function Table({ tableName }: TableProps) {
    const apiCalls = new ApiCalls(tableName);
    const [updateInput, setUpdateInput] = useState(false);

    const queryClient = useQueryClient();

    const { isPending, error, data} = useQuery({
        queryKey: ['data', tableName],
        queryFn: () => apiCalls.getCall().then((res) => {
            console.log("getCall data is:", res.data)
            return res.data;
        }),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => apiCalls.deleteCall(id),
        onSuccess: () => {
            console.log('Invalidating queries for:', ['data', tableName]);
            queryClient.invalidateQueries({ queryKey: ['data', tableName] });
        },
    });
    
    const columnHelper = createColumnHelper<IndiviualTable>();
    
    const columns = [
        columnHelper.accessor('id', {
            id: 'id',
            header: 'ID',
            cell: props => props.getValue()
        }),
        columnHelper.accessor('name', {
            header: 'Name',
            cell: props => 
                <Input 
                    inputName={props.getValue()} 
                    inputId={props.cell.row.original.id}
                    updateInput={updateInput}
                    tableName={tableName}
                />,
        }),
        columnHelper.display({
            id: 'update',
            header: 'update',
            cell: () => <button onClick={() => setUpdateInput(true)}>Update</button>
        }),
        columnHelper.display({
            id: 'delete',
            header: 'delete',
            cell: (props) => <button onClick={() => {
                    const id = props.cell.row.original.id as string;
                    deleteMutation.mutate(id)
                }
            }>Delete</button>
        })
    ];

    const table = useReactTable({ 
        columns, 
        data, 
        getCoreRowModel: getCoreRowModel(), 
        // onRowSelectionChange: 
    });
    // console.log(table.getState());
    if (isPending) return <div>Loading...</div>;

    if (error) return <div>{`An error has ocurred: ${error.message}`}</div>;

    return (
        <div>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}