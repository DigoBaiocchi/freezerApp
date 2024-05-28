import { FieldApi } from "@tanstack/react-form";
import { IndividualTables } from "../api/api";
import { IndividualTableData, IndiviualTable } from "./Table";

type SelectProps = {
    tableName: IndividualTables;
    field: FieldApi<any, any, any, any, any>;
    data: IndividualTableData;
};

export default function Select({ tableName, field, data }: SelectProps) {
    return (
        <select name={tableName} defaultValue={""} id={tableName} onChange={(e) => field.handleChange(e.target.value)}>
            <option value="" disabled>Choose a {tableName}</option>
            {data?.map((data: IndiviualTable) => (
                <option value={data.id} key={data.id}>{data.name}</option>
            ))}
        </select>
    );
}