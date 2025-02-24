import { PencilLineIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { UpdatePropsContext } from "./InventoryTable";
import { useMediaQuery } from "usehooks-ts";
import { ItemData } from "./InventoryCard";
import { EditQuantityButton } from "../editButton/EditQuantityButton";
import { Link } from "@tanstack/react-router";

export type ItemProps = {
    item: ItemData;
};

export default function EditMenu({ item }: ItemProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            // <Button variant={"ghost"}>
            //     <PencilLineIcon color="#3859ff" />
            // </Button>
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
                    <UpdatePropsContext.Provider value={{ id: item.id, quantity: +item.quantity, name: item.itemname }}>
                        {/* <DrawerDialog /> */}
                        <EditQuantityButton />
                    </UpdatePropsContext.Provider>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to={`/inventory/edit-item`} search={{ inventoryId: item.id }}>
                        <Button className="w-full" variant="outline" onClick={() => {
                            console.log("Edit item" + item.id);
                        }}>Edit Item Data</Button>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
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
                    <UpdatePropsContext.Provider value={{ id: item.id, quantity: +item.quantity, name: item.itemname }}>
                        {/* <DrawerDialog /> */}
                        <EditQuantityButton />
                    </UpdatePropsContext.Provider>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to={`/inventory/edit-item`} search={{ inventoryId: item.id }}>
                        <Button className="w-full" variant="outline" onClick={() => {
                            console.log("Edit item" + item.id);
                        }}>Edit Item Data</Button>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}