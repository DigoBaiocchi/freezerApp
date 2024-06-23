import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import EditMenu from "./EditMenu"
import { IndividualTableData, InventoryTableData } from "./InventoryTable"
import DeleteButton from "../DeleteButton";

type InventoryCardProps = {
    items: IndividualTableData;
};

export function InventoryCard({ items }: InventoryCardProps) {
    return (
        <>
            {
                items.map((item: InventoryTableData) => (
                    <div className="flex justify-center m-2">
                        <Card className="w-[275px]">
                            <CardHeader className="p-5">
                                <CardTitle>{item.itemname}</CardTitle>
                                <CardDescription>{item.freezername} - {item.categoryname}</CardDescription>
                            </CardHeader>
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
                        </Card>
                    </div>
                ))
            }
        </>
    )
}
