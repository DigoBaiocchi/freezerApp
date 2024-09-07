import { useQueries } from "@tanstack/react-query";
import { ApiCalls } from "@/api/api";
import { FreezerCategoryCardSkeleton } from "./FreezerCategoryCardSkeleton";
import { BreadcrumbInventoryItem } from "./Breadcrumbs/BreadcrumbInventoryItem";
import { InventoryCard, ItemData } from "./InventoryCard";

type ItemListProps = {
    freezerId: number;
    categoryId: number;
    itemId: number;
};

export function InventoryList({ freezerId, categoryId, itemId }: ItemListProps) {
    const inventory = "inventory";
    const freezer = "freezer";
    const category = "category";
    const item = "item";
    const inventoryCalls = new ApiCalls(inventory);
    const freezerCalls = new ApiCalls(freezer);
    const categoryCalls = new ApiCalls(category);
    const itemCalls = new ApiCalls(item);

    const result = useQueries({
        queries: [
            {
                queryKey: [inventory, item],
                queryFn: () => inventoryCalls.getIventoryItemList(freezerId, categoryId, itemId).then((res) => {
                    console.log("getCall data is:", res.data)
                    return res.data;
                }),
            }, {
                queryKey: [freezer, item],
                queryFn: () => freezerCalls.getCall().then((res) => {
                    console.log("getCall data is:", res.data)
                    return res.data;
                }),
            }, {
                queryKey: [category, item],
                queryFn: () => categoryCalls.getCall().then((res) => {
                    console.log("getCall data is:", res.data)
                    return res.data;
                }),
            }, {
                queryKey: [item, item],
                queryFn: () => itemCalls.getCall().then((res) => {
                    console.log("getCall data is:", res.data)
                    return res.data;
                }),
            }
        ]
    });

    if (result[0].isPending || result[1].isPending || result[2].isPending || result[3].isPending) {
        return <FreezerCategoryCardSkeleton />;
    }

    if (result[0].error || result[1].error || result[2].error || result[3].error) {
        return <div className="flex-col justify-center">
            <div className="flex justify-center m-2">
                <p className="p-1"><b>Unable to get data.</b></p>
            </div>
        </div>
    }
  
    const freezerName = result[1].data.find((item: { id: number; name: string; }) => item.id === freezerId);
    const categoryName = result[2].data.find((item: { id: number; name: string; }) => item.id === categoryId);
    const itemName = result[3].data.find((item: { id: number; name: string; }) => item.id === itemId);
    console.log(itemName)
    return (
        <div className="flex-col justify-center">
            <BreadcrumbInventoryItem 
                freezerId={freezerName.id} 
                freezerName={freezerName.name} 
                categoryName={categoryName.name} 
                categoryId={categoryId}
                itemName={itemName.name}
            />
            <div className="flex justify-center">
                <div className="flex flex-wrap pl-6 pr-6 max-w-[950px]">
                    {
                        result[0].data?.map((itemData: ItemData) => (
                            <InventoryCard 
                                key={itemData.id}
                                item={itemData}

                            />
                        ))
                    }   
                </div>
            </div>
        </div>
    );
}