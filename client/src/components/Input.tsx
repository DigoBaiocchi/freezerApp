import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SetStateAction, useEffect, useState } from "react";
import { type IndiviualTable } from "./Table";
import { ApiCalls, type IndividualTables } from "../api/api";

type InputProps = {
    inputName: string;
    inputId: string;
    updateInput: boolean;
    tableName: IndividualTables;
};

export default function Input({ inputName, inputId, updateInput, tableName }: InputProps) {
    const [inputValue, setInputValue] = useState(inputName);
    const [updateData, setUpdateData] = useState(updateInput);
    const apiCalls = new ApiCalls(tableName);
    const queryClient = useQueryClient();
    // console.log(updateData)
    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInputValue(e.target.value);
    };
    
    const updateMutation = useMutation<void, Error, IndiviualTable>({
        mutationFn: ({id, name}) => apiCalls.updateCall(id, name),
        onSuccess: () => {
            console.log('Invalidating queries for:', ['data', tableName]);
            queryClient.invalidateQueries({ queryKey: ['data', tableName] });
        }
    });
    
    useEffect(() => {
    //     console.log(inputValue);
    //     // if (updateData) {
        updateMutation.mutate({ id: inputId, name: inputValue })
    //         // setInputValue(inputName);
            // setUpdateData(false);
    //         // console.log(updateInput)
        // }
    }, [inputValue]);

    return (
        <input type="text" value={inputValue} onChange={handleChange} />
    );
}