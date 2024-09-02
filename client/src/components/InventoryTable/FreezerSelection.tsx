import { useQuery } from "@tanstack/react-query";
import { ApiCalls } from "@/api/api";
import { FreezerCategoryCard } from "./FreezerCategoryCard";
import { IndiviualTable } from "../IndividualTables/Table";
// import { Card, CardHeader } from "../ui/card";
// import { Skeleton } from "../ui/skeleton";
import { FreezerCategoryCardSkeleton } from "./FreezerCategoryCardSkeleton";

export function FreezerSelection() {
    const tableName = 'freezer';
    const apiCalls = new ApiCalls(tableName);

    const { isPending, error, data} = useQuery({
        queryKey: [tableName],
        queryFn: () => apiCalls.getCall().then((res) => {
            console.log("getCall data is:", res.data)
            return res.data;
        }),
    });

    if (isPending) {
        return <FreezerCategoryCardSkeleton />;
    }

    if (error) {
        <div className="flex-col justify-center">
            <div className="flex justify-center m-2">
                <p className="p-1"><b>Unable to get data.</b></p>
            </div>
        </div>
    }

    return (
        <div className="flex-col justify-center">
            <div className="flex justify-center m-2">
                <p className="p-1"><b>Select {tableName}</b></p>
            </div>
            <div className="flex justify-center">
                <div className="flex flex-wrap pl-6 pr-6 max-w-[950px]">
                    {
                        data?.map((freezerData: IndiviualTable) => (
                            <FreezerCategoryCard name={freezerData.name} />
                        ))
                    }   
                </div>
            </div>
        </div>
    );
}