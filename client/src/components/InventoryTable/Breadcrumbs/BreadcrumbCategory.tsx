import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { BreadcrumbContainer } from "./BreadcrumbContainer";
import { LinkForBreadcrumb } from "./BreadcrumbLink";

type BreadcrumbCategoryProps = {
    freezerName: string;
}

export function BreadcrumbCategory({freezerName}: BreadcrumbCategoryProps) {
    return (
        <BreadcrumbContainer>
            <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbLink asChild>
                    <LinkForBreadcrumb to='/freezer/list' name={freezerName}/>
                </BreadcrumbLink>
                <BreadcrumbSeparator></BreadcrumbSeparator>
                <BreadcrumbItem>Select category</BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
        </BreadcrumbContainer>
    );
}