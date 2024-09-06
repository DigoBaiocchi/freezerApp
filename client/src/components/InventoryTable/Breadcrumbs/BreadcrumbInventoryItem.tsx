import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "@tanstack/react-router";

type BreadcrumbInventoryItemProps = {
    freezerId: number;
    freezerName: string;
    categoryId: number;
    categoryName: string;
    itemName: string;
}

export function BreadcrumbInventoryItem({ 
    freezerId, 
    freezerName, 
    categoryId, 
    categoryName, 
    itemName 
}: BreadcrumbInventoryItemProps) {
    return (
        <div className="flex justify-center">
            <div className="flex justify-start m-2 w-[800px]">
                <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbLink asChild>
                        <Link to='/freezer/list'>{freezerName}</Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator></BreadcrumbSeparator>
                    <BreadcrumbLink asChild>
                        <Link to='/category/list' search={{ freezerId }} >{categoryName}</Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator></BreadcrumbSeparator>
                    <BreadcrumbItem>Select inventory item</BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to='/item/list' search={{ freezerId, categoryId }} >{itemName}</Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator></BreadcrumbSeparator>
                </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    );
}