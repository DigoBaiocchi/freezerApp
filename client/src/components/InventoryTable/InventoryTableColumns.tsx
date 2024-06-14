import { createColumnHelper } from "@tanstack/react-table";
import DeleteButton from "../DeleteButton";
import EditMenu from "./EditMenu";
import QuantityField from "./QuantityField";

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
        cell: ({ row }) => {
            const item = row.original;
            
            return (
                <QuantityField item={item} />
            );
        }
    }),
    columnHelper.display({
        id: 'edit',
        header: 'Edit',
        cell: ({ row }) => {
            const item = row.original;
            
            return (
                <EditMenu item={item} />
            );
        }
    }),
    columnHelper.display({
        id: 'delete',
        header: 'Delete',
        cell: (props) => {
            const id = props.row.original.id;

            return <DeleteButton tableName="inventory" id={id} />
        }
            
    }),
];