import { ApiCalls } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./InventoryTable/InventoryTableColumns";
import TableData from "./TableData";
import { createContext } from "react";

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

export const IdContext = createContext({ id: 0, quantity: 0});

export function InventoryTable() {
    const tableName = 'inventory';
    const apiCalls = new ApiCalls(tableName);
    
    const { isPending, error, data} = useQuery({
        queryKey: ['inventoryData'],
        queryFn: () => apiCalls.getCall().then((res) => {
            console.log("getCall data is:", res.data)
            return res.data;
        }),
    });

    return <TableData columns={columns} data={data} isPending={isPending} error={error} />
}