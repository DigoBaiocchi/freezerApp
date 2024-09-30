import { useQuery } from "@tanstack/react-query";
import { ApiCalls } from "@/api/api";
import { FreezerCategoryCardSkeleton } from "./FreezerCategoryCardSkeleton";
import { ItemCard } from "./ItemCard";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { ComboboxSimple } from "../ComboboxSimple";
import { Button } from "../ui/button";

type dropdrownData = {
    id: number
    name: string
}

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
    const [selectedCategory, setSelectedCategory] = useState<dropdrownData | null>();
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

    const categoryData = useQuery({
        queryKey: [`categoryData`],
        queryFn: () => {
            const apiCall = new ApiCalls("category");

            return  apiCall.getCall().then(res => res.data);
        }
    });

    const handleSelectCategory = (data: dropdrownData| null) => {
        setSelectedCategory(data);
    };

    const handleSearch = (searchTerm: string) => {
        setSearch(searchTerm.toLowerCase());
    }

    const handleClearFilter = () => {
        setSelectedCategory(null);
    }
    
    useEffect(() => {
        
        const filterResults = data 
                            ? data.filter((item:ItemSummaryData) => {
                                if (selectedCategory) {
                                    return item.itemname.toLowerCase().includes(search) &&
                                    item.categoryid === selectedCategory?.id
                                }
                                return item.itemname.toLowerCase().includes(search)
                            }
                            )
                            : [];
        setSearchResult(filterResults);
    }, [search, selectedCategory, data]);
    
    if (isPending || categoryData.isPending) {
        return <FreezerCategoryCardSkeleton />;
    }
    
    if (error || categoryData.error) {
        return <div className="flex-col justify-center">
            <div className="flex justify-center m-2">
                <p className="p-1"><b>Unable to get data.</b></p>
            </div>
        </div>
    }
    
    return (
        <>
            <div className="flex justify-center">
                <div className="w-[750px]">
                    <div className="flex justify-center flex-wrap m-2">
                        <Input 
                            onChange={(e) => handleSearch(e.target.value)} 
                            placeholder="Search Item"
                            className="m-1"
                        />
                        <ComboboxSimple 
                            data={categoryData.data} 
                            setSelectedCategory={handleSelectCategory} 
                            selectedCategory={selectedCategory}
                        />
                        <Button className="m-1" onClick={handleClearFilter}>Clear Filter</Button>
                    </div>
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
        </>
    );
}