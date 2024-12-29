import { Link } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { PencilIcon } from "lucide-react";
import DeleteButton from "../DeleteButton";

type FreezerCategoryCardProps = {
    id: number;
    name: string;
}

export function FreezerCategoryCard({id, name}: FreezerCategoryCardProps) {
    return (
        <div className="flex m-2">
            <Card className="w-[275px]">
                <CardHeader className="p-5">
                    <Link to="/category/list" search={{ freezerId: id }} >
                        <div className="flex justify-center">
                            <CardTitle className="">{name}</CardTitle>
                        </div>
                    </Link>            
                        <div className="flex justify-left">
                            <PencilIcon className="h-4 w-4" color="#3859ff"/>
                            <DeleteButton tableName="freezer" item={{id, itemname: name}} />
                        </div>
                </CardHeader>
            </Card>
        </div>
    );
}