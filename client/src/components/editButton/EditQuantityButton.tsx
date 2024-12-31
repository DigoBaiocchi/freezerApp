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
import { UpdatePropsContext } from "../InventoryTable/InventoryTable"
import { DialogClose } from "@radix-ui/react-dialog"

type DrawerDialogProps = {
    id: number;
    quantity: number;
};

type UpdateQuantityDialogProps = {
  updatedQuantity: (quantity: number) => void;
};

export function EditQuantityButton() {
  const { id, quantity, name } = React.useContext(UpdatePropsContext);
  const [updatedQuantity, setUpdatedQuantity] = React.useState(quantity);
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const tableName = 'inventory';
  const apiCalls = new ApiCalls(tableName);
  const queryClient = useQueryClient();
  
  const updateQuantityMutation = useMutation<void, Error, DrawerDialogProps>({
    mutationFn: ({id, quantity}) => {
        return apiCalls.updateQuantityCall(id, quantity);
    },
    onSuccess: () => {
        console.log('Invalidating queries for:', [tableName]);
        queryClient.invalidateQueries({ queryKey: [tableName] });
    }
  });

  const handleQuantityUpdate = (quantity: number) => {
    setUpdatedQuantity(quantity);
  };

  const handleSubmitNewQuantity = ({id, quantity}: DrawerDialogProps) => {
    updateQuantityMutation.mutate({ id, quantity });
  }

  if (isDesktop) {
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="outline">Edit Quantity</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit</DialogTitle>
              <DialogDescription>
                Edit {name} quantity.
              </DialogDescription>
            </DialogHeader>
            <UpdateQuantityDialog updatedQuantity={handleQuantityUpdate} />
            <DialogClose asChild>
              <Button onClick={() => {
                handleSubmitNewQuantity({ id, quantity: updatedQuantity });
              }}>Update Quantity</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
            {/* <ProfileForm /> */}
          </DialogContent>
        </Dialog>
      </>
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
          Edit {name} quantity.
          </DrawerDescription>
        </DrawerHeader>
          <UpdateQuantityDialog updatedQuantity={handleQuantityUpdate} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button onClick={() => {
              handleSubmitNewQuantity({ id, quantity: updatedQuantity });
            }}>Update Quantity</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function UpdateQuantityDialog({ updatedQuantity }: UpdateQuantityDialogProps) {
  const { quantity } = React.useContext(UpdatePropsContext);

  const [itemQuantity, setItemQuantity] = React.useState(quantity);

  const handleQuantityIncrease = () => {
    setItemQuantity(itemQuantity + 1);
  };
    
  const handleQuantityDecrease = () => {
    if (itemQuantity === 0) {
      return;
    }
    setItemQuantity(itemQuantity - 1);
  };

  React.useEffect(() => {
    updatedQuantity(itemQuantity);
  }, [itemQuantity]);
      
  
  return (
    <div className="p-4 pb-0">
      <div className="flex items-center justify-center space-x-2">
        <Button className="h-10 w-10 shrink-0 rounded-full" variant='ghost' size={"icon"} onClick={() => {
            console.log('reduce quantity')
            handleQuantityDecrease();
            }}>
            <CircleMinus className="h-6 w-6" />
        </Button>
        <div className="flex-1 text-center">
          <div className="text-7xl font-bold tracking-tighter">
            <p className="text-7xl font-bold tracking-tighter">{itemQuantity}</p>
          </div>
        </div>
        <Button className="h-10 w-10 shrink-0 rounded-full" variant='ghost' size={"icon"} onClick={() => {
          console.log('increase quantity')
          handleQuantityIncrease();
        }}>
            <CirclePlus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
