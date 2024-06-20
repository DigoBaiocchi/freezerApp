import { FieldApi } from "@tanstack/react-form";
import { IndividualTables } from "../api/api";
import { IndividualTableData, IndiviualTable } from "./Table";

type SelectProps = {
    tableName: IndividualTables;
    field: FieldApi<any, any, any, any, any>;
    data: IndividualTableData;
};

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo({ tableName, field, data }: SelectProps) {
  return (
    <Select onValueChange={(value) => field.handleChange(value)}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={`Choose a ${tableName}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{tableName} list</SelectLabel>
          {data?.map((data: IndiviualTable) => (
              <SelectItem key={data.id} value={data.id.toString()}>{data.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
