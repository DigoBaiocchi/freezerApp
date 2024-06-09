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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "./ui/scroll-area"
import { CircleMinus, CirclePlus } from "lucide-react"

export function DrawerDialog() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit item quantity</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
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
    <div className="flex justify-center">
      <div className="flex">
        <Button className="p-2" variant='ghost' size={"icon"} onClick={() => {
            // const updatedQuantity = Number(quantity) - 1;
            // updateFunction.mutate({id, quantity: updatedQuantity})
            console.log('reduce quantity')
        }}>
            <CircleMinus />
        </Button>
            <p className="w-7 p-2">{5}</p>
        <Button className="p-2" variant='ghost' onClick={() => {
            // const updatedQuantity = Number(quantity) + 1;
            // updateFunction.mutate({id, quantity: updatedQuantity})
            console.log('increase quantity')
        }}>
            <CirclePlus />
        </Button>
      </div>
    </div>
    // </form>
  )
}
