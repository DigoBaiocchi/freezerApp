import { CircleX } from "lucide-react";
import { Button } from "./ui/button";
import { ApiCalls, IndividualTables } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteButtonProps = {
    tableName: IndividualTables | 'inventory';
    id: number
};

export default function DeleteButton({ tableName, id }: DeleteButtonProps) {
    const apiCalls = new ApiCalls(tableName);

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiCalls.deleteCall(id),
        onSuccess: () => {
            console.log('Invalidating queries for:', [tableName]);
            queryClient.invalidateQueries({ queryKey: [tableName] });
        },
    });

    return (
        <Button className="p-2" variant="ghost" onClick={() => {
            deleteMutation.mutate(id)
        }}><CircleX color="#eb2d2d" /></Button>
    );
}