import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

type ItemCardProps = {
    freezerId: number;
    categoryId: number;
    itemId: number;
    itemName: string;
    itemTotal: number;
}

export function ItemCard({ freezerId, categoryId, itemId, itemName, itemTotal }: ItemCardProps) {
    return (
        <div className="flex m-2">
            <Link to="/inventory/list" search={{ freezerId, categoryId, itemId }} >
                <Card className="w-[275px]">
                    <CardHeader className="p-5">
                        <div className="flex justify-center">
                            <CardTitle className="">{itemName}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center">
                            <CardDescription>
                                <p className="text-sm text-muted-foreground leading-none">
                                    <b>Quantity:</b> {itemTotal}
                                </p>   
                            </CardDescription>
                        </div>
                    </CardContent>
                </Card>
            </Link>            
        </div>
    );
}