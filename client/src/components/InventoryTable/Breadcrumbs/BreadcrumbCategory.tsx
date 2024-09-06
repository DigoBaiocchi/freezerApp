import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { BreadcrumbContainer } from "./BreadcrumbContainer";
import { Link } from "@tanstack/react-router";

type BreadcrumbCategoryProps = {
    freezerName: string;
}

export function BreadcrumbCategory({freezerName}: BreadcrumbCategoryProps) {
    return (
        <BreadcrumbContainer>
            <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbLink asChild>
                <Link to='/freezer/list'>{freezerName}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator></BreadcrumbSeparator>
                <BreadcrumbItem>Select category</BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
        </BreadcrumbContainer>
    );
}