import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ApiCalls } from "../api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Input from "./Input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";

export type InventoryTableData = {
    id: number;
    freezername: string;
    categoryname: string;
    itemname: string;
    unitname: string;
    entrydate: string;
    expdate: string;
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
        mutationFn: (id: number) => apiCalls.deleteCall(id),
        onSuccess: () => {
            console.log('Invalidating queries for:', ['inventoryData']);
            queryClient.invalidateQueries({ queryKey: ['inventoryData'] });
        },
    });
    
    const updateMutation = useMutation<void, Error, InventoryTableData>({
        // mutationFn: ({id, freezer}) => apiCalls.updateCall(id, freezer),
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
                console.log(props.getValue())
                // return <Input 
                //     row={props.row} 
                //     getValue={props.getValue} 
                //     updateName={updateMutation}
                // />
                return props.getValue();
            }
        }),
        columnHelper.accessor('categoryname', {
            header: 'Category',
            cell: props => {
                console.log(props.getValue())
                // return <Input 
                //     row={props.row} 
                //     getValue={props.getValue} 
                //     updateName={updateMutation}
                // />
                return props.getValue();
            }
        }),
        columnHelper.accessor('itemname', {
            header: 'Item',
            cell: props => {
                console.log(props.getValue())
                // return <Input 
                //     row={props.row} 
                //     getValue={props.getValue} 
                //     updateName={updateMutation}
                // />
                return props.getValue();
            }
        }),
        columnHelper.accessor('unitname', {
            header: 'Unit',
            cell: props => {
                console.log(props.getValue())
                // return <Input 
                //     row={props.row} 
                //     getValue={props.getValue} 
                //     updateName={updateMutation}
                // />
                return props.getValue();
            }
        }),
        columnHelper.accessor('entrydate', {
            header: 'Entry Date',
            cell: props => {
                console.log(props.getValue())
                // return <Input 
                //     row={props.row} 
                //     getValue={props.getValue} 
                //     updateName={updateMutation}
                // />
                return props.getValue();
            }
        }),
        columnHelper.accessor('expdate', {
            header: 'Exp Date',
            cell: props => {
                console.log(typeof props.getValue())
                // return <Input 
                //     row={props.row} 
                //     getValue={props.getValue} 
                //     updateName={updateMutation}
                // />
                return props.getValue();
            }
        }),
        columnHelper.accessor('quantity', {
            header: 'quantity',
            cell: props => {
                console.log(props.getValue())
                // return <Input 
                //     row={props.row} 
                //     getValue={props.getValue} 
                //     updateName={updateMutation}
                // />
                return props.getValue();
            }
        }),
        columnHelper.display({
            id: 'delete',
            header: 'delete',
            cell: (props) => 
                <Button variant="destructive" onClick={() => {
                    const id = props.cell.row.original.id as number;
                    deleteMutation.mutate(id)
                }}>Delete</Button>
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
            <Table>
                <TableCaption >Inventory List</TableCaption>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}