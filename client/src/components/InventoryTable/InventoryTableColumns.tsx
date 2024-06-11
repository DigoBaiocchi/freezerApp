import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CircleMinus, CirclePlus, CircleX, MoreHorizontal } from "lucide-react";
import { DrawerDialog } from "./DrawerDialog";
import { UpdatePropsContext } from "./InventoryTable";

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



const columnHelper = createColumnHelper<InventoryTableData>();
    
export const columns = [
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
                        // updateQuantityMutation.mutate({id, quantity: updatedQuantity})
                    }}>
                        <CircleMinus onClick={() => console.log('reduce quantity')} />
                    </Button>
                        <p className="w-7 p-2">{props.getValue()}</p>
                    <Button className="p-2" variant='ghost' onClick={() => {
                        const id = props.cell.row.original.id as number;
                        const quantity = Number(props.cell.row.original.quantity);
                        const updatedQuantity = quantity + 1;
                        // updateQuantityMutation.mutate({id, quantity: updatedQuantity})
                    }}>
                        <CirclePlus onClick={() => console.log('increase quantity')} />
                    </Button>
                </div>
            );
        }
    }),
    columnHelper.display({
        id: 'edit',
        header: 'Edit',
        cell: ({ row }) => {
            const item = row.original;
            
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Edit</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <UpdatePropsContext.Provider value={{ id: item.id, quantity: +item.quantity }}>
                                <DrawerDialog />
                            </UpdatePropsContext.Provider>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Button className="w-full" variant="outline" onClick={() => {
                                const id = item.id;
                                console.log(item.quantity)
                                // deleteMutation.mutate(id)
                                }}>Edit Item Data</Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }),
    columnHelper.display({
        id: 'delete',
        header: 'Delete',
        cell: (props) => 
            <Button className="p-2" variant="ghost" onClick={() => {
                const id = props.cell.row.original.id as number;
                // deleteMutation.mutate(id)
            }}><CircleX color="#eb2d2d" /></Button>
            
    }),
];