import { ApiCalls } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./InventoryTableColumns";
import TableData from "../TableData";
import { createContext } from "react";
import { useMediaQuery } from "usehooks-ts";
import { InventoryCard } from "./InventoryCard";

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

export const UpdatePropsContext = createContext({ id: 0, quantity: 0});

export function InventoryTable() {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const tableName = 'inventory';
    const apiCalls = new ApiCalls(tableName);
    
    const { isPending, error, data} = useQuery({
        queryKey: [tableName],
        queryFn: () => apiCalls.getCall().then((res) => {
            console.log("getCall data is:", res.data)
            return res.data;
        }),
    });

    if (isDesktop) {
        return <TableData columns={columns} data={data} isPending={isPending} error={error} />
    }

    return <InventoryCard items={data} />;

}