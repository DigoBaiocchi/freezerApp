import { Link } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle } from "../ui/card";
import DeleteButton from "../DeleteButton";
import { EditNameButton } from "../editButton/EditNameButton";

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
                            <EditNameButton tableName="freezer" id={id} name={name} />
                            <DeleteButton tableName="freezer" item={{id, itemname: name}} />
                        </div>
                </CardHeader>
            </Card>
        </div>
    );
}