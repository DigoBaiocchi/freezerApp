import { ReactNode } from "react";

type BreadcrumbContainerProps = {
    children: ReactNode;
};

export function BreadcrumbContainer({children}: BreadcrumbContainerProps) {
    return (
        <div className="flex justify-center">
            <div className="flex justify-start m-2 w-[800px]">
                {children}
            </div>
        </div>
    );
}