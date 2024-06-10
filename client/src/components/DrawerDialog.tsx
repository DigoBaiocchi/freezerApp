import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from 'usehooks-ts'
import { Button } from "@/components/ui/button"
import {
  Dialog,
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
import { CircleMinus, CirclePlus } from "lucide-react"

export function DrawerDialog() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Update Quantity</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update</DialogTitle>
            <DialogDescription>
              Update item 'name' quantity.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Update Quantity</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Update</DrawerTitle>
          <DrawerDescription>
          Update item 'name' quantity.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    // <form className={cn("grid items-start gap-4", className)}>
    <div className="p-4 pb-0">
      <div className="flex items-center justify-center space-x-2">
        <Button className="h-10 w-10 shrink-0 rounded-full" variant='ghost' size={"icon"} onClick={() => {
            // const updatedQuantity = Number(quantity) - 1;
            // updateFunction.mutate({id, quantity: updatedQuantity})
            console.log('reduce quantity')
        }}>
            <CircleMinus className="h-6 w-6" />
        </Button>
        <div className="flex-1 text-center">
          <div className="text-7xl font-bold tracking-tighter">
            <p className="text-7xl font-bold tracking-tighter">{5}</p>
          </div>
        </div>
        <Button className="h-10 w-10 shrink-0 rounded-full" variant='ghost' size={"icon"} onClick={() => {
            // const updatedQuantity = Number(quantity) + 1;
            // updateFunction.mutate({id, quantity: updatedQuantity})
            console.log('increase quantity')
        }}>
            <CirclePlus className="h-6 w-6" />
        </Button>
      </div>
    </div>
    // </form>
  )
}
