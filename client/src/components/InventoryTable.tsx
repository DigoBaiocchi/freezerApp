import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ApiCalls } from "../api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { CircleMinus, CirclePlus, CircleX, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DrawerDialog } from "./DrawerDialog";
import { columns } from "./InventoryTable/InventoryTableColumns";
import TableData from "./TableData";

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
    
    // const columnHelper = createColumnHelper<InventoryTableData>();
    
    // const columns = [
    //     // columnHelper.accessor('id', {
    //     //     id: 'id',
    //     //     header: 'ID',
    //     //     cell: props => `${idPrefix}_${String(props.getValue()).padStart(5, '0')}`
    //     // }),
    //     columnHelper.accessor('freezername', {
    //         header: 'Freezer',
    //         cell: props => {
    //             console.log(props.getValue())
    //             return props.getValue();
    //         }
    //     }),
    //     columnHelper.accessor('categoryname', {
    //         header: 'Category',
    //         cell: props => {
    //             console.log(props.getValue())
    //             return props.getValue();
    //         }
    //     }),
    //     columnHelper.accessor('itemname', {
    //         header: 'Item',
    //         cell: props => {
    //             console.log(props.getValue())
    //             return props.getValue();
    //         }
    //     }),
    //     columnHelper.accessor('unitname', {
    //         header: 'Unit',
    //         cell: props => {
    //             console.log(props.getValue())
    //             return props.getValue();
    //         }
    //     }),
    //     // columnHelper.accessor('entrydate', {
    //     //     header: 'Entry Date',
    //     //     cell: props => {
    //     //         console.log(props.getValue())
    //     //         return props.getValue().substring(0,10);
    //     //     }
    //     // }),
    //     columnHelper.accessor('expdate', {
    //         header: 'Exp Date',
    //         cell: props => {
    //             console.log(typeof props.getValue())
    //             return props.getValue().substring(0,10);
    //         }
    //     }),
    //     columnHelper.accessor('quantity', {
    //         header: 'Qtd',
    //         cell: props => {
    //             console.log(props.getValue())
    //             return (
    //                 <div className="flex">
    //                     <Button className="p-2" variant='ghost' onClick={() => {
    //                         const id = props.cell.row.original.id as number;
    //                         const quantity = Number(props.cell.row.original.quantity);
    //                         const updatedQuantity = quantity - 1;
    //                         updateQuantityMutation.mutate({id, quantity: updatedQuantity})
    //                     }}>
    //                         <CircleMinus onClick={() => console.log('reduce quantity')} />
    //                     </Button>
    //                         <p className="w-7 p-2">{props.getValue()}</p>
    //                     <Button className="p-2" variant='ghost' onClick={() => {
    //                         const id = props.cell.row.original.id as number;
    //                         const quantity = Number(props.cell.row.original.quantity);
    //                         const updatedQuantity = quantity + 1;
    //                         updateQuantityMutation.mutate({id, quantity: updatedQuantity})
    //                     }}>
    //                         <CirclePlus onClick={() => console.log('increase quantity')} />
    //                     </Button>
    //                 </div>
    //             );
    //         }
    //     }),
    //     columnHelper.display({
    //         id: 'delete',
    //         header: 'Delete',
    //         cell: (props) => 
    //             <Button className="p-2" variant="ghost" onClick={() => {
    //                 const id = props.cell.row.original.id as number;
    //                 deleteMutation.mutate(id)
    //             }}><CircleX color="#eb2d2d" /></Button>      
    //     }),
    //     columnHelper.display({
    //         id: 'actions',
    //         header: 'Actions',
    //         cell: ({ row }) => {
    //             const item = row.original;
                
    //             return (
    //                 <DropdownMenu>
    //                     <DropdownMenuTrigger asChild>
    //                         <Button variant={"ghost"} className="h-8 w-8 p-0">
    //                             <span className="sr-only">Open menu</span>
    //                             <MoreHorizontal className="h-4 w-4" />
    //                         </Button>
    //                     </DropdownMenuTrigger>
    //                     <DropdownMenuContent align="end">
    //                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                         <DropdownMenuItem>
    //                             <Button className="" variant="destructive" onClick={() => {
    //                                 const id = item.id;
    //                                 deleteMutation.mutate(id)
    //                             }}>Delete</Button>
    //                         </DropdownMenuItem>
    //                         <DropdownMenuItem>
    //                             {/* <UpdateQuantityDrawer 
    //                                 id={item.id} 
    //                                 quantity={Number(item.quantity)} 
    //                                 updateFunction={updateQuantityMutation}
    //                             /> */}
    //                             <DrawerDialog />
    //                         </DropdownMenuItem>
    //                     </DropdownMenuContent>
    //                 </DropdownMenu>
    //             );
    //         }
    //     }),
    // ];

    return <TableData columns={columns} data={data} isPending={isPending} error={error} />
}