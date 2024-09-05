import { useQueries } from "@tanstack/react-query";
import { ApiCalls } from "@/api/api";
import { FreezerCategoryCardSkeleton } from "./FreezerCategoryCardSkeleton";
import { CategoryCard } from "./CategoryCard";
import { BreadcrumbPath } from "./BreadcrumbPath";

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
    const inventory = "inventory";
    const freezer = "freezer";
    const inventoryCalls = new ApiCalls(inventory);
    const freezerCalls = new ApiCalls(freezer);

    const result = useQueries({
        queries: [
            {
                queryKey: [inventory],
                queryFn: () => inventoryCalls.getCategoriesList(freezerId).then((res) => {
                    console.log("getCall data is:", res.data)
                    return res.data;
                }),
            }, {
                queryKey: [freezer],
                queryFn: () => freezerCalls.getCall().then((res) => {
                    console.log("getCall data is:", res.data)
                    return res.data;
                }),
            }
        ]
    });

    if (result[1].isPending) {
        return <FreezerCategoryCardSkeleton />;
    }

    if (result[1].error) {
        return <div className="flex-col justify-center">
            <div className="flex justify-center m-2">
                <p className="p-1"><b>Unable to get data.</b></p>
            </div>
        </div>
    }
  
    const freezerName = result[1].data.find((item: { id: number; name: string; }) => item.id === freezerId);

    return (
        <div className="flex-col justify-center">
            <BreadcrumbPath freezerName={freezerName.name}/>
            <div className="flex justify-center">
                <div className="flex flex-wrap pl-6 pr-6 max-w-[950px]">
                    {
                        result[0].data?.map((categoryData: CategorySummaryData) => (
                            <CategoryCard 
                                key={categoryData.categoryid}
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