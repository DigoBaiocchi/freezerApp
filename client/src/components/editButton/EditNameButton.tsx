import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { PencilLineIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiCalls, IndividualTables } from "@/api/api";
import { IndiviualTable } from "../IndividualTables/Table";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";

type EditNameButtonProps = {
    tableName: IndividualTables;
    name: string;
    id: number;
};

export function EditNameButton({ tableName, name, id }: EditNameButtonProps) {
    const [open, setOpen] = useState(false)
    const [updatedName, setUpdatedName] = useState(name);
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const queryClient = useQueryClient();
    const apiCalls = new ApiCalls(tableName);

    const updateMutation = useMutation<void, Error, IndiviualTable>({
        mutationFn: ({id, name}) => apiCalls.updateCall(id, name),
        onSuccess: () => {
            console.log('Invalidating queries for:', [tableName]);
            queryClient.invalidateQueries({ queryKey: [tableName] });
        }
    });

    const handleUpdatedName = (name: string) => {
        setUpdatedName(name);
    }

    if (isDesktop) {
            return (
                <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost"><PencilLineIcon color="blue" /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Update {tableName} name "{name}"</DialogTitle>
                    <DialogDescription>
                        Click save when you're done.
                    </DialogDescription>
                    </DialogHeader>
                    <UpdateNameForm name={name} handleNameChange={handleUpdatedName} />
                    <DialogClose className="flex">
                    <Button className="w-full" onClick={() => {
                        updateMutation.mutate({ id, name: updatedName })
                    }}>Save</Button>
                    </DialogClose>
                </DialogContent>
                </Dialog>
            )
        }
        
        return (
            <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="ghost"><PencilLineIcon color="blue" /></Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                <DrawerTitle>Update {tableName} name "{name}"</DrawerTitle>
                <DrawerDescription>
                    Click Save when you're done.
                </DrawerDescription>
                </DrawerHeader>
                <UpdateNameForm className="px-4" name={name} handleNameChange={handleUpdatedName} />
                <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                    <Button onClick={() => {
                        updateMutation.mutate({ id, name: updatedName })
                    }}>Save</Button>
                </DrawerClose>
                <DrawerClose asChild>
                    <Button variant="destructive">Cancel</Button>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
            </Drawer>
        )
}

type UpdateNameFormProps = {
    className?: string;
    name: string;
    handleNameChange: (name: string) => void;
};

function UpdateNameForm({ className, name, handleNameChange }: UpdateNameFormProps) {
    const [updatedName, setUpdatedName] = useState(name);

    useEffect(() => {
        handleNameChange(updatedName);
    }, [updatedName]);

    return (
        <form className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                    className="w-full"
                    type="email" 
                    id="email" 
                    value={updatedName} 
                    onChange={(e) => {
                        setUpdatedName(e.target.value);
                    }}
                />
            </div>
        </form>
    )
}