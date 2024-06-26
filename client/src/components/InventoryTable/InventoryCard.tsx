import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import EditMenu from "./EditMenu"
import { InventoryTableData } from "./InventoryTable"
import DeleteButton from "../DeleteButton";
import { useState } from "react";
import { Collapsible } from "@radix-ui/react-collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";

type InventoryCardProps = {
    item: InventoryTableData;
};

export function InventoryCard({ item }: InventoryCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="w-[350px] space-y-2"
            >
                <div className="flex justify-center m-2">
                    <Card className="w-[275px]">
                        <CardHeader className="p-5">
                            <CollapsibleTrigger asChild>
                                <div className="flex justify-between">
                                    <CardTitle>{item.itemname}</CardTitle>
                                        <Button variant="ghost" size="sm" className="w-100% h-full p-0">
                                            <ChevronsUpDown className="h-4 w-4" />
                                            <span className="sr-only">Toggle</span>
                                        </Button>

                                </div>
                            </CollapsibleTrigger>
                            <CardDescription>{item.freezername} - {item.categoryname}</CardDescription>
                        </CardHeader>
                        <CollapsibleContent className="space-y-2">
                            <CardContent className="grid gap-4 pb-3">
                                <div>
                                    <div
                                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-0 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="flex m-0 space-x-1">
                                            <p className="text-sm font-medium leading-none">
                                                Exp:
                                            </p>
                                            <p className="text-sm text-muted-foreground leading-none">
                                                {item.expdate.substring(0,10)}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-0 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="flex m-0 space-x-1">
                                            <p className="text-sm font-medium leading-none">
                                                Unit:
                                            </p>
                                            <p className="text-sm text-muted-foreground leading-none">
                                                {item.unitname}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-0 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="flex m-0 space-x-1">
                                            <p className="text-sm font-medium leading-none">
                                                Quantity:
                                            </p>
                                            <p className="text-sm text-muted-foreground leading-none">
                                                {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between pb-3">
                                <EditMenu item={item} />
                                <DeleteButton tableName="inventory" item={item} />
                            </CardFooter>                                
                        </CollapsibleContent>
                    </Card>
                </div>                    
            </Collapsible>
        </>
    )
}
