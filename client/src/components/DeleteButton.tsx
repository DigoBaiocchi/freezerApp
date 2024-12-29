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
    item: ItemData | { id: number; itemname: string };
};

export default function DeleteButton({ tableName, item }: DeleteButtonProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [open, setOpen] = useState(false)
    const [openSecondWarning, setOpenSecondWarning] = useState(false)
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
        if (tableName === "inventory") {
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
                    <div className="flex flex-col gap-2">
                        <DialogClose asChild>
                            <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => {
                                deleteMutation.mutate(item.id);
                            }}
                            >
                                Yes
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button className="w-full">No</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
                </Dialog>
            )
        } else {
            return (
                <>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="p-2" variant="ghost">
                            <CircleX color="#eb2d2d" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>
                                Are you sure you want to delete "{item.itemname}" from {tableName}?
                            </DialogTitle>
                            <DialogDescription>Click Yes to delete.</DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-2">
                            {/* Trigger second dialog without closing the first */}
                            <Button
                                variant="destructive"
                                className="w-full"
                                onClick={() => {
                                setOpen(false); // Close the parent dialog
                                setOpenSecondWarning(true); // Open the second dialog
                                }}
                            >
                                Yes
                            </Button>
                            <DialogClose asChild>
                                <Button className="w-full">No</Button>
                            </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Second dialog */}
                    <Dialog open={openSecondWarning} onOpenChange={setOpenSecondWarning}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>
                                If you delete "{item.itemname}" all items from this {tableName} will be deleted from inventory.
                            </DialogTitle>
                            <DialogDescription>
                                Do you want to proceed? You CANNOT revert this.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-2">
                            <DialogClose asChild>
                                <Button
                                variant="destructive"
                                className="w-full"
                                onClick={() => {
                                    deleteMutation.mutate(item.id);
                                }}
                                >
                                Yes
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button className="w-full">No</Button>
                            </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>
                </>
            )

        }
    }

    if (tableName === "inventory") {
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
    
    return (
        <>
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
                        <Button variant="destructive" onClick={() => {
                            setOpen(false);
                            setOpenSecondWarning(true);
                        }}>Yes</Button>
                    <DrawerClose asChild>
                        <Button>No</Button>
                    </DrawerClose>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <Drawer open={openSecondWarning} onOpenChange={setOpenSecondWarning}>
                <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>If you delete "{item.itemname}" all items from this {tableName} will be deleted from inventory.</DrawerTitle>
                    <DrawerDescription>
                        Do you want to proceed? You CAN NOT revert that.
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
        </>
    )
}