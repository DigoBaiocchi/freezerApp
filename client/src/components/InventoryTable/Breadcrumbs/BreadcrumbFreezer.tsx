import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import { BreadcrumbContainer } from "./BreadcrumbContainer";

export function BreadcrumbFreezer() {
    return (
        <BreadcrumbContainer>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>Select freezer</BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </BreadcrumbContainer>
    );
}