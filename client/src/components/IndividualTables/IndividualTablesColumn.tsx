import { createColumnHelper } from "@tanstack/react-table";
import { IndiviualTable } from "../Table";

const columnHelper = createColumnHelper<IndiviualTable>();
    
export const columns = [
    columnHelper.accessor('id', {
        id: 'id',
        header: 'ID',
        cell: props => props.getValue()
    }),
    columnHelper.accessor('name', {
        header: 'Name',
        cell: props => props.getValue()
    }),
    columnHelper.display({
        id: 'actions',
        header: 'actions',
        cell: (props) => props.getValue()
    })
];