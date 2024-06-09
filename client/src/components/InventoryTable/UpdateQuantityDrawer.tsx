import { CircleMinus, CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { UseMutationResult } from "@tanstack/react-query";

type IdQuantity = {
    id: number;
    quantity: number;
}

type UpdateQuantityDrawerProps = {
    id: number;
    quantity: number;
    updateFunction: UseMutationResult<void, Error, IdQuantity>;
}

export default function UpdateQuantityDrawer({ id, quantity, updateFunction}: UpdateQuantityDrawerProps) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={"outline"}>Update Quantity</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="flex">
                    <Button className="p-2" variant='ghost' onClick={() => {
                        const updatedQuantity = Number(quantity) - 1;
                        updateFunction.mutate({id, quantity: updatedQuantity})
                    }}>
                        <CircleMinus onClick={() => console.log('reduce quantity')} />
                    </Button>
                        <p className="w-7 p-2">{quantity}</p>
                    <Button className="p-2" variant='ghost' onClick={() => {
                        const updatedQuantity = Number(quantity) + 1;
                        updateFunction.mutate({id, quantity: updatedQuantity})
                    }}>
                        <CirclePlus onClick={() => console.log('increase quantity')} />
                    </Button>
                </div>
            </DrawerContent>
        </Drawer>
    );
}