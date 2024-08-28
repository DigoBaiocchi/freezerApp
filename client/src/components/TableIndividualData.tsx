import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { InventoryTableData } from "./InventoryTable/InventoryTableColumns";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useState } from "react";
import { ArrowDownAZ, ArrowDownUp, ArrowUpAZ } from "lucide-react";

type TableDataProps = {
    columns: ColumnDef<any, any>[];
    data: InventoryTableData[];
    isPending: boolean;
    error: Error | null;
}

type ColumnSort = {
    id: string;
    desc: boolean;
}
type SortingState = ColumnSort[];



export default function TableIndividualData({ columns, data, isPending, error}: TableDataProps) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({ 
        columns, 
        data, 
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        // initialState: {
        //     columnOrder: ["name", "update", "delete"],
        //     sorting: [
        //         {
        //             id: 'name',
        //             desc: false,
        //         }
        //     ],
        // },
        state: {
            sorting,
        },
        onSortingChange: setSorting,
    });
    
    if (isPending) return <div>Loading...</div>;

    if (error) return <div>{`An error has ocurred: ${error.message}`}</div>;

    return (
        <ScrollArea className="w-100 whitespace-nowrap rounded-md border">
            <div className="flex justify-center">
                <div>
                    <Table className="w-85">
                        <TableHeader>
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <TableHead key={header.id} className="w-6">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                            }
                                            {
                                                header.column.getCanSort() && <>{" "}<button><ArrowDownUp 
                                                    onClick={header.column.getToggleSortingHandler()}
                                                /></button></>
                                            }
                                            {
                                                {
                                                    asc: <ArrowDownAZ />,
                                                    desc: <ArrowUpAZ />,
                                                }[header.column.getIsSorted() as 'asc' | 'desc']
                                            }
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
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}