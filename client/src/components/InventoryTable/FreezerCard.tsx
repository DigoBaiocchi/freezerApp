import { Link } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle } from "../ui/card";

type FreezerCategoryCardProps = {
    id: number;
    name: string;
}

export function FreezerCategoryCard({id, name}: FreezerCategoryCardProps) {
    return (
        <div className="flex m-2">
            <Link to="/category/list" search={{ freezerId: id }} >
                <Card className="w-[275px]">
                    <CardHeader className="p-5">
                            <div className="flex justify-center">
                                <CardTitle className="">{name}</CardTitle>
                            </div>
                    </CardHeader>
                </Card>
            </Link>            
        </div>
    );
}