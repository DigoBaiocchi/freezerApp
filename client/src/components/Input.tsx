import { UseMutationResult } from "@tanstack/react-query";
import { SetStateAction, useState } from "react";
import { type IndiviualTable } from "./Table";
import { Row } from "@tanstack/react-table";
import { InventoryTableData } from "./InventoryTable/InventoryTable";

type InputProps = {
    getValue: () => string;
    row: Row<IndiviualTable | InventoryTableData>;
    updateName: UseMutationResult<void, Error, any>
};

export default function TestInput({ getValue, row, updateName }: InputProps) {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        // Check if name hasn't changed
        if (value === initialValue) {
            return;
        }

        const id = row.getAllCells()[0].getValue() as string;
        updateName.mutate({id, name: value});
        setValue(getValue());
    }

    if (updateName.isPending) {
        <input type="text" value={"Updating"} onChange={handleChange} onBlur={onBlur} />
    }

    return (
        <input type="text" value={value} onChange={handleChange} onBlur={onBlur} />
    );
}