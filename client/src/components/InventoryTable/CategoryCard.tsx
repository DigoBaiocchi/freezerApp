import { Link } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle } from "../ui/card";

type CategoryCardProps = {
    freezerId: number;
    categoryId: number;
    categoryName: string;
}

export function CategoryCard({freezerId, categoryId, categoryName}: CategoryCardProps) {
    return (
        <div className="flex m-2">
            <Link to="/item/list" search={{ freezerId, categoryId }} >
                <Card className="w-[275px]">
                    <CardHeader className="p-5">
                            <div className="flex justify-center">
                                <CardTitle className="">{categoryName}</CardTitle>
                            </div>
                    </CardHeader>
                </Card>
            </Link>            
        </div>
    );
}