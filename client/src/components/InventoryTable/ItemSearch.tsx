import { useQuery } from "@tanstack/react-query";
import { ApiCalls } from "@/api/api";
import { FreezerCategoryCardSkeleton } from "./FreezerCategoryCardSkeleton";
import { ItemCard } from "./ItemCard";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

type ItemSummaryData = {
    freezerid: number;
    categoryid: number;
    itemid: number;
    itemname: string;
    itemtotal: number;
};

export function ItemSearch() {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState<ItemSummaryData[]>([]);
    const inventory = "inventory";
    const items = "items";
    const inventoryCalls = new ApiCalls(inventory);
    
    const { isPending, error, data} = useQuery({
        queryKey: [inventory, items],
                queryFn: () => inventoryCalls.getItemsList().then((res) => {
                    console.log("getCall data is:", res.data)
                    return res.data;
                })
    });

    const handleSearch = (searchTerm: string) => {
        setSearch(searchTerm.toLowerCase());
    }
    
    useEffect(() => {
        
        const filterResults = data 
                            ? data.filter((item:ItemSummaryData) => item.itemname.toLowerCase().includes(search)) 
                            : [];
        setSearchResult(filterResults);
    }, [search]);
    
    if (isPending) {
        return <FreezerCategoryCardSkeleton />;
    }
    
    if (error) {
        return <div className="flex-col justify-center">
            <div className="flex justify-center m-2">
                <p className="p-1"><b>Unable to get data.</b></p>
            </div>
        </div>
    }
    
    return (
        <div className="flex-col justify-center">
            <div className="flex justify-center">
                <div className="flex justify-center m-2 w-[800px]">
            <Input 
                onChange={(e) => handleSearch(e.target.value)} 
                placeholder="Search Item"
            />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex flex-wrap pl-6 pr-6 max-w-[950px]">
                    {
                        searchResult.map((itemData: ItemSummaryData, i: number) => (
                            <ItemCard 
                                key={i}
                                freezerId={itemData.freezerid}
                                categoryId={itemData.categoryid}
                                itemId={itemData.itemid}
                                itemName={itemData.itemname}
                                itemTotal={itemData.itemtotal}

                            />
                        ))
                    }   
                </div>
            </div>
        </div>
    );
}