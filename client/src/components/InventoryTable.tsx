import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ApiCalls } from "../api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Input from "./Input";

export type InventoryTableData = {
    id: string;
    freezername: string;
    category: string;
    item: string;
    unit: string;
    entryDate: string;
    expDate: string;
    quantity: string;
    description: string;
};

export type IndividualTableData = InventoryTableData[];

export function InventoryTable() {
    const apiCalls = new ApiCalls('inventory');
    
    const queryClient = useQueryClient();
    
    const { isPending, error, data} = useQuery({
        queryKey: ['inventoryData'],
        queryFn: () => apiCalls.getCall().then((res) => {
            console.log("getCall data is:", res.data)
            return res.data;
        }),
    });
    
    const deleteMutation = useMutation({
        mutationFn: (id: string) => apiCalls.deleteCall(id),
        onSuccess: () => {
            console.log('Invalidating queries for:', ['inventoryData']);
            queryClient.invalidateQueries({ queryKey: ['inventoryData'] });
        },
    });
    
    const updateMutation = useMutation<void, Error, InventoryTableData>({
        mutationFn: ({id, freezer}) => apiCalls.updateCall(id, freezer),
        onSuccess: () => {
            console.log('Invalidating queries for:', ['inventoryData']);
            queryClient.invalidateQueries({ queryKey: ['inventoryData'] });
        }
    });
    
    const columnHelper = createColumnHelper<InventoryTableData>();
    
    const columns = [
        columnHelper.accessor('id', {
            id: 'id',
            header: 'ID',
            cell: props => props.getValue()
        }),
        columnHelper.accessor('freezername', {
            header: 'Freezer',
            cell: props => {
                console.log(props.getValue)
                return <Input 
                    row={props.row} 
                    getValue={props.getValue} 
                    updateName={updateMutation}
                />

            }
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
    });
    
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