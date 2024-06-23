import { PencilLineIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { UpdatePropsContext } from "./InventoryTable";
import { DrawerDialog } from "./DrawerDialog";
import { InventoryTableData } from "./InventoryTableColumns";
import { useMediaQuery } from "usehooks-ts";

export type ItemProps = {
    item: InventoryTableData
};

export default function EditMenu({ item }: ItemProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Button variant={"ghost"}>
                <PencilLineIcon color="#3859ff" />
            </Button>
        );
    }
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <PencilLineIcon color="#3859ff" className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Edit</DropdownMenuLabel>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <UpdatePropsContext.Provider value={{ id: item.id, quantity: +item.quantity }}>
                        <DrawerDialog />
                    </UpdatePropsContext.Provider>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button className="w-full" variant="outline" onClick={() => {
                        console.log("Edit item");
                    }}>Edit Item Data</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}