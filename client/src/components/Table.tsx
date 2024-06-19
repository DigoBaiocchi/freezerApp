import { createColumnHelper } from "@tanstack/react-table";
import { ApiCalls, type IndividualTables } from "../api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TableData from "./TableData";
import DeleteButton from "./DeleteButton";
import { UpdateNameDrawerDialog } from "./IndividualTables/UpdateName";

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
            cell: props => props.getValue()
        }),
        columnHelper.display({
            id: 'update',
            header: 'Update',
            cell: ({ row }) => {
                const id = row.original.id;
                const name = row.original.name;

                return <UpdateNameDrawerDialog updateFunction={updateMutation} tableName={tableName} id={id} name={name} />
            }
        }),
        columnHelper.display({
            id: 'delete',
            header: 'Delete',
            cell: (props) => {
                const id = props.cell.row.original.id as number;

                return <DeleteButton tableName={tableName} id={id} />
            }
        }),
    ];

    return <TableData columns={columns} data={data} isPending={isPending} error={error} />
}