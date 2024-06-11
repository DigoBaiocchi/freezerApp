import * as React from "react"

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
import { ApiCalls } from "@/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UpdatePropsContext } from "./InventoryTable"

type DrawerDialogProps = {
    id: number;
    quantity: number;
};

export function DrawerDialog() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" variant="outline">Edit Quantity</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
            <DialogDescription>
            Edit item 'name' quantity.
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
        <Button className="w-full" variant="outline">Edit Quantity</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit</DrawerTitle>
          <DrawerDescription>
          Edit item 'name' quantity.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm() {
  const tableName = 'inventory';
  const apiCalls = new ApiCalls(tableName);

  const { id, quantity } = React.useContext(UpdatePropsContext);
      
  const queryClient = useQueryClient();
  
  // const deleteMutation = useMutation({
  //     mutationFn: (id: number) => apiCalls.deleteCall(id),
  //     onSuccess: () => {
  //         console.log('Invalidating queries for:', ['inventoryData']);
  //         queryClient.invalidateQueries({ queryKey: ['inventoryData'] });
  //     },
  // });
  
  const updateQuantityMutation = useMutation<void, Error, DrawerDialogProps>({
      mutationFn: ({id, quantity}) => {
          return apiCalls.updateQuantityCall(id, quantity);
      },
      onSuccess: () => {
          console.log('Invalidating queries for:', ['inventoryData']);
          queryClient.invalidateQueries({ queryKey: ['inventoryData'] });
      }
  });
  return (
    <div className="p-4 pb-0">
      <div className="flex items-center justify-center space-x-2">
        <Button className="h-10 w-10 shrink-0 rounded-full" variant='ghost' size={"icon"} onClick={() => {
            const updatedQuantity = Number(quantity) - 1;
            updateQuantityMutation.mutate({id, quantity: updatedQuantity})
            console.log('reduce quantity')
        }}>
            <CircleMinus className="h-6 w-6" />
        </Button>
        <div className="flex-1 text-center">
          <div className="text-7xl font-bold tracking-tighter">
            <p className="text-7xl font-bold tracking-tighter">{quantity}</p>
          </div>
        </div>
        <Button className="h-10 w-10 shrink-0 rounded-full" variant='ghost' size={"icon"} onClick={() => {
            const updatedQuantity = Number(quantity) + 1;
            updateQuantityMutation.mutate({id, quantity: updatedQuantity})
            console.log('increase quantity')
        }}>
            <CirclePlus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
