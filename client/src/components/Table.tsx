import { createColumnHelper } from "@tanstack/react-table";
import { ApiCalls, type IndividualTables } from "../api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Input from "./Input";
import { Button } from "./ui/button";
import TableData from "./TableData";
// import { columns } from "./IndividualTables/IndividualTablesColumn";

export type IndiviualTable = {
    id: number;
    name: string;
};

export type IndividualTableData = IndiviualTable[];

type TableProps = {
    tableName: IndividualTables;
};

export function IndividualTable({ tableName }: TableProps) {
    const apiCalls = new ApiCalls(tableName);
    const idPrefix = tableName.substring(0,3).toUpperCase();
    
    const queryClient = useQueryClient();
    
    const { isPending, error, data} = useQuery({
        queryKey: ['data', tableName],
        queryFn: () => apiCalls.getCall().then((res) => {
            console.log("getCall data is:", res.data)
            return res.data;
        }),
    });
    
    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiCalls.deleteCall(id),
        onSuccess: () => {
            console.log('Invalidating queries for:', ['data', tableName]);
            queryClient.invalidateQueries({ queryKey: ['data', tableName] });
        },
    });
    
    const updateMutation = useMutation<void, Error, IndiviualTable>({
        mutationFn: ({id, name}) => apiCalls.updateCall(id, name),
        onSuccess: () => {
            console.log('Invalidating queries for:', ['data', tableName]);
            queryClient.invalidateQueries({ queryKey: ['data', tableName] });
        }
    });
    
    const columnHelper = createColumnHelper<IndiviualTable>();
    
    const columns = [
        columnHelper.accessor('id', {
            id: 'id',
            header: 'ID',
            cell: props => `${idPrefix}_${String(props.getValue()).padStart(5, '0')}`
        }),
        columnHelper.accessor('name', {
            header: 'Name',
            cell: props => 
                <Input 
                    row={props.row} 
                    getValue={props.getValue} 
                    updateName={updateMutation}
                />
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

    return <TableData columns={columns} data={data} isPending={isPending} error={error} />
}