import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "@tanstack/react-router";

type BreadcrumbItemsProps = {
    freezerId: number;
    freezerName: string;
    categoryName: string;
}

export function BreadcrumbItems({ freezerId, freezerName, categoryName }: BreadcrumbItemsProps) {
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
                    <BreadcrumbItem>Select Item</BreadcrumbItem>
                </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    );
}