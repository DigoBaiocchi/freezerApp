import { CircleMinus, CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import { ItemProps } from "./EditMenu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiCalls } from "@/api/api";
import { useMediaQuery } from "usehooks-ts";

type UpdateProps = {
    id: number;
    quantity: number;
};

export default function QuantityField({ item }: ItemProps) {  
    const tableName = 'inventory';
    const apiCalls = new ApiCalls(tableName);
    const queryClient = useQueryClient();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    
    const updateQuantityMutation = useMutation<void, Error, UpdateProps>({
        mutationFn: ({id, quantity}) => {
            return apiCalls.updateQuantityCall(id, quantity);
        },
        onSuccess: () => {
            console.log('Invalidating queries for:', [tableName]);
            queryClient.invalidateQueries({ queryKey: [tableName] });
        }
    });
                
    if (isDesktop) {
        return (
            <div className="flex">
                <Button className="p-2" variant='ghost' onClick={() => {
                    const quantity = Number(item.quantity);
                    const updatedQuantity = quantity - 1;
                    updateQuantityMutation.mutate({id: item.id, quantity: updatedQuantity})
                }}>
                    <CircleMinus onClick={() => console.log('reduce quantity')} />
                </Button>
                    <p className="w-7 p-2">{item.quantity}</p>
                <Button className="p-2" variant='ghost' onClick={() => {
                    const quantity = Number(item.quantity);
                    const updatedQuantity = quantity + 1;
                    updateQuantityMutation.mutate({id: item.id, quantity: updatedQuantity})
                }}>
                    <CirclePlus onClick={() => console.log('increase quantity')} />
                </Button>
            </div>
        );
    }
    return (
        <p className="w-7 p-2">{item.quantity}</p>
    );
}