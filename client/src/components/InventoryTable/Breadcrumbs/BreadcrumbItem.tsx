import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { LinkForBreadcrumb } from "./BreadcrumbLink";

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
                        <LinkForBreadcrumb  to='/freezer/list' name={freezerName} />
                    </BreadcrumbLink>
                    <BreadcrumbSeparator></BreadcrumbSeparator>
                    <BreadcrumbLink asChild>
                        <LinkForBreadcrumb to='/category/list' search={{ freezerId }} name={categoryName} />
                    </BreadcrumbLink>
                    <BreadcrumbSeparator></BreadcrumbSeparator>
                    <BreadcrumbItem>Select Item</BreadcrumbItem>
                </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    );
}