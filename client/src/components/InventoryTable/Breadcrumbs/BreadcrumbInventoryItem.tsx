import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { LinkForBreadcrumb } from "./BreadcrumbLink";

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
                        <LinkForBreadcrumb name={freezerName} to="/freezer/list" />
                    </BreadcrumbLink>
                    <BreadcrumbSeparator></BreadcrumbSeparator>
                    <BreadcrumbLink asChild>
                        <LinkForBreadcrumb name={categoryName} search={{ freezerId }} to="/category/list" />
                    </BreadcrumbLink>
                    <BreadcrumbSeparator></BreadcrumbSeparator>
                    <BreadcrumbLink asChild>
                        <LinkForBreadcrumb name={itemName} search={{ freezerId, categoryId }} to="/item/list" />
                    </BreadcrumbLink>
                    <BreadcrumbSeparator></BreadcrumbSeparator>
                    <BreadcrumbItem>Items in inventory</BreadcrumbItem>
                </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    );
}