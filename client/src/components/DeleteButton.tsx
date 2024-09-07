import { CircleX } from "lucide-react";
import { Button } from "./ui/button";
import { ApiCalls, IndividualTables } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMediaQuery } from 'usehooks-ts'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useState } from "react";
import { ItemData } from "./InventoryTable/InventoryCard";

type DeleteButtonProps = {
    tableName: IndividualTables | 'inventory';
    item: ItemData;
};

export default function DeleteButton({ tableName, item }: DeleteButtonProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [open, setOpen] = useState(false)
    const apiCalls = new ApiCalls(tableName);

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiCalls.deleteCall(id),
        onSuccess: () => {
            console.log('Invalidating queries for:', [tableName]);
            queryClient.invalidateQueries({ queryKey: [tableName] });
        },
    });

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="p-2" variant="ghost" >
                    <CircleX color="#eb2d2d" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Are you sure you want to delete "{item.itemname}" from {tableName}?</DialogTitle>
                <DialogDescription>
                    Click Yes to delete.
                </DialogDescription>
                </DialogHeader>
                <DialogClose className="flex">
                    <Button variant="destructive" className="w-full" onClick={() => {
                        deleteMutation.mutate(item.id)
                    }}>Yes</Button>
                </DialogClose>
                <DialogClose className="flex">
                    <Button className="w-full">No</Button>
                </DialogClose>
            </DialogContent>
            </Dialog>
        )
    }
    
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button className="p-2" variant="ghost" >
                    <CircleX color="#eb2d2d" />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
            <DrawerHeader className="text-left">
                <DrawerTitle>Are you sure you want to delete "{item.itemname}" from {tableName}?</DrawerTitle>
                <DrawerDescription>
                    Click Yes to delete.
                </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                <Button variant="destructive" onClick={() => {
                    deleteMutation.mutate(item.id)
                }}>Yes</Button>
                </DrawerClose>
                <DrawerClose asChild>
                <Button>No</Button>
                </DrawerClose>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}