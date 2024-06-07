import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ApiCalls } from "../api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { CircleMinus, CirclePlus, CircleX } from "lucide-react";

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

type UpdateQuantityAmountParams = {
    id: number;
    quantity: number;
};

export type IndividualTableData = InventoryTableData[];

export function InventoryTable() {
    const tableName = 'inventory';
    const apiCalls = new ApiCalls(tableName);
    const idPrefix = tableName.substring(0,3).toUpperCase();
    
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
    
    // const updateMutation = useMutation<void, Error, InventoryTableData>({
    //     mutationFn: ({id, freezer}) => apiCalls.updateCall(id, freezer),
    //     onSuccess: () => {
    //         console.log('Invalidating queries for:', ['inventoryData']);
    //         queryClient.invalidateQueries({ queryKey: ['inventoryData'] });
    //     }
    // });

    const updateQuantityMutation = useMutation<void, Error, UpdateQuantityAmountParams>({
        mutationFn: ({id, quantity}) => {
            return apiCalls.updateQuantityCall(id, quantity);
        },
        onSuccess: () => {
            console.log('Invalidating queries for:', ['inventoryData']);
            queryClient.invalidateQueries({ queryKey: ['inventoryData'] });
        }
    });
    
    const columnHelper = createColumnHelper<InventoryTableData>();
    
    const columns = [
        // columnHelper.accessor('id', {
        //     id: 'id',
        //     header: 'ID',
        //     cell: props => `${idPrefix}_${String(props.getValue()).padStart(5, '0')}`
        // }),
        columnHelper.accessor('freezername', {
            header: 'Freezer',
            cell: props => {
                console.log(props.getValue())
                return props.getValue();
            }
        }),
        columnHelper.accessor('categoryname', {
            header: 'Category',
            cell: props => {
                console.log(props.getValue())
                return props.getValue();
            }
        }),
        columnHelper.accessor('itemname', {
            header: 'Item',
            cell: props => {
                console.log(props.getValue())
                return props.getValue();
            }
        }),
        columnHelper.accessor('unitname', {
            header: 'Unit',
            cell: props => {
                console.log(props.getValue())
                return props.getValue();
            }
        }),
        // columnHelper.accessor('entrydate', {
        //     header: 'Entry Date',
        //     cell: props => {
        //         console.log(props.getValue())
        //         return props.getValue().substring(0,10);
        //     }
        // }),
        columnHelper.accessor('expdate', {
            header: 'Exp Date',
            cell: props => {
                console.log(typeof props.getValue())
                return props.getValue().substring(0,10);
            }
        }),
        columnHelper.accessor('quantity', {
            header: 'Qtd',
            cell: props => {
                console.log(props.getValue())
                return (
                    <div className="flex">
                        <Button className="p-2" variant='ghost' onClick={() => {
                            const id = props.cell.row.original.id as number;
                            const quantity = Number(props.cell.row.original.quantity);
                            const updatedQuantity = quantity - 1;
                            updateQuantityMutation.mutate({id, quantity: updatedQuantity})
                        }}>
                            <CircleMinus onClick={() => console.log('reduce quantity')} />
                        </Button>
                            <p className="w-7 p-2">{props.getValue()}</p>
                        <Button className="p-2" variant='ghost' onClick={() => {
                            const id = props.cell.row.original.id as number;
                            const quantity = Number(props.cell.row.original.quantity);
                            const updatedQuantity = quantity + 1;
                            updateQuantityMutation.mutate({id, quantity: updatedQuantity})
                        }}>
                            <CirclePlus onClick={() => console.log('increase quantity')} />
                        </Button>
                    </div>
                );
            }
        }),
        columnHelper.display({
            id: 'delete',
            header: 'Delete',
            cell: (props) => 
                <Button className="p-2" variant="ghost" onClick={() => {
                    const id = props.cell.row.original.id as number;
                    deleteMutation.mutate(id)
                }}><CircleX color="#eb2d2d" /></Button>
                
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
        <div className="flex justify-center">
            <div>
                <Table className="w-85">
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
        </div>
    );
}