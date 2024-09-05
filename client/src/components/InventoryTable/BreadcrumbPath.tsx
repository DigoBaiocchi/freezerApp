import { Link } from "@tanstack/react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";

type BreadcrumbPath = {
    freezerName?: string;
    categoryName?: string;
    itemName?: string;
};

export function BreadcrumbPath({ freezerName, categoryName, itemName }: BreadcrumbPath) {
    if (!freezerName && !categoryName && !itemName) {
        return (
            <div className="flex justify-center">
                <div className="flex justify-start m-2 w-[800px]">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>Select freezer</BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
        );
    }
    
    if (!categoryName && !itemName) {
        return (
            <div className="flex justify-center">
                <div className="flex justify-start m-2 w-[800px]">
                    <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbLink asChild>
                        <Link to='/freezer/list'>{freezerName}</Link>
                        </BreadcrumbLink>
                        <BreadcrumbSeparator></BreadcrumbSeparator>
                        <BreadcrumbItem>Select category</BreadcrumbItem>
                    </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
        );
    }

    if (!itemName) {
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
                            <Link to='/category/list' search={{ freezerId: 12 }} >{categoryName}</Link>
                        </BreadcrumbLink>
                        <BreadcrumbSeparator></BreadcrumbSeparator>
                        <BreadcrumbItem>Select category</BreadcrumbItem>
                    </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
        );
    }

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
                        <Link to='/category/list' search={{ freezerId: 12 }} >{categoryName}</Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator></BreadcrumbSeparator>
                    <BreadcrumbItem>Select category</BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to='/item/list' search={{ freezerId: 12, categoryId: 2 }} >{itemName}</Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator></BreadcrumbSeparator>
                </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    );
}