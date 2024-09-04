import { useQuery } from "@tanstack/react-query";
import { ApiCalls } from "@/api/api";
import { FreezerCategoryCardSkeleton } from "./FreezerCategoryCardSkeleton";
import { CategoryCard } from "./CategoryCard";

type CategoryListProps = {
    freezerId: number;
}

type CategorySummaryData = {
    freezerid: number;
    categoryid: number;
    categoryname: string;
    categorytotal: number;
};

export function CategoryList({ freezerId }: CategoryListProps) {
    const tableName = 'inventory';
    const apiCalls = new ApiCalls(tableName);

    const { isPending, error, data} = useQuery({
        queryKey: [tableName],
        queryFn: () => apiCalls.getCategoriesList(freezerId).then((res) => {
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
                        data?.map((categoryData: CategorySummaryData) => (
                            <CategoryCard 
                                categoryId={categoryData.categoryid} 
                                freezerId={categoryData.freezerid} 
                                categoryName={categoryData.categoryname}
                            />
                        ))
                    }   
                </div>
            </div>
        </div>
    );
}