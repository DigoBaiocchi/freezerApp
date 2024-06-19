import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from 'usehooks-ts'
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PencilLineIcon } from "lucide-react"
import { IndividualTables } from "@/api/api"
import { UseMutationResult } from "@tanstack/react-query"
import { IndiviualTable } from "../Table"

type DialogDrawerUpdateNameProps = {
    id: number;
    name: string;
};

type UpdateNameDrawerDialogProps = {
    updateFunction: UseMutationResult<void, Error, IndiviualTable, unknown>
    tableName: IndividualTables;
    name: string;
    id: number;
};

export function UpdateNameDrawerDialog({ tableName, id, name, updateFunction }: UpdateNameDrawerDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [updatedName, setUpdatedName] = React.useState(name);
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const handleUpdatedName = (name: string) => {
    setUpdatedName(name);
  }

  const handleSubmitUpdatedName = ({id, name}: DialogDrawerUpdateNameProps) => {
    updateFunction.mutate({ id, name })
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
          <UpdateNameForm name={name} updatedQuantity={handleUpdatedName} />
          <DialogClose className="flex">
            <Button className="w-full" onClick={() => {
                handleSubmitUpdatedName({ id, name: updatedName })
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
        <UpdateNameForm className="px-4" name={name} updatedQuantity={handleUpdatedName} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button onClick={() => {
                handleSubmitUpdatedName({ id, name: updatedName })
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
    updatedQuantity: (name: string) => void;
};

function UpdateNameForm({ className, name, updatedQuantity }: UpdateNameFormProps) {
    const [updatedName, setUpdatedName] = React.useState(name);

    React.useEffect(() => {
        updatedQuantity(updatedName);
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
