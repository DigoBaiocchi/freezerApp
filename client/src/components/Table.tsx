import { createColumnHelper } from "@tanstack/react-table";
import { ApiCalls, type IndividualTables } from "../api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Input from "./Input";
import TableData from "./TableData";
import DeleteButton from "./DeleteButton";
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
    
    const queryClient = useQueryClient();
    
    const { isPending, error, data} = useQuery({
        queryKey: [tableName],
        queryFn: () => apiCalls.getCall().then((res) => {
            console.log("getCall data is:", res.data)
            return res.data;
        }),
    });
        
    const updateMutation = useMutation<void, Error, IndiviualTable>({
        mutationFn: ({id, name}) => apiCalls.updateCall(id, name),
        onSuccess: () => {
            console.log('Invalidating queries for:', [tableName]);
            queryClient.invalidateQueries({ queryKey: [tableName] });
        }
    });
    
    const columnHelper = createColumnHelper<IndiviualTable>();
    
    const columns = [
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
            cell: (props) => {
                const id = props.cell.row.original.id as number;

                return <DeleteButton tableName={tableName} id={id} />
            }
        }),
    ];

    return <TableData columns={columns} data={data} isPending={isPending} error={error} />
}