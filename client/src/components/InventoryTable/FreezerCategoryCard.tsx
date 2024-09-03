import { Link } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle } from "../ui/card";

type FreezerCategoryCardProps = {
    name: string;
}

export function FreezerCategoryCard({name}: FreezerCategoryCardProps) {
    const freezerId = "2";
    return (
        <div className="flex m-2">
            <Link to="/freezer/$freezerId" params={{ freezerId }} search={{ categoryId: "categories" }} >
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