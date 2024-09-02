import { Card, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function FreezerCategoryCardSkeleton() {
    return (
        <div className="flex-col justify-center">
            <div className="flex justify-center m-2">
                <p className="p-1"><b>Select Loading...</b></p>
            </div>
            <div className="flex justify-center">
                <div className="flex flex-wrap pl-6 pr-6 max-w-[950px]">
                    <div className="flex m-2">
                        <Card className="w-[275px]">
                            <CardHeader className="p-5">
                                    <div className="flex justify-center">
                                        <Skeleton className="h-4 w-[250px]" />
                                    </div>
                            </CardHeader>
                        </Card>
                    </div> 
                </div>
            </div>
        </div>
    );
}